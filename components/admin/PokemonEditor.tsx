'use client';

import { useState, useCallback, useMemo } from 'react';
import { Pokemon, SleepStyle } from '@/data/mockData';
import { savePokemon, deletePokemon, generatePokemonId, generateStyleId, validatePokemon } from '@/lib/adminDb';

/** ポケモンタイプの選択肢 */
const TYPE_OPTIONS = [
    'ノーマル', 'ほのお', 'みず', 'くさ', 'でんき', 'こおり',
    'かくとう', 'どく', 'じめん', 'ひこう', 'エスパー', 'むし',
    'いわ', 'ゴースト', 'ドラゴン', 'あく', 'はがね', 'フェアリー'
];

/** 睡眠タイプの選択肢 */
const SLEEP_TYPE_OPTIONS: Array<'うとうと' | 'すやすや' | 'ぐっすり'> = ['うとうと', 'すやすや', 'ぐっすり'];

type Props = {
    pokemonList: Pokemon[];
    fieldNames: string[];
    onSaved: () => void;
};

/** 編集フォームの空の初期値 */
function createEmptyPokemon(): Partial<Pokemon> {
    return {
        dexNumber: 0,
        name: '',
        type: '',
        sleepType: 'うとうと',
        fields: [],
        styles: [
            { id: '', rarity: 1, name: '星1寝' },
            { id: '', rarity: 2, name: '星2寝' },
            { id: '', rarity: 3, name: '星3寝' },
            { id: '', rarity: 4, name: 'おなかのうえ寝' }
        ]
    };
}

/**
 * ポケモンマスターデータの管理コンポーネント
 * - 一覧表示（検索・フィルタ付き）
 * - 新規追加・編集・削除
 * - 寝顔スタイルの動的編集
 */
