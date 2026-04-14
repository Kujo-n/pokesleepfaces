'use client';

import { useState, useCallback, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { usePokemonData } from '@/hooks/usePokemonData';
import dynamic from 'next/dynamic';
import { MOCK_POKEMON, FIELD_NAMES } from '@/data/mockData';
import { saveFieldNames, savePokemon, generateStyleId } from '@/lib/adminDb';

// 管理画面コンポーネントの遅延読み込み（コード分割）
const PokemonEditor = dynamic(() => import('@/components/admin/PokemonEditor'), {
    loading: () => <div className="animate-pulse bg-gray-100 rounded-lg h-64" />
});
const FieldEditor = dynamic(() => import('@/components/admin/FieldEditor'), {
    loading: () => <div className="animate-pulse bg-gray-100 rounded-lg h-32" />
});
const BulkFieldAssignment = dynamic(() => import('@/components/admin/BulkFieldAssignment'), {
    loading: () => <div className="animate-pulse bg-gray-100 rounded-lg h-64" />
});

// 管理者UIDリスト
// 環境変数から読み込み。カンマ区切りで複数指定可能
const ADMIN_UIDS = (process.env.NEXT_PUBLIC_ADMIN_UIDS || '').split(',').filter(Boolean);

type Tab = 'pokemon' | 'fields' | 'bulk';

/**
 * 管理画面ページ
 * - 管理者認証チェック（UIDホワイトリスト）
 * - ポケモン管理タブ / フィールド管理タブ
 */
export default function AdminPage() {
    const { user } = useAuth();
    const { pokemonList, fieldNames, isLoading, isUsingFallback } = usePokemonData();
    const [activeTab, setActiveTab] = useState<Tab>('pokemon');
    const [refreshKey, setRefreshKey] = useState(0);
    const [isSeeding, setIsSeeding] = useState(false);
    const [seedProgress, setSeedProgress] = useState('');

    // データ更新をトリガー（保存後にリロード）
    const handleSaved = useCallback(() => {
        setRefreshKey(prev => prev + 1);
        // 少し待ってからページをリロードしてContextを更新
        setTimeout(() => {
            window.location.reload();
        }, 500);
    }, []);

    const handleSeedData = useCallback(async () => {
        if (!confirm('mockData.ts から初期データを投入しますか？\n既存のデータがある場合、上書きされる可能性があります。')) {
            return;
        }

        setIsSeeding(true);
        setSeedProgress('フィールド名を保存中...');
        
        try {
            await saveFieldNames(FIELD_NAMES);
            
            for (let i = 0; i < MOCK_POKEMON.length; i++) {
                const pokemon = MOCK_POKEMON[i];
                setSeedProgress(`ポケモンを保存中... (${i + 1}/${MOCK_POKEMON.length}): ${pokemon.name}`);
                
                const stylesWithIds = pokemon.styles.map((style, index) => ({
                    ...style,
                    id: generateStyleId(pokemon.id, index)
                }));
                
                await savePokemon({ ...pokemon, styles: stylesWithIds });
            }
            
            setSeedProgress('完了しました！');
            setTimeout(() => {
                window.location.reload();
            }, 1500);
        } catch (e) {
            console.error(e);
            alert('データ投入中にエラーが発生しました');
        } finally {
            setIsSeeding(false);
        }
    }, []);

    // 認証チェック
    const isAdmin = user && ADMIN_UIDS.includes(user.uid);

    // 未ログイン
    if (!user) {
        return (
            <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 max-w-md w-full text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-4 text-gray-400">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0110 0v4" />
                    </svg>
                    <h1 className="text-xl font-bold text-gray-900 mb-2">管理画面</h1>
                    <p className="text-gray-500 text-sm">ログインが必要です</p>
                    <p className="text-gray-400 text-xs mt-4">メインページからログインしてからアクセスしてください</p>
                </div>
            </main>
        );
    }

    // 権限なし
    if (!isAdmin) {
        return (
            <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 max-w-md w-full text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-4 text-red-400">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                    </svg>
                    <h1 className="text-xl font-bold text-gray-900 mb-2">アクセス権限がありません</h1>
                    <p className="text-gray-500 text-sm">この機能は管理者のみ利用できます</p>
                    <p className="text-gray-400 text-xs mt-4 break-all">UID: {user.uid}</p>
                </div>
            </main>
        );
    }

    // ローディング
    if (isLoading) {
        return (
            <main className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto mb-4" />
                    <p className="text-gray-500 text-sm">データを読み込み中...</p>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-gray-50">
            {/* ヘッダー */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
                <div className="max-w-4xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <a
                                href="/"
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                                aria-label="メインページに戻る"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="19" y1="12" x2="5" y2="12" />
                                    <polyline points="12 19 5 12 12 5" />
                                </svg>
                            </a>
                            <h1 className="text-lg font-bold text-gray-900">管理画面</h1>
                        </div>
                        <p className="text-xs text-gray-400">{user.email || user.uid}</p>
                    </div>

                    {/* タブ */}
                    <div className="flex gap-1 mt-4">
                        <button
                            onClick={() => setActiveTab('pokemon')}
                            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                                activeTab === 'pokemon'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                            aria-pressed={activeTab === 'pokemon'}
                        >
                            ポケモン管理
                        </button>
                        <button
                            onClick={() => setActiveTab('fields')}
                            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                                activeTab === 'fields'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                            aria-pressed={activeTab === 'fields'}
                        >
                            フィールド管理
                        </button>
                        <button
                            onClick={() => setActiveTab('bulk')}
                            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                                activeTab === 'bulk'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                            aria-pressed={activeTab === 'bulk'}
                        >
                            フィールド一括設定
                        </button>
                    </div>
                </div>
            </header>

            {/* コンテンツ */}
            <div className="max-w-4xl mx-auto px-4 py-6" key={refreshKey}>
                
                {/* データ投入プロンプト */}
                {isUsingFallback && !isLoading && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-6 text-center">
                        <h2 className="text-lg font-bold text-yellow-800 mb-2">マスターデータが空です</h2>
                        <p className="text-sm text-yellow-700 mb-4">
                            Firestoreにデータがありません。静的ファイル (mockData.ts) から初期データを投入しますか？
                        </p>
                        <button
                            onClick={handleSeedData}
                            disabled={isSeeding}
                            className="px-6 py-2 bg-yellow-600 text-white font-medium rounded-lg hover:bg-yellow-700 disabled:opacity-50 transition-colors"
                        >
                            {isSeeding ? 'データ投入中...' : '初期データを投入する'}
                        </button>
                        {isSeeding && (
                            <p className="text-xs text-yellow-600 mt-3">{seedProgress}</p>
                        )}
                    </div>
                )}

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    {activeTab === 'pokemon' && (
                        <PokemonEditor
                            pokemonList={pokemonList}
                            fieldNames={fieldNames}
                            onSaved={handleSaved}
                        />
                    )}
                    {activeTab === 'fields' && (
                        <FieldEditor
                            fieldNames={fieldNames}
                            onSaved={handleSaved}
                        />
                    )}
                    {activeTab === 'bulk' && (
                        <BulkFieldAssignment
                            pokemonList={pokemonList}
                            fieldNames={fieldNames}
                            onSaved={handleSaved}
                        />
                    )}
                </div>
            </div>
        </main>
    );
}
