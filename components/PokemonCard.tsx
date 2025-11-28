'use client';

import { Pokemon } from '@/data/mockData';
import { useState } from 'react';

type Props = {
    pokemon: Pokemon;
    collectedStyles: Set<string>;
    onToggleStyle: (styleId: string) => void;
    onToggleAll: (pokemon: Pokemon, select: boolean) => void;
    selectedField?: string;
};

export default function PokemonCard({ pokemon, collectedStyles, onToggleStyle, onToggleAll, selectedField = 'all' }: Props) {
    const [isExpanded, setIsExpanded] = useState(true);

    const availableStyles = selectedField === 'all'
        ? pokemon.styles
        : pokemon.styles.filter(s => s.locations.includes(selectedField));

    const collectedCount = availableStyles.filter((s) => collectedStyles.has(s.id)).length;
    const totalStyles = availableStyles.length;

    const getSleepTypeColor = (type: string) => {
        switch (type) {
            case 'うとうと': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'すやすや': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'ぐっすり': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between bg-gray-50 gap-2">
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-3">
                        <span className="text-gray-500 font-mono text-sm">#{pokemon.dexNumber.toString().padStart(3, '0')}</span>
                        <h3 className="font-bold text-lg text-gray-900">{pokemon.name}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full border ${getSleepTypeColor(pokemon.sleepType)}`}>
                            {pokemon.sleepType}
                        </span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-1">
                        {pokemon.fields.map(field => (
                            <span key={field} className="text-[10px] px-1.5 py-0.5 bg-gray-200 text-gray-600 rounded">
                                {field}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
                    <span className="text-sm text-gray-600 font-medium">
                        {collectedCount} / {totalStyles}
                    </span>
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        {isExpanded ? '▼' : '▶'}
                    </button>
                </div>
            </div>

            {isExpanded && (
                <div className="p-4 border-t border-gray-100">
                    <div className="flex justify-end mb-3 gap-2">
                        <button
                            onClick={() => onToggleAll(pokemon, true)}
                            className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors"
                        >
                            全選択
                        </button>
                        <button
                            onClick={() => onToggleAll(pokemon, false)}
                            className="text-xs px-2 py-1 bg-gray-50 text-gray-600 rounded hover:bg-gray-100 transition-colors"
                        >
                            全解除
                        </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {availableStyles.map((style) => {
                            const isCollected = collectedStyles.has(style.id);
                            return (
                                <button
                                    key={style.id}
                                    onClick={() => onToggleStyle(style.id)}
                                    className={`
                    flex items-center justify-between p-3 rounded-md border transition-all duration-200
                    ${isCollected
                                            ? 'bg-green-50 border-green-200 shadow-sm'
                                            : 'bg-white border-gray-100 hover:bg-gray-50 hover:border-gray-200'}
                  `}
                                >
                                    <div className="flex items-center gap-2">
                                        <div className={`
                      w-5 h-5 rounded flex items-center justify-center border
                      ${isCollected ? 'bg-green-500 border-green-500' : 'bg-white border-gray-300'}
                    `}>
                                            {isCollected && <span className="text-white text-xs">✓</span>}
                                        </div>
                                        <span className={`text-sm ${isCollected ? 'text-green-900 font-medium' : 'text-gray-700'}`}>
                                            {style.name}
                                        </span>
                                    </div>
                                    <div className="flex gap-0.5">
                                        {[...Array(style.rarity)].map((_, i) => (
                                            <span key={i} className="text-yellow-400 text-xs">★</span>
                                        ))}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
