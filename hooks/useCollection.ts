'use client';

import { useState, useEffect, useCallback } from 'react';
import { User } from 'firebase/auth';
import { Pokemon, MOCK_POKEMON } from '@/data/mockData';
import { toggleSleepStyle, toggleAllStyles, toggleMultiplePokemonStyles, subscribeToUserCollection, checkIfNewUser } from '@/lib/db';
import { saveToLocalStorage, loadFromLocalStorage, migrateToFirestore } from '@/lib/localStorage';
import { useToast } from '@/components/providers/ToastProvider';

/**
 * コレクション状態とCRUD操作を管理するカスタムフック
 */
export const useCollection = (user: User | null) => {
  const [collectedStyles, setCollectedStyles] = useState<Set<string>>(new Set());
  const [isInitialized, setIsInitialized] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false); // Firestore同期中フラグ
  const { showToast } = useToast();

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

    let isFirstSnapshot = true;
    let isMounted = true;

    const handleUserLogin = async () => {
      if (isMounted) setIsSyncing(true); // 同期開始

      const localData = loadFromLocalStorage();
      if (localData.size > 0) {
        await migrateToFirestore(user.uid, localData, toggleSleepStyle, MOCK_POKEMON, checkIfNewUser);
      }

      const unsubscribe = subscribeToUserCollection(user.uid, (newCollected) => {
        if (isMounted) {
          setCollectedStyles(newCollected);
          if (isFirstSnapshot) {
            isFirstSnapshot = false;
            setIsSyncing(false); // 初回同期完了
          }
        }
      });

      return unsubscribe;
    };

    const unsubscribePromise = handleUserLogin();

    return () => {
      isMounted = false;
      unsubscribePromise.then(unsub => unsub && unsub());
    };
  }, [user, isInitialized]);

  // 状態変更時にlocalStorageに自動保存
  useEffect(() => {
    if (isInitialized && collectedStyles.size > 0) {
      saveToLocalStorage(collectedStyles);
    }
  }, [collectedStyles, isInitialized]);

  // 単一スタイルのトグル
  const toggleStyle = useCallback(async (styleId: string) => {
    // Optimistic UI update only for guest users or if needed for transition
    // For logged-in users, rely on snapshot listener to avoid race conditions
    if (!user) {
      setCollectedStyles(prev => {
        const newSet = new Set(prev);
        if (newSet.has(styleId)) {
          newSet.delete(styleId);
        } else {
          newSet.add(styleId);
        }
        return newSet;
      });
    }

    if (user) {
      const isCollected = collectedStyles.has(styleId);
      const pokemon = MOCK_POKEMON.find(p => p.styles.some(s => s.id === styleId));
      if (pokemon) {
        try {
          await toggleSleepStyle(user.uid, pokemon.id, styleId, !isCollected);
        } catch (e) {
          console.error("Failed to toggle style", e);
          showToast("保存に失敗しました", "error");
        }
      }
    }
    // localStorage save is handled by useEffect
  }, [user, collectedStyles, showToast]);

  // ポケモン単位での一括トグル
  const toggleAllPokemonStyles = useCallback(async (pokemon: Pokemon, select: boolean, selectedField: string) => {
    const targetStyles = selectedField === 'all'
      ? pokemon.styles
      : pokemon.styles.filter(s =>
        !s.excludeFromFields || !s.excludeFromFields.includes(selectedField)
      );

    const targetStyleIds = targetStyles
      .map(s => s.id)
      .filter(id => id.startsWith(pokemon.id)); // 安全策: IDが整合しているもののみ対象にする

    if (!user) {
      setCollectedStyles(prev => {
        const newSet = new Set(prev);
        targetStyleIds.forEach((id) => {
          if (select) {
            newSet.add(id);
          } else {
            newSet.delete(id);
          }
        });
        return newSet;
      });
    }

    if (user) {
      try {
        await toggleAllStyles(user.uid, pokemon.id, targetStyleIds, select);
      } catch (e) {
        console.error("Failed to toggle all styles", e);
        showToast("保存に失敗しました", "error");
      }
    }
    // localStorage save is handled by useEffect
  }, [user, showToast]); // Removed collectedStyles dependency as we use functional update for local state

  // グローバル一括トグル
  const toggleGlobal = useCallback(async (filteredPokemon: Pokemon[], select: boolean, selectedField: string) => {
    const updates = filteredPokemon.map(p => {
      const targetStyles = selectedField === 'all'
        ? p.styles
        : p.styles.filter(s =>
          !s.excludeFromFields || !s.excludeFromFields.includes(selectedField)
        );
      return {
        pokemonId: p.id,
        styleIds: targetStyles.map(s => s.id).filter(id => id.startsWith(p.id))
      };
    }).filter(u => u.styleIds.length > 0);

    if (!user) {
      setCollectedStyles(prev => {
        const newSet = new Set(prev);
        updates.forEach(u => {
          u.styleIds.forEach(id => {
            if (select) {
              newSet.add(id);
            } else {
              newSet.delete(id);
            }
          });
        });
        return newSet;
      });
    }

    if (user) {
      try {
        await toggleMultiplePokemonStyles(user.uid, updates, select);
      } catch (e) {
        console.error("Failed to toggle global", e);
        showToast("一部の保存に失敗しました", "error");
      }
    }
    // localStorage save is handled by useEffect
  }, [user, showToast]); // Removed collectedStyles dependency as we use functional update for local state

  return {
    collectedStyles,
    toggleStyle,
    toggleAllPokemonStyles,
    toggleGlobal,
    isInitialized,
    isSyncing
  };
};
