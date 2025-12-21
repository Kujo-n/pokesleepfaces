'use client';

import { memo } from 'react';
import { Pokemon } from '@/data/mockData';
import { filterPokemonStyles, getSleepTypeColor, groupStylesByRarity } from '@/lib/pokemonUtils';

type Props = {
    pokemon: Pokemon;
    collectedStyles: Set<string>;
    onToggleStyle: (styleId: string) => void;
    selectedField?: string;
    selectedRarity?: string;
    showUncollectedOnly?: boolean;
    filterBaseCollectedStyles?: Set<string>;
};

function PokemonGridRow({
    pokemon,
    collectedStyles,
    onToggleStyle,
    selectedField = 'all',
    selectedRarity = 'all',
    showUncollectedOnly = false,
    filterBaseCollectedStyles = new Set()
}: Props) {
    const { displayStyles } = filterPokemonStyles(pokemon, {
        selectedField,
        selectedRarity,
        showUncollectedOnly,
        filterBaseCollectedStyles
    });

    // レアリティ別にグループ化
    const stylesByRarity = groupStylesByRarity(displayStyles);

    return (
        <div className="grid grid-cols-[auto_repeat(4,minmax(32px,60px))] gap-0 bg-white border-b border-gray-200 items-center">
            {/* ポケモン名セル */}
            <div className="flex flex-col p-2 border-r border-gray-100 min-w-0">
                <div className="flex items-center gap-1">
                    <span className="text-gray-400 font-mono text-[10px]">#{pokemon.dexNumber.toString().padStart(3, '0')}</span>
                    <span className={`text-[10px] px-1 py-0.5 rounded shrink-0 ${getSleepTypeColor(pokemon.sleepType)}`}>
                        {pokemon.sleepType}
                    </span>
                </div>
                <span className="font-medium text-sm text-gray-900 truncate">{pokemon.name}</span>
            </div>

            {/* レアリティ1〜4のセル */}
            {[1, 2, 3, 4].map((rarity) => {
                const styles = stylesByRarity.get(rarity) || [];
                const hasMultiple = styles.length > 1;
                return (
                    <div
                        key={rarity}
                        className="flex flex-wrap items-center justify-center gap-0.5 p-0.5 border-r border-gray-100 last:border-r-0 min-h-[36px]"
                    >
                        {styles.length === 0 ? (
                            <span className="text-gray-300 text-xs">-</span>
                        ) : (
                            styles.map((style) => {
                                const isCollected = collectedStyles.has(style.id);
                                // 複数ある場合は頭文字を表示、1つの場合は✓のみ
                                const displayChar = hasMultiple ? style.name.charAt(0) : (isCollected ? '✓' : '');
                                return (
                                    <button
                                        key={style.id}
                                        onClick={() => onToggleStyle(style.id)}
                                        className={`
                                            w-6 h-6 rounded flex items-center justify-center border transition-all duration-150 text-[10px] font-medium
                                            ${isCollected
                                                ? 'bg-green-500 border-green-500 text-white'
                                                : 'bg-white border-gray-300 hover:bg-gray-50 hover:border-gray-400 text-gray-500'}
                                        `}
                                        aria-label={`${pokemon.name}の${style.name}を${isCollected ? '未収集にする' : '収集済みにする'}`}
                                        title={style.name}
                                    >
                                        {hasMultiple ? displayChar : (isCollected && '✓')}
                                    </button>
                                );
                            })
                        )}
                    </div>
                );
            })}
        </div>
    );
}

export default memo(PokemonGridRow, (prev, next) => {
    if (prev.pokemon.id !== next.pokemon.id) return false;
    if (prev.selectedField !== next.selectedField) return false;
    if (prev.selectedRarity !== next.selectedRarity) return false;
    if (prev.showUncollectedOnly !== next.showUncollectedOnly) return false;

    const prevStyles = prev.pokemon.styles;
    for (const style of prevStyles) {
        if (prev.collectedStyles.has(style.id) !== next.collectedStyles.has(style.id)) {
            return false;
        }
        if (prev.filterBaseCollectedStyles?.has(style.id) !== next.filterBaseCollectedStyles?.has(style.id)) {
            return false;
        }
    }

    return true;
});
