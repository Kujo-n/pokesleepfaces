'use client';

import { useEffect, useMemo } from 'react';
import { MOCK_POKEMON, FIELD_NAMES } from '@/data/mockData';
import CollectionStatusItem from './CollectionStatusItem';

interface CollectionStatusModalProps {
    isOpen: boolean;
    onClose: () => void;
    collectedStyles: Set<string>;
}

type Stats = {
    total: number;
    collected: number;
    percentage: number;
};

type DetailedStats = {
    total: Stats;
    dozing: Stats;
    snoozing: Stats;
    slumbering: Stats;
    rarity1: Stats;
    rarity2: Stats;
    rarity3: Stats;
    rarity4: Stats;
};

export default function CollectionStatusModal({ isOpen, onClose, collectedStyles }: CollectionStatusModalProps) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const allStats = useMemo(() => {
        const calculateStats = (fieldFilter?: string): DetailedStats => {
            const result = {
                total: { total: 0, collected: 0, percentage: 0 },
                dozing: { total: 0, collected: 0, percentage: 0 },
                snoozing: { total: 0, collected: 0, percentage: 0 },
                slumbering: { total: 0, collected: 0, percentage: 0 },
                rarity1: { total: 0, collected: 0, percentage: 0 },
                rarity2: { total: 0, collected: 0, percentage: 0 },
                rarity3: { total: 0, collected: 0, percentage: 0 },
                rarity4: { total: 0, collected: 0, percentage: 0 },
            };

            MOCK_POKEMON.forEach(pokemon => {
                // Determine if pokemon should be included based on field filter
                if (fieldFilter && !pokemon.fields.includes(fieldFilter)) {
                    return;
                }

                const pType = pokemon.sleepType;

                pokemon.styles.forEach(style => {
                    // Check exclusion
                    if (fieldFilter && style.excludeFromFields?.includes(fieldFilter)) {
                        return;
                    }

                    const isCollected = collectedStyles.has(style.id);

                    // Total
                    result.total.total++;
                    if (isCollected) result.total.collected++;

                    // Sleep Type
                    if (pType === 'うとうと') {
                        result.dozing.total++;
                        if (isCollected) result.dozing.collected++;
                    } else if (pType === 'すやすや') {
                        result.snoozing.total++;
                        if (isCollected) result.snoozing.collected++;
                    } else if (pType === 'ぐっすり') {
                        result.slumbering.total++;
                        if (isCollected) result.slumbering.collected++;
                    }

                    // Rarity
                    if (style.rarity === 1) {
                        result.rarity1.total++;
                        if (isCollected) result.rarity1.collected++;
                    } else if (style.rarity === 2) {
                        result.rarity2.total++;
                        if (isCollected) result.rarity2.collected++;
                    } else if (style.rarity === 3) {
                        result.rarity3.total++;
                        if (isCollected) result.rarity3.collected++;
                    } else if (style.rarity === 4) {
                        result.rarity4.total++;
                        if (isCollected) result.rarity4.collected++;
                    }
                });
            });

            // Calculate percentages
            const calcPct = (c: number, t: number) => (t === 0 ? 0 : Math.floor((c / t) * 1000) / 10); // 小数点第1位まで表示 (ex: 50.8)

            result.total.percentage = calcPct(result.total.collected, result.total.total);
            result.dozing.percentage = calcPct(result.dozing.collected, result.dozing.total);
            result.snoozing.percentage = calcPct(result.snoozing.collected, result.snoozing.total);
            result.slumbering.percentage = calcPct(result.slumbering.collected, result.slumbering.total);
            result.rarity1.percentage = calcPct(result.rarity1.collected, result.rarity1.total);
            result.rarity2.percentage = calcPct(result.rarity2.collected, result.rarity2.total);
            result.rarity3.percentage = calcPct(result.rarity3.collected, result.rarity3.total);
            result.rarity4.percentage = calcPct(result.rarity4.collected, result.rarity4.total);

            return result;
        };

        const overall = calculateStats();
        const fields = FIELD_NAMES.map(field => ({
            name: field,
            stats: calculateStats(field)
        }));

        return { overall, fields };
    }, [collectedStyles]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <div
                className="absolute inset-0 bg-black/50 transition-opacity"
                onClick={onClose}
            />
            <div className="relative bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col">
                <div className="flex items-center justify-between p-4 border-b border-gray-100 sticky top-0 bg-white z-10">
                    <h2 className="text-lg font-bold text-gray-900">収集状況一覧</h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-500"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>

                <div className="p-4 sm:p-6">
                    {/* Overall Section */}
                    <div className="mb-6">
                        <CollectionStatusItem
                            label="全体"
                            totalProgress={allStats.overall.total}
                            dozingProgress={allStats.overall.dozing}
                            snoozingProgress={allStats.overall.snoozing}
                            slumberingProgress={allStats.overall.slumbering}
                            rarity1Progress={allStats.overall.rarity1}
                            rarity2Progress={allStats.overall.rarity2}
                            rarity3Progress={allStats.overall.rarity3}
                            rarity4Progress={allStats.overall.rarity4}
                        />
                    </div>

                    <hr className="my-6 border-gray-100" />

                    {/* Field Lists */}
                    <div className="space-y-4">
                        {allStats.fields.map(field => (
                            <CollectionStatusItem
                                key={field.name}
                                label={field.name}
                                totalProgress={field.stats.total}
                                dozingProgress={field.stats.dozing}
                                snoozingProgress={field.stats.snoozing}
                                slumberingProgress={field.stats.slumbering}
                                rarity1Progress={field.stats.rarity1}
                                rarity2Progress={field.stats.rarity2}
                                rarity3Progress={field.stats.rarity3}
                                rarity4Progress={field.stats.rarity4}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
