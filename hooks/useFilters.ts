'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { User } from 'firebase/auth';
import { MOCK_POKEMON } from '@/data/mockData';
import { saveFilterPreferences, loadFilterPreferences } from '@/lib/db';
import { SleepType, ViewMode, FilterValues, FilterActions } from '@/types/filters';

/**
 * フィルタ状態と操作を管理するカスタムフック
 */
export const useFilters = (user: User | null, collectedStyles: Set<string>) => {
  const [selectedField, setSelectedField] = useState<string>('all');
  const [selectedSleepType, setSelectedSleepType] = useState<SleepType>('all');
  const [selectedRarity, setSelectedRarity] = useState<string>('all');
  const [showUncollectedOnly, setShowUncollectedOnly] = useState<boolean>(false);
  const [filterBaseCollectedStyles, setFilterBaseCollectedStyles] = useState<Set<string>>(new Set());
  const [viewMode, setViewMode] = useState<ViewMode>('card');

  // ログイン時にフィルタ設定を読み込み
  useEffect(() => {
    if (user) {
      loadFilterPreferences(user.uid).then(prefs => {
        if (prefs) {
          setSelectedField(prefs.selectedField);
          setSelectedSleepType(prefs.selectedSleepType as SleepType);
          if (prefs.selectedRarity) setSelectedRarity(prefs.selectedRarity);
          setShowUncollectedOnly(prefs.showUncollectedOnly);
          if (prefs.viewMode) setViewMode(prefs.viewMode);
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
    updates: Partial<FilterValues>
  ) => {
    if (user) {
      saveFilterPreferences(user.uid, {
        selectedField: updates.selectedField ?? selectedField,
        selectedSleepType: updates.selectedSleepType ?? selectedSleepType,
        selectedRarity: updates.selectedRarity ?? selectedRarity,
        showUncollectedOnly: updates.showUncollectedOnly ?? showUncollectedOnly,
        viewMode: updates.viewMode ?? viewMode
      });
    }
  }, [user, selectedField, selectedSleepType, selectedRarity, showUncollectedOnly, viewMode]);

  // フィルタリング処理
  const filteredPokemon = useMemo(() => {
    return MOCK_POKEMON.filter(p => {
      // 1. 睡眠タイプによるフィルタ（ポケモンレベル）- 文字列比較で低コストかつ66%除外できるため最優先
      if (selectedSleepType !== 'all' && p.sleepType !== selectedSleepType) {
        return false;
      }

      // 2. フィールドによるフィルタ（ポケモンレベル）
      if (selectedField !== 'all') {
        if (!p.fields.includes(selectedField)) return false;
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

  // フィルタ値をまとめたオブジェクト
  const filterValues: FilterValues = useMemo(() => ({
    selectedField,
    selectedSleepType,
    selectedRarity,
    showUncollectedOnly,
    viewMode
  }), [selectedField, selectedSleepType, selectedRarity, showUncollectedOnly, viewMode]);

  // フィルタ操作関数をまとめたオブジェクト
  const filterActions: FilterActions = useMemo(() => ({
    setSelectedField,
    setSelectedSleepType,
    setSelectedRarity,
    setShowUncollectedOnly,
    setViewMode,
    updateFilterPreferences
  }), [updateFilterPreferences]);

  return {
    // 新しい構造化された戻り値
    filterValues,
    filterActions,
    filteredPokemon,
    filterBaseCollectedStyles,
    setFilterBaseCollectedStyles,
    // 後方互換性のための個別エクスポート（段階的移行用）
    selectedField,
    setSelectedField,
    selectedSleepType,
    setSelectedSleepType,
    selectedRarity,
    setSelectedRarity,
    showUncollectedOnly,
    setShowUncollectedOnly,
    updateFilterPreferences,
    viewMode,
    setViewMode
  };
};
