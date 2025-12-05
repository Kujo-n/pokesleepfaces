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
  const [showUncollectedOnly, setShowUncollectedOnly] = useState<boolean>(false);
  const [filterBaseCollectedStyles, setFilterBaseCollectedStyles] = useState<Set<string>>(new Set());

  // ログイン時にフィルタ設定を読み込み
  useEffect(() => {
    if (user) {
      loadFilterPreferences(user.uid).then(prefs => {
        if (prefs) {
          setSelectedField(prefs.selectedField);
          setSelectedSleepType(prefs.selectedSleepType as SleepType);
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
    updates: { field?: string; sleepType?: string; uncollectedOnly?: boolean }
  ) => {
    if (user) {
      saveFilterPreferences(user.uid, {
        selectedField: updates.field ?? selectedField,
        selectedSleepType: updates.sleepType ?? selectedSleepType,
        showUncollectedOnly: updates.uncollectedOnly ?? showUncollectedOnly
      });
    }
  }, [user, selectedField, selectedSleepType, showUncollectedOnly]);

  // フィルタリング処理
  const filteredPokemon = useMemo(() => {
    return MOCK_POKEMON.filter(p => {
      const matchesSleepType = selectedSleepType === 'all' || p.sleepType === selectedSleepType;
      if (!matchesSleepType) return false;

      const hasStylesInField = selectedField === 'all' || p.styles.some(s => s.locations.includes(selectedField));
      if (!hasStylesInField) return false;

      if (showUncollectedOnly) {
        const availableStyles = selectedField === 'all'
          ? p.styles
          : p.styles.filter(s => s.locations.includes(selectedField));
        const hasUncollected = availableStyles.some(s => !filterBaseCollectedStyles.has(s.id));
        return hasUncollected;
      }

      return true;
    });
  }, [selectedSleepType, selectedField, showUncollectedOnly, filterBaseCollectedStyles]);

  return {
    selectedField,
    setSelectedField,
    selectedSleepType,
    setSelectedSleepType,
    showUncollectedOnly,
    setShowUncollectedOnly,
    filterBaseCollectedStyles,
    setFilterBaseCollectedStyles,
    filteredPokemon,
    updateFilterPreferences
  };
};
