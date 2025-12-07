'use client';

import { useMemo } from 'react';
import { Pokemon } from '@/data/mockData';

type ProgressResult = {
  total: number;
  collected: number;
  percentage: string;
};

/**
 * スタイルフィルタリングのヘルパー関数（DRY原則）
 */
const filterStyles = (
  pokemon: Pokemon,
  selectedField: string,
  selectedRarity: string,
  showUncollectedOnly: boolean,
  filterBaseCollectedStyles: Set<string>
) => {
  let styles = selectedField === 'all'
    ? pokemon.styles
    : pokemon.styles.filter(s =>
      !s.excludeFromFields || !s.excludeFromFields.includes(selectedField)
    );

  if (selectedRarity !== 'all') {
    const rarityNum = parseInt(selectedRarity);
    styles = styles.filter(s => s.rarity === rarityNum);
  }

  if (showUncollectedOnly) {
    styles = styles.filter(s => !filterBaseCollectedStyles.has(s.id));
  }

  return styles;
};

/**
 * 進捗計算の汎用関数（DRY原則 - calculateProgressとcalculateRarityProgressを統合）
 */
const calculateProgress = (
  pokemonList: Pokemon[],
  collectedStyles: Set<string>,
  selectedField: string,
  selectedRarity: string,
  showUncollectedOnly: boolean,
  filterBaseCollectedStyles: Set<string>,
  rarityFilter?: number
): ProgressResult => {
  const total = pokemonList.reduce((acc, p) => {
    let styles = filterStyles(p, selectedField, selectedRarity, showUncollectedOnly, filterBaseCollectedStyles);

    if (rarityFilter !== undefined) {
      styles = styles.filter(s => s.rarity === rarityFilter);
    }

    return acc + styles.length;
  }, 0);

  const collected = pokemonList.reduce((acc, p) => {
    let styles = filterStyles(p, selectedField, selectedRarity, showUncollectedOnly, filterBaseCollectedStyles);

    if (rarityFilter !== undefined) {
      styles = styles.filter(s => s.rarity === rarityFilter);
    }

    return acc + styles.filter(s => collectedStyles.has(s.id)).length;
  }, 0);

  return {
    total,
    collected,
    percentage: total === 0 ? '0.0' : ((collected / total) * 100).toFixed(1)
  };
};

/**
 * 進捗表示用のカスタムフック
 */
export const useProgress = (
  filteredPokemon: Pokemon[],
  collectedStyles: Set<string>,
  selectedField: string,
  selectedRarity: string,
  showUncollectedOnly: boolean,
  filterBaseCollectedStyles: Set<string>
) => {
  // 全体進捗
  const totalProgress = useMemo(
    () => calculateProgress(filteredPokemon, collectedStyles, selectedField, selectedRarity, showUncollectedOnly, filterBaseCollectedStyles),
    [filteredPokemon, collectedStyles, selectedField, selectedRarity, showUncollectedOnly, filterBaseCollectedStyles]
  );

  // 睡眠タイプ別進捗
  const dozingProgress = useMemo(
    () => calculateProgress(
      filteredPokemon.filter(p => p.sleepType === 'うとうと'),
      collectedStyles,
      selectedField,
      selectedRarity,
      showUncollectedOnly,
      filterBaseCollectedStyles
    ),
    [filteredPokemon, collectedStyles, selectedField, selectedRarity, showUncollectedOnly, filterBaseCollectedStyles]
  );

  const snoozingProgress = useMemo(
    () => calculateProgress(
      filteredPokemon.filter(p => p.sleepType === 'すやすや'),
      collectedStyles,
      selectedField,
      selectedRarity,
      showUncollectedOnly,
      filterBaseCollectedStyles
    ),
    [filteredPokemon, collectedStyles, selectedField, selectedRarity, showUncollectedOnly, filterBaseCollectedStyles]
  );

  const slumberingProgress = useMemo(
    () => calculateProgress(
      filteredPokemon.filter(p => p.sleepType === 'ぐっすり'),
      collectedStyles,
      selectedField,
      selectedRarity,
      showUncollectedOnly,
      filterBaseCollectedStyles
    ),
    [filteredPokemon, collectedStyles, selectedField, selectedRarity, showUncollectedOnly, filterBaseCollectedStyles]
  );

  // レアリティ別進捗
  const rarity1Progress = useMemo(
    () => calculateProgress(filteredPokemon, collectedStyles, selectedField, selectedRarity, showUncollectedOnly, filterBaseCollectedStyles, 1),
    [filteredPokemon, collectedStyles, selectedField, selectedRarity, showUncollectedOnly, filterBaseCollectedStyles]
  );

  const rarity2Progress = useMemo(
    () => calculateProgress(filteredPokemon, collectedStyles, selectedField, selectedRarity, showUncollectedOnly, filterBaseCollectedStyles, 2),
    [filteredPokemon, collectedStyles, selectedField, selectedRarity, showUncollectedOnly, filterBaseCollectedStyles]
  );

  const rarity3Progress = useMemo(
    () => calculateProgress(filteredPokemon, collectedStyles, selectedField, selectedRarity, showUncollectedOnly, filterBaseCollectedStyles, 3),
    [filteredPokemon, collectedStyles, selectedField, selectedRarity, showUncollectedOnly, filterBaseCollectedStyles]
  );

  const rarity4Progress = useMemo(
    () => calculateProgress(filteredPokemon, collectedStyles, selectedField, selectedRarity, showUncollectedOnly, filterBaseCollectedStyles, 4),
    [filteredPokemon, collectedStyles, selectedField, selectedRarity, showUncollectedOnly, filterBaseCollectedStyles]
  );

  return {
    totalProgress,
    dozingProgress,
    snoozingProgress,
    slumberingProgress,
    rarity1Progress,
    rarity2Progress,
    rarity3Progress,
    rarity4Progress
  };
};
