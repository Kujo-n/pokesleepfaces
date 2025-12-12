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
