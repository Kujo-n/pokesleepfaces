import React, { useState, useMemo, useCallback } from 'react';
import { Pokemon } from '@/data/mockData';
import { savePokemon } from '@/lib/adminDb';

interface BulkSpeciesAssignmentProps {
    pokemonList: Pokemon[];
    onSaved: () => void;
}

/**
 * 種ポケモン（これ以上進化前がない）の一括設定コンポーネント
 * - ポケモンごとに1つのチェックボックスで isSpecies を切り替える
 * - 元データからの変更差分だけを保持し、保存時に変更分のみ Firestore へ送信する
 */
export default function BulkSpeciesAssignment({ pokemonList, onSaved }: BulkSpeciesAssignmentProps) {
    const [searchQuery, setSearchQuery] = useState('');
    // 元データからの変更差分だけを保持する（id → isSpecies）
    const [draftState, setDraftState] = useState<Record<string, boolean>>({});
    const [isSaving, setIsSaving] = useState(false);

    // 検索・フィルタリング（メモ化）
    const filteredPokemon = useMemo(() => {
        if (!searchQuery) return pokemonList;
        const lowerQ = searchQuery.toLowerCase();
        return pokemonList.filter(p =>
            p.name.toLowerCase().includes(lowerQ) ||
            p.dexNumber.toString() === lowerQ ||
            p.type.toLowerCase().includes(lowerQ)
        );
    }, [pokemonList, searchQuery]);

    const hasChanges = Object.keys(draftState).length > 0;

    // 特定のポケモンの現在の状態（編集中状態 or DB状態）を取得
    const getChecked = useCallback((pokemon: Pokemon): boolean => {
        if (pokemon.id in draftState) {
            return draftState[pokemon.id];
        }
        return !!pokemon.isSpecies;
    }, [draftState]);

    // チェックボックスのトグル（元の状態に戻ったら差分から除去）
    const handleToggle = useCallback((pokemon: Pokemon, checked: boolean) => {
        setDraftState(prev => {
            const next = { ...prev };
            if (checked === !!pokemon.isSpecies) {
                delete next[pokemon.id];
            } else {
                next[pokemon.id] = checked;
            }
            return next;
        });
    }, []);

    // 一括保存
    const handleSave = async () => {
        if (!hasChanges) return;
        setIsSaving(true);

        try {
            const modifiedPokemons: Pokemon[] = [];
            for (const pokemonId of Object.keys(draftState)) {
                const original = pokemonList.find(p => p.id === pokemonId);
                if (!original) continue;
                // savePokemon は ...pokemon を spread するので他フィールドは保持される
                modifiedPokemons.push({ ...original, isSpecies: draftState[pokemonId] });
            }

            await Promise.all(modifiedPokemons.map(p => savePokemon(p)));

            setDraftState({});
            alert(`${modifiedPokemons.length} 種類のポケモンの設定を保存しました。`);
            onSaved(); // 再フェッチ
        } catch (e) {
            console.error(e);
            alert('保存中にエラーが発生しました。');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h3 className="text-lg font-bold text-gray-900">種ポケモン一括設定</h3>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-gray-50 p-4 rounded-xl border border-gray-200">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="ポケモン名・図鑑番号・タイプで検索..."
                    className="w-full md:max-w-xs px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={handleSave}
                    disabled={!hasChanges || isSaving}
                    className="w-full md:w-auto px-6 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors whitespace-nowrap shadow-sm"
                >
                    {isSaving ? '保存中...' : hasChanges ? `変更を保存 (${Object.keys(draftState).length}件)` : '変更なし'}
                </button>
            </div>

            <div className="space-y-1 mt-6 max-h-[60vh] overflow-y-auto">
                {filteredPokemon.length === 0 ? (
                    <div className="text-center py-10 text-gray-500">
                        該当するポケモンが見つかりません。
                    </div>
                ) : (
                    filteredPokemon.map(pokemon => {
                        const checked = getChecked(pokemon);
                        return (
                            <label
                                key={pokemon.id}
                                className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer select-none transition-colors ${
                                    checked ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200 hover:bg-gray-50'
                                }`}
                            >
                                <input
                                    type="checkbox"
                                    checked={checked}
                                    onChange={(e) => handleToggle(pokemon, e.target.checked)}
                                    className="w-5 h-5 text-green-600 rounded focus:ring-green-500"
                                />
                                <span className="text-xs text-gray-500 font-mono w-10">
                                    #{pokemon.dexNumber.toString().padStart(3, '0')}
                                </span>
                                <span className="font-bold text-gray-900">{pokemon.name}</span>
                                <span className="text-xs text-gray-500 ml-1 bg-gray-100 px-2 py-0.5 rounded-full">
                                    {pokemon.type}
                                </span>
                            </label>
                        );
                    })
                )}
            </div>

            <p className="text-xs text-gray-400 text-right">
                {filteredPokemon.length} / {pokemonList.length} 匹表示中
            </p>
        </div>
    );
}