export default function PokemonEditor({ pokemonList, fieldNames, onSaved }: Props) {
    const [searchQuery, setSearchQuery] = useState('');
    const [editingPokemon, setEditingPokemon] = useState<Partial<Pokemon> | null>(null);
    const [isCreating, setIsCreating] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    // 検索フィルタ
    const filteredList = useMemo(() => {
        if (!searchQuery.trim()) return pokemonList;
        const q = searchQuery.toLowerCase();
        return pokemonList.filter(p =>
            p.name.toLowerCase().includes(q) ||
            p.dexNumber.toString().includes(q) ||
            p.type.toLowerCase().includes(q)
        );
    }, [pokemonList, searchQuery]);

    // 新規作成モードを開始
    const handleStartCreate = useCallback(() => {
        setEditingPokemon(createEmptyPokemon());
        setIsCreating(true);
        setError(null);
        setSuccessMessage(null);
    }, []);

    // 編集モードを開始
    const handleStartEdit = useCallback((pokemon: Pokemon) => {
        // ディープコピーして編集用にセット
        setEditingPokemon(JSON.parse(JSON.stringify(pokemon)));
        setIsCreating(false);
        setError(null);
        setSuccessMessage(null);
    }, []);

    // 編集をキャンセル
    const handleCancelEdit = useCallback(() => {
        setEditingPokemon(null);
        setIsCreating(false);
        setError(null);
    }, []);

    // フォーム値の更新
    const updateField = useCallback(<K extends keyof Pokemon>(key: K, value: Pokemon[K]) => {
        setEditingPokemon(prev => prev ? { ...prev, [key]: value } : null);
    }, []);

    // フィールドのチェックボックス切り替え
    const toggleFieldSelection = useCallback((fieldName: string) => {
        setEditingPokemon(prev => {
            if (!prev) return null;
            const currentFields = prev.fields || [];
            const newFields = currentFields.includes(fieldName)
                ? currentFields.filter(f => f !== fieldName)
                : [...currentFields, fieldName];
            return { ...prev, fields: newFields };
        });
    }, []);

    // スタイルの追加
    const handleAddStyle = useCallback(() => {
        setEditingPokemon(prev => {
            if (!prev) return null;
            const currentStyles = prev.styles || [];
            const newStyle: SleepStyle = {
                id: '', // 保存時に自動生成
                name: '',
                rarity: 1,
            };
            return { ...prev, styles: [...currentStyles, newStyle] };
        });
    }, []);

    // スタイルの更新
    const updateStyle = useCallback((index: number, key: keyof SleepStyle, value: string | number | string[]) => {
        setEditingPokemon(prev => {
            if (!prev) return null;
            const styles = [...(prev.styles || [])];
            styles[index] = { ...styles[index], [key]: value };
            return { ...prev, styles };
        });
    }, []);

    // スタイルの削除
    const handleRemoveStyle = useCallback((index: number) => {
        setEditingPokemon(prev => {
            if (!prev) return null;
            const styles = (prev.styles || []).filter((_, i) => i !== index);
            return { ...prev, styles };
        });
    }, []);

    // スタイルの除外フィールド切り替え
    const toggleStyleExcludeField = useCallback((styleIndex: number, fieldName: string) => {
        setEditingPokemon(prev => {
            if (!prev) return null;
            const styles = [...(prev.styles || [])];
            const style = { ...styles[styleIndex] };
            const excludes = style.excludeFromFields || [];
            style.excludeFromFields = excludes.includes(fieldName)
                ? excludes.filter(f => f !== fieldName)
                : [...excludes, fieldName];
            // 空配列なら除去（データ量削減）
            if (style.excludeFromFields.length === 0) {
                delete style.excludeFromFields;
            }
            styles[styleIndex] = style;
            return { ...prev, styles };
        });
    }, []);

    // 保存処理
    const handleSave = useCallback(async () => {
        if (!editingPokemon) return;

        setIsSaving(true);
        setError(null);
        setSuccessMessage(null);

        try {
            // IDを自動生成
            const pokemonId = generatePokemonId(editingPokemon.dexNumber!, editingPokemon.name!);

            // スタイルIDを自動生成
            const styles = (editingPokemon.styles || []).map((style, index) => ({
                ...style,
                id: generateStyleId(pokemonId, index),
            }));

            const pokemonToSave: Pokemon = {
                id: pokemonId,
                dexNumber: editingPokemon.dexNumber!,
                name: editingPokemon.name!,
                type: editingPokemon.type!,
                sleepType: editingPokemon.sleepType!,
                fields: editingPokemon.fields || [],
                styles,
            };

            // バリデーション
            const errors = validatePokemon(pokemonToSave);
            if (errors.length > 0) {
                setError(errors.join('\n'));
                setIsSaving(false);
                return;
            }

            await savePokemon(pokemonToSave);
            setSuccessMessage(`${pokemonToSave.name} を保存しました`);
            setEditingPokemon(null);
            setIsCreating(false);
            onSaved();
        } catch (e) {
            const message = e instanceof Error ? e.message : '保存に失敗しました';
            setError(message);
        } finally {
            setIsSaving(false);
        }
    }, [editingPokemon, onSaved]);

    // 削除処理
    const handleDelete = useCallback(async (pokemonId: string, pokemonName: string) => {
        if (!confirm(`本当に「${pokemonName}」を削除しますか？`)) return;
        try {
            await deletePokemon(pokemonId);
            setSuccessMessage('ポケモンを削除しました');
            setEditingPokemon(null);
            onSaved();
        } catch (e) {
            const message = e instanceof Error ? e.message : '削除に失敗しました';
            setError(message);
        }
    }, [onSaved]);

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900">ポケモン管理</h3>
                <button
                    onClick={handleStartCreate}
                    className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                    + ポケモン追加
                </button>
            </div>

            {/* メッセージ表示 */}
            {error && (
                <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm whitespace-pre-line" role="alert">
                    {error}
                </div>
            )}
            {successMessage && (
                <div className="p-3 bg-green-50 text-green-700 rounded-lg text-sm" role="status">
                    {successMessage}
                </div>
            )}

            {/* 編集フォーム */}
            {editingPokemon && (
                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm space-y-4">
                    <h4 className="font-bold text-gray-900">
                        {isCreating ? '新規ポケモン追加' : `${editingPokemon.name} を編集`}
                    </h4>

                    {/* 基本情報 */}
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label htmlFor="admin-dex-number" className="block text-xs font-medium text-gray-600 mb-1">図鑑番号</label>
                            <input
                                id="admin-dex-number"
                                type="number"
                                min={1}
                                value={editingPokemon.dexNumber || ''}
                                onChange={(e) => updateField('dexNumber', parseInt(e.target.value) || 0)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            />
                        </div>
                        <div>
                            <label htmlFor="admin-pokemon-name" className="block text-xs font-medium text-gray-600 mb-1">名前</label>
                            <input
                                id="admin-pokemon-name"
                                type="text"
                                value={editingPokemon.name || ''}
                                onChange={(e) => updateField('name', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            />
                        </div>
                        <div>
                            <label htmlFor="admin-pokemon-type" className="block text-xs font-medium text-gray-600 mb-1">タイプ</label>
                            <select
                                id="admin-pokemon-type"
                                value={editingPokemon.type || ''}
                                onChange={(e) => updateField('type', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
                            >
                                <option value="">選択してください</option>
                                {TYPE_OPTIONS.map(type => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="admin-sleep-type" className="block text-xs font-medium text-gray-600 mb-1">睡眠タイプ</label>
                            <select
                                id="admin-sleep-type"
                                value={editingPokemon.sleepType || ''}
                                onChange={(e) => updateField('sleepType', e.target.value as Pokemon['sleepType'])}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
                            >
                                {SLEEP_TYPE_OPTIONS.map(type => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* 出現フィールド */}
                    <div>
                        <p className="text-xs font-medium text-gray-600 mb-2">出現フィールド</p>
                        <div className="flex flex-wrap gap-2">
                            {fieldNames.map(field => (
                                <label key={field} className="flex items-center gap-1.5 text-sm text-gray-900 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={(editingPokemon.fields || []).includes(field)}
                                        onChange={() => toggleFieldSelection(field)}
                                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                                    />
                                    <span>{field}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* 寝顔スタイル */}
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-xs font-medium text-gray-600">寝顔スタイル</p>
                            <button
                                onClick={handleAddStyle}
                                className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-lg hover:bg-gray-200 transition-colors"
                            >
                                + スタイル追加
                            </button>
                        </div>
                        <div className="space-y-3">
                            {(editingPokemon.styles || []).map((style, index) => (
                                <div key={index} className="p-3 bg-gray-50 rounded-lg space-y-2">
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs text-gray-500 font-medium">★{style.rarity}</span>
                                        <input
                                            type="text"
                                            value={style.name}
                                            onChange={(e) => updateStyle(index, 'name', e.target.value)}
                                            placeholder="寝顔スタイル名"
                                            className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                            aria-label={`スタイル${index + 1}の名前`}
                                        />
                                        <select
                                            value={style.rarity}
                                            onChange={(e) => updateStyle(index, 'rarity', parseInt(e.target.value))}
                                            className="px-2 py-1 border border-gray-300 rounded text-sm text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                            aria-label={`スタイル${index + 1}のレアリティ`}
                                        >
                                            {[1, 2, 3, 4].map(r => (
                                                <option key={r} value={r}>★{r}</option>
                                            ))}
                                        </select>
                                        <button
                                            onClick={() => handleRemoveStyle(index)}
                                            className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
                                            aria-label={`スタイル${index + 1}を削除`}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <line x1="18" y1="6" x2="6" y2="18" />
                                                <line x1="6" y1="6" x2="18" y2="18" />
                                            </svg>
                                        </button>
                                    </div>

                                    {/* 除外フィールド（ポケモンの出現フィールド内から選択） */}
                                    {(editingPokemon.fields || []).length > 0 && (
                                        <div className="pl-6">
                                            <p className="text-xs text-gray-500 mb-1">除外フィールド:</p>
                                            <div className="flex flex-wrap gap-1.5">
                                                {(editingPokemon.fields || []).map(field => (
                                                    <label key={field} className="flex items-center gap-1 text-xs cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            checked={(style.excludeFromFields || []).includes(field)}
                                                            onChange={() => toggleStyleExcludeField(index, field)}
                                                            className="w-3 h-3 text-red-500 rounded focus:ring-red-400"
                                                        />
                                                        <span className="text-gray-600">{field}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 操作ボタン */}
                    <div className="flex justify-end gap-2 pt-2">
                        <button
                            onClick={handleCancelEdit}
                            className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
                        >
                            キャンセル
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={isSaving}
                            className="px-6 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                        >
                            {isSaving ? '保存中...' : '保存'}
                        </button>
                    </div>
                </div>
            )}

            {/* 検索 */}
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ポケモン名・図鑑番号・タイプで検索..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                aria-label="ポケモンを検索"
            />

            {/* ポケモン一覧 */}
            <div className="space-y-1 max-h-[60vh] overflow-y-auto">
                {filteredList.map(pokemon => (
                    <div
                        key={pokemon.id}
                        className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors group"
                    >
                        <div className="flex items-center gap-3">
                            <span className="text-xs text-gray-400 w-8 text-right">No.{pokemon.dexNumber}</span>
                            <span className="text-sm font-medium text-gray-900">{pokemon.name}</span>
                            <span className="text-xs text-gray-500">{pokemon.type}</span>
                            <span className={`text-xs px-1.5 py-0.5 rounded ${
                                pokemon.sleepType === 'うとうと' ? 'bg-yellow-100 text-yellow-700' :
                                pokemon.sleepType === 'すやすや' ? 'bg-blue-100 text-blue-700' :
                                'bg-indigo-100 text-indigo-700'
                            }`}>
                                {pokemon.sleepType}
                            </span>
                            <span className="text-xs text-gray-400">
                                寝顔{pokemon.styles.length}種
                            </span>
                        </div>
                        <div className="flex gap-1">
                            <button
                                onClick={() => handleStartEdit(pokemon)}
                                className="px-3 py-1 text-xs font-medium text-blue-600 hover:bg-blue-50 rounded transition-colors"
                                aria-label={`${pokemon.name}を編集`}
                            >
                                編集
                            </button>
                            <button
                                onClick={() => handleDelete(pokemon.id, pokemon.name)}
                                className="px-3 py-1 text-xs font-medium text-red-600 hover:bg-red-50 rounded transition-colors"
                                aria-label={`${pokemon.name}を削除`}
                            >
                                削除
                            </button>
                        </div>
                    </div>
                ))}
                {filteredList.length === 0 && (
                    <div className="text-center py-8 text-gray-500 text-sm">
                        該当するポケモンが見つかりません
                    </div>
                )}
            </div>

            <p className="text-xs text-gray-400 text-right">
                {filteredList.length} / {pokemonList.length} 匹表示中
            </p>
        </div>
    );
}
