import { Pokemon, SleepStyle } from '@/data/mockData';

/**
 * フィルタリングオプション
 */
export type StyleFilterOptions = {
    selectedField: string;
    selectedRarity: string;
    showUncollectedOnly: boolean;
    filterBaseCollectedStyles: Set<string>;
};

/**
 * ポケモンのスタイルをフィルタリングする共通ロジック
 * PokemonCard と PokemonGridRow で共有
 */
export function filterPokemonStyles(
    pokemon: Pokemon,
    options: StyleFilterOptions
): { availableStyles: SleepStyle[]; displayStyles: SleepStyle[] } {
    const { selectedField, selectedRarity, showUncollectedOnly, filterBaseCollectedStyles } = options;

    // フィールドでフィルタリング
    let availableStyles = selectedField === 'all'
        ? pokemon.styles
        : pokemon.styles.filter(s =>
            !s.excludeFromFields || !s.excludeFromFields.includes(selectedField)
        );

    // レアリティでフィルタリング
    if (selectedRarity !== 'all') {
        const rarityNum = parseInt(selectedRarity);
        availableStyles = availableStyles.filter(s => s.rarity === rarityNum);
    }

    // 未収集のみフィルタが有効な場合、収集済みスタイルを除外
    const displayStyles = showUncollectedOnly
        ? availableStyles.filter(s => !filterBaseCollectedStyles.has(s.id))
        : availableStyles;

    return { availableStyles, displayStyles };
}

/**
 * 睡眠タイプに応じた色クラスを返す
 */
export function getSleepTypeColor(type: string, withBorder = false): string {
    const colors: Record<string, string> = {
        'うとうと': withBorder ? 'bg-yellow-100 text-yellow-800 border-yellow-200' : 'bg-yellow-100 text-yellow-800',
        'すやすや': withBorder ? 'bg-blue-100 text-blue-800 border-blue-200' : 'bg-blue-100 text-blue-800',
        'ぐっすり': withBorder ? 'bg-indigo-100 text-indigo-800 border-indigo-200' : 'bg-indigo-100 text-indigo-800',
    };
    return colors[type] || (withBorder ? 'bg-gray-100 text-gray-800 border-gray-200' : 'bg-gray-100 text-gray-800');
}

/**
 * スタイルをレアリティ別にグループ化
 */
export function groupStylesByRarity(styles: SleepStyle[]): Map<number, SleepStyle[]> {
    const map = new Map<number, SleepStyle[]>();
    for (let r = 1; r <= 4; r++) {
        map.set(r, styles.filter(s => s.rarity === r));
    }
    return map;
}
