import React, { useState, useMemo, useCallback } from 'react';
import { Pokemon } from '@/data/mockData';
import { BulkPokemonRow } from './BulkPokemonRow';
import { savePokemon } from '@/lib/adminDb';

interface BulkFieldAssignmentProps {
    pokemonList: Pokemon[];
    fieldNames: string[];
    onSaved: () => void;
}

interface DraftPokemonState {
    isAppearing: boolean;
    styleInclusions: boolean[];
}

export default function BulkFieldAssignment({ pokemonList, fieldNames, onSaved }: BulkFieldAssignmentProps) {
    const [targetField, setTargetField] = useState<string>(fieldNames[0] || '');
    const [searchQuery, setSearchQuery] = useState('');
    
    // 元データからの変更差分だけを保持する
    const [draftState, setDraftState] = useState<Record<string, DraftPokemonState>>({});
    const [isSaving, setIsSaving] = useState(false);

    // フィールドを切り替えたら編集状態をリセット
    const handleFieldChange = (newField: string) => {
        if (Object.keys(draftState).length > 0) {
            if (!confirm('保存されていない変更が破棄されます。よろしいですか？')) return;
        }
        setTargetField(newField);
        setDraftState({});
        setSearchQuery('');
    };

    // 検索・フィルタリング（メモ化）
    const filteredPokemon = useMemo(() => {
        if (!searchQuery) return pokemonList;
        const lowerQ = searchQuery.toLowerCase();
        return pokemonList.filter(p => 
            p.name.includes(lowerQ) || 
            p.dexNumber.toString() === lowerQ ||
            p.type.includes(lowerQ)
        );
    }, [pokemonList, searchQuery]);

    const hasChanges = Object.keys(draftState).length > 0;

    // 特定のポケモンに対する現在の状態（編集中状態 or DB状態）を取得
    const getRowState = useCallback((pokemon: Pokemon): DraftPokemonState => {
        if (draftState[pokemon.id]) {
            return draftState[pokemon.id];
        }
        
        // 編集されていない場合は、元のDB状態をそのまま返す
        const isAppearing = (pokemon.fields || []).includes(targetField);
        const styleInclusions = (pokemon.styles || []).map(style => {
            // styleに出現する(include) = excludeFromFieldsに含まれていない
            return !(style.excludeFromFields || []).includes(targetField);
        });
        
        return { isAppearing, styleInclusions };
    }, [draftState, targetField]);

    // ポケモン全体の出現フラグトグル
    const handleToggleAppearing = useCallback((pokemonId: string, isAppearing: boolean) => {
        setDraftState(prev => {
            const pokemon = pokemonList.find(p => p.id === pokemonId);
            if (!pokemon) return prev;
            
            // ONにした時は、配下の寝顔は全てデフォルトで「出現する(true)」状態にする。
            // OFFにした時はとりあえず非出現として扱う。
            const newStyleInclusions = (pokemon.styles || []).map(() => true); 
            
            return {
                ...prev,
                [pokemonId]: {
                    isAppearing,
                    styleInclusions: isAppearing ? newStyleInclusions : newStyleInclusions.map(() => false)
                }
            };
        });
    }, [pokemonList]);

    // 寝顔ごとの出現フラグトグル
    const handleToggleStyle = useCallback((pokemonId: string, styleIndex: number, isIncluded: boolean) => {
        setDraftState(prev => {
            const pokemon = pokemonList.find(p => p.id === pokemonId);
            if (!pokemon) return prev;
            
            const currentObj = prev[pokemonId] || getRowState(pokemon);
            const newStyles = [...currentObj.styleInclusions];
            newStyles[styleIndex] = isIncluded;
            
            return {
                ...prev,
                [pokemonId]: {
                    ...currentObj,
                    styleInclusions: newStyles
                }
            };
        });
    }, [pokemonList, getRowState]);

    // 一括保存
    const handleSave = async () => {
        if (!hasChanges) return;
        setIsSaving(true);
        
        try {
            // 変更のあったポケモンだけを抽出してアップデート用オブジェクトを作成
            const modifiedPokemons = Object.keys(draftState).map(pokemonId => {
                const draft = draftState[pokemonId];
                const original = pokemonList.find(p => p.id === pokemonId)!;
                
                // 1. fields（出現フィールド）リストの更新
                const newFields = [...(original.fields || [])];
                const hasField = newFields.includes(targetField);
                
                if (draft.isAppearing && !hasField) {
                    newFields.push(targetField);
                } else if (!draft.isAppearing && hasField) {
                    const idx = newFields.indexOf(targetField);
                    newFields.splice(idx, 1);
                }
                
                // 2. excludeFromFields（個別寝顔の除外）リストの更新
                const newStyles = (original.styles || []).map((style, idx) => {
                    let excludeList = [...(style.excludeFromFields || [])];
                    const isExcludedInOriginal = excludeList.includes(targetField);
                    // UI側では isAppearingInDraft === true ならば除外しない
                    const isAppearingInDraft = draft.styleInclusions[idx];
                    
                    if (!isAppearingInDraft && !isExcludedInOriginal) {
                        // ユーザーがチェックを外した -> 除外リストに追加
                        excludeList.push(targetField);
                    } else if (isAppearingInDraft && isExcludedInOriginal) {
                        // ユーザーがチェックを入れた -> 除外リストから削除
                        excludeList = excludeList.filter(f => f !== targetField);
                    }
                    
                    // 空配列なら undefined にしてDB容量を節約
                    return {
                        ...style,
                        excludeFromFields: excludeList.length > 0 ? excludeList : undefined
                    };
                });
                
                return {
                    ...original,
                    fields: newFields,
                    styles: newStyles
                };
            });
            
            // 全ての変更をFirestoreへ一括送信
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

    if (fieldNames.length === 0) {
        return <div className="p-4 text-center text-gray-500">フィールドが1つも登録されていません。</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h3 className="text-lg font-bold text-gray-900">フィールド一括設定</h3>
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <span className="text-sm font-medium text-gray-700 whitespace-nowrap">設定対象:</span>
                    <select
                        value={targetField}
                        onChange={(e) => handleFieldChange(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 w-full md:w-64"
                    >
                        {fieldNames.map(field => (
                            <option key={field} value={field}>{field}</option>
                        ))}
                    </select>
                </div>
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

            <div className="space-y-3 mt-6">
                {filteredPokemon.length === 0 ? (
                    <div className="text-center py-10 text-gray-500">
                        該当するポケモンが見つかりません。
                    </div>
                ) : (
                    filteredPokemon.map(pokemon => {
                        const rowState = getRowState(pokemon);
                        return (
                            <BulkPokemonRow
                                key={pokemon.id}
                                pokemon={pokemon}
                                targetField={targetField}
                                isAppearing={rowState.isAppearing}
                                styleInclusions={rowState.styleInclusions}
                                onToggleAppearing={handleToggleAppearing}
                                onToggleStyle={handleToggleStyle}
                            />
                        );
                    })
                )}
            </div>
        </div>
    );
}
