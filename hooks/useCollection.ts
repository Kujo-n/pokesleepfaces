'use client';

import { useState, useEffect, useCallback } from 'react';
import { User } from 'firebase/auth';
import { Pokemon, MOCK_POKEMON } from '@/data/mockData';
import { toggleSleepStyle, toggleAllStyles, subscribeToUserCollection, checkIfNewUser } from '@/lib/db';
import { saveToLocalStorage, loadFromLocalStorage, migrateToFirestore } from '@/lib/localStorage';

/**
 * コレクション状態とCRUD操作を管理するカスタムフック
 */
export const useCollection = (user: User | null) => {
  const [collectedStyles, setCollectedStyles] = useState<Set<string>>(new Set());
  const [isInitialized, setIsInitialized] = useState(false);

  // 初期化: localStorageから読み込み
  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof window !== 'undefined') {
        const localData = loadFromLocalStorage();
        if (localData.size > 0) {
          setCollectedStyles(localData);
        }
        setIsInitialized(true);
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Firestoreサブスクリプション & マイグレーション
  useEffect(() => {
    if (!user || !isInitialized) return;

    const handleUserLogin = async () => {
      const localData = loadFromLocalStorage();
      if (localData.size > 0) {
        await migrateToFirestore(user.uid, localData, toggleSleepStyle, MOCK_POKEMON, checkIfNewUser);
      }

      const unsubscribe = subscribeToUserCollection(user.uid, (newCollected) => {
        setCollectedStyles(newCollected);
      });

      return unsubscribe;
    };

    const unsubscribePromise = handleUserLogin();

    return () => {
      unsubscribePromise.then(unsub => unsub && unsub());
    };
  }, [user, isInitialized]);

  // 単一スタイルのトグル
  const toggleStyle = useCallback(async (styleId: string) => {
    const isCollected = collectedStyles.has(styleId);

    // Optimistic UI update
    const newSet = new Set(collectedStyles);
    if (isCollected) {
      newSet.delete(styleId);
    } else {
      newSet.add(styleId);
    }
    setCollectedStyles(newSet);

    if (user) {
      const pokemon = MOCK_POKEMON.find(p => p.styles.some(s => s.id === styleId));
      if (pokemon) {
        try {
          await toggleSleepStyle(user.uid, pokemon.id, styleId, !isCollected);
        } catch (e) {
          console.error("Failed to toggle style", e);
          setCollectedStyles(collectedStyles); // Rollback
          alert("保存に失敗しました");
        }
      }
    } else {
      saveToLocalStorage(newSet);
    }
  }, [user, collectedStyles]);

  // ポケモン単位での一括トグル
  const toggleAllPokemonStyles = useCallback(async (pokemon: Pokemon, select: boolean, selectedField: string) => {
    const targetStyles = selectedField === 'all'
      ? pokemon.styles
      : pokemon.styles.filter(s => s.locations.includes(selectedField));

    const targetStyleIds = targetStyles.map(s => s.id);

    const newSet = new Set(collectedStyles);
    targetStyleIds.forEach((id) => {
      if (select) {
        newSet.add(id);
      } else {
        newSet.delete(id);
      }
    });
    setCollectedStyles(newSet);

    if (user) {
      try {
        await toggleAllStyles(user.uid, pokemon.id, targetStyleIds, select);
      } catch (e) {
        console.error("Failed to toggle all styles", e);
        setCollectedStyles(collectedStyles);
        alert("保存に失敗しました");
      }
    } else {
      saveToLocalStorage(newSet);
    }
  }, [user, collectedStyles]);

  // グローバル一括トグル
  const toggleGlobal = useCallback(async (filteredPokemon: Pokemon[], select: boolean, selectedField: string) => {
    const updates = filteredPokemon.map(p => {
      const targetStyles = selectedField === 'all'
        ? p.styles
        : p.styles.filter(s => s.locations.includes(selectedField));
      return {
        pokemonId: p.id,
        styleIds: targetStyles.map(s => s.id)
      };
    }).filter(u => u.styleIds.length > 0);

    const newSet = new Set(collectedStyles);
    updates.forEach(u => {
      u.styleIds.forEach(id => {
        if (select) {
          newSet.add(id);
        } else {
          newSet.delete(id);
        }
      });
    });
    setCollectedStyles(newSet);

    if (user) {
      const promises = updates.map(u => toggleAllStyles(user.uid, u.pokemonId, u.styleIds, select));
      try {
        await Promise.all(promises);
      } catch (e) {
        console.error("Failed to toggle global", e);
        setCollectedStyles(collectedStyles);
        alert("一部の保存に失敗しました");
      }
    } else {
      saveToLocalStorage(newSet);
    }
  }, [user, collectedStyles]);

  return {
    collectedStyles,
    toggleStyle,
    toggleAllPokemonStyles,
    toggleGlobal,
    isInitialized
  };
};
