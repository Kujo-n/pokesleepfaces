'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { User } from 'firebase/auth';
import { MOCK_POKEMON } from '@/data/mockData';
import { saveFilterPreferences, loadFilterPreferences } from '@/lib/db';

type SleepType = 'all' | 'うとうと' | 'すやすや' | 'ぐっすり';

/**
 * フィルタ状態と操作を管理するカスタムフック
 */
export const useFilters = (user: User | null, collectedStyles: Set<string>) => {
  const [selectedField, setSelectedField] = useState<string>('all');
  const [selectedSleepType, setSelectedSleepType] = useState<SleepType>('all');
  const [selectedRarity, setSelectedRarity] = useState<string>('all');
  const [showUncollectedOnly, setShowUncollectedOnly] = useState<boolean>(false);
  const [filterBaseCollectedStyles, setFilterBaseCollectedStyles] = useState<Set<string>>(new Set());

  // ログイン時にフィルタ設定を読み込み
  useEffect(() => {
    if (user) {
      loadFilterPreferences(user.uid).then(prefs => {
        if (prefs) {
          setSelectedField(prefs.selectedField);
          setSelectedSleepType(prefs.selectedSleepType as SleepType);
          if (prefs.selectedRarity) setSelectedRarity(prefs.selectedRarity);
          setShowUncollectedOnly(prefs.showUncollectedOnly);
        }
      });
    }
  }, [user]);

  // 未収集フィルタのベース設定
  useEffect(() => {
    if (showUncollectedOnly && collectedStyles.size > 0 && filterBaseCollectedStyles.size === 0) {
      const timer = setTimeout(() => {
        setFilterBaseCollectedStyles(new Set(collectedStyles));
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [collectedStyles, showUncollectedOnly, filterBaseCollectedStyles.size]);

  // フィルタ設定を保存
  const updateFilterPreferences = useCallback((
    updates: { field?: string; sleepType?: string; rarity?: string; uncollectedOnly?: boolean }
  ) => {
    if (user) {
      saveFilterPreferences(user.uid, {
        selectedField: updates.field ?? selectedField,
        selectedSleepType: updates.sleepType ?? selectedSleepType,
        selectedRarity: updates.rarity ?? selectedRarity,
        showUncollectedOnly: updates.uncollectedOnly ?? showUncollectedOnly
      });
    }
  }, [user, selectedField, selectedSleepType, selectedRarity, showUncollectedOnly]);

  // フィルタリング処理
  const filteredPokemon = useMemo(() => {
    return MOCK_POKEMON.filter(p => {
      // 1. フィールドによるフィルタ（ポケモンレベル）- 除外率が高いため最初に実行
      if (selectedField !== 'all') {
        if (!p.fields.includes(selectedField)) return false;
      }

      // 2. 睡眠タイプによるフィルタ（ポケモンレベル）
      if (selectedSleepType !== 'all' && p.sleepType !== selectedSleepType) {
        return false;
      }

      // 3. スタイルによるフィルタ（フィールドとレアリティ）
      let candidateStyles = p.styles;

      // フィールドで絞り込み（スタイルレベル）
      if (selectedField !== 'all') {
        candidateStyles = candidateStyles.filter(s =>
          !s.excludeFromFields || !s.excludeFromFields.includes(selectedField)
        );
      }

      // 4. レアリティで絞り込み
      if (selectedRarity !== 'all') {
        const rarityNum = parseInt(selectedRarity);
        candidateStyles = candidateStyles.filter(s => s.rarity === rarityNum);
      }

      // 条件に合うスタイルが一つもなければ非表示
      if (candidateStyles.length === 0) return false;

      // 5. 未収集のみフィルタ
      if (showUncollectedOnly) {
        // 残った候補スタイルの中に、未収集のものが含まれているかチェック
        const hasUncollected = candidateStyles.some(s => !filterBaseCollectedStyles.has(s.id));
        return hasUncollected;
      }

      return true;
    });
  }, [selectedSleepType, selectedField, selectedRarity, showUncollectedOnly, filterBaseCollectedStyles]);

  return {
    selectedField,
    setSelectedField,
    selectedSleepType,
    setSelectedSleepType,
    selectedRarity,
    setSelectedRarity,
    showUncollectedOnly,
    setShowUncollectedOnly,
    filterBaseCollectedStyles,
    setFilterBaseCollectedStyles,
    filteredPokemon,
    updateFilterPreferences
  };
};
