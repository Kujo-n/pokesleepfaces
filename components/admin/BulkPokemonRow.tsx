import React, { memo } from 'react';
import { Pokemon } from '@/data/mockData';

interface BulkPokemonRowProps {
    pokemon: Pokemon;
    targetField: string;
    isAppearing: boolean;
    styleInclusions: boolean[]; // true: 寝顔が出現する（除外されていない）
    onToggleAppearing: (pokemonId: string, isAppearing: boolean) => void;
    onToggleStyle: (pokemonId: string, styleIndex: number, isIncluded: boolean) => void;
}

const BulkPokemonRowComponent = ({
    pokemon,
    targetField,
    isAppearing,
    styleInclusions,
    onToggleAppearing,
    onToggleStyle
}: BulkPokemonRowProps) => {
    return (
        <div className={`p-4 rounded-xl border ${isAppearing ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-200'} transition-colors`}>
            {/* ポケモン全体の出現／非出現トグル */}
            <label className="flex items-center gap-3 cursor-pointer select-none">
                <input
                    type="checkbox"
                    checked={isAppearing}
                    onChange={(e) => onToggleAppearing(pokemon.id, e.target.checked)}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                />
                <div>
                    <span className="text-xs text-gray-500 font-mono w-8 inline-block">
                        #{pokemon.dexNumber.toString().padStart(3, '0')}
                    </span>
                    <span className="font-bold text-gray-900 ml-2">{pokemon.name}</span>
                    <span className="text-xs text-gray-500 ml-3 bg-gray-100 px-2 py-1 rounded-full">
                        {pokemon.type}
                    </span>
                </div>
            </label>

            {/* 各寝顔ごとの出現設定 */}
            {isAppearing && pokemon.styles && pokemon.styles.length > 0 && (
                <div className="mt-4 pl-10 border-t border-blue-100 pt-3">
                    <div className="text-xs font-medium text-blue-600 mb-2">寝顔の出現設定 (対象: {targetField})</div>
                    <div className="flex flex-wrap gap-x-6 gap-y-2">
                        {pokemon.styles.map((style, index) => {
                            const isIncluded = styleInclusions[index];
                            return (
                                <label key={style.id} className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={isIncluded}
                                        onChange={(e) => onToggleStyle(pokemon.id, index, e.target.checked)}
                                        className="w-4 h-4 text-blue-500 rounded focus:ring-blue-500"
                                    />
                                    <span className={`text-sm ${isIncluded ? 'text-gray-900 font-medium' : 'text-gray-400 line-through'}`}>
                                        ★{style.rarity} {style.name}
                                    </span>
                                </label>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

// React.memoにより、自身の変化（対象フィールドやフラグのみ）があった行だけ再レンダリングする
export const BulkPokemonRow = memo(BulkPokemonRowComponent, (prev, next) => {
    if (prev.isAppearing !== next.isAppearing) return false;
    if (prev.targetField !== next.targetField) return false;
    if (prev.pokemon.id !== next.pokemon.id) return false;
    
    // スタイル状態の配列を要素ごとに比較
    if (prev.styleInclusions.length !== next.styleInclusions.length) return false;
    for (let i = 0; i < prev.styleInclusions.length; i++) {
        if (prev.styleInclusions[i] !== next.styleInclusions[i]) return false;
    }
    
    return true; // skip render
});
