/**
 * フィルタ状態の型定義
 * 一括操作で使用するフィルタパラメータを一元管理
 * 
 * Note: selectedSleepTypeは含まない
 * - 睡眠タイプはポケモン全体をフィルタリングするため、
 *   filteredPokemonには該当タイプのポケモンしか含まれない
 * - 一括操作はfilteredPokemon（既にフィルタ済み）に対して行われる
 * - したがって、一括操作関数内で睡眠タイプを再度確認する必要がない
 */
export type FilterState = {
    selectedField: string;
    selectedRarity: string;
};

/**
 * 睡眠タイプの型定義
 */
export type SleepType = 'all' | 'うとうと' | 'すやすや' | 'ぐっすり';

/**
 * 表示モードの型定義
 */
export type ViewMode = 'card' | 'grid';

/**
 * フィルタ値のフルセット（UI表示用）
 */
export type FilterValues = {
    selectedField: string;
    selectedSleepType: SleepType;
    selectedRarity: string;
    showUncollectedOnly: boolean;
    viewMode: ViewMode;
};

/**
 * フィルタ操作関数群
 */
export type FilterActions = {
    setSelectedField: (field: string) => void;
    setSelectedSleepType: (type: SleepType) => void;
    setSelectedRarity: (rarity: string) => void;
    setShowUncollectedOnly: (show: boolean) => void;
    setViewMode: (mode: ViewMode) => void;
    updateFilterPreferences: (updates: Partial<FilterValues>) => void;
};

/**
 * フィルタ関連のProps（FilterPanelなどで使用）
 */
export type FilterProps = {
    filterValues: FilterValues;
    filterActions: FilterActions;
    collectedStyles: Set<string>;
    setFilterBaseCollectedStyles: (styles: Set<string>) => void;
};
