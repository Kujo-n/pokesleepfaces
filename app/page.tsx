'use client';

import { useState, useEffect } from 'react';
import { MOCK_POKEMON, Pokemon, FIELD_NAMES } from '@/data/mockData';
import PokemonCard from '@/components/PokemonCard';
import AuthButton from '@/components/AuthButton';
import { auth } from '@/firebase/config';
import { subscribeToUserCollection, toggleSleepStyle, toggleAllStyles, checkIfNewUser } from '@/lib/db';
import { onAuthStateChanged, User } from 'firebase/auth';
import { saveToLocalStorage, loadFromLocalStorage, migrateToFirestore } from '@/lib/localStorage';

export default function Home() {
  const [collectedStyles, setCollectedStyles] = useState<Set<string>>(new Set());
  const [selectedField, setSelectedField] = useState<string>('all');
  const [user, setUser] = useState<User | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize from localStorage for guest users
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const localData = loadFromLocalStorage();
      if (localData.size > 0) {
        setCollectedStyles(localData);
      }
      setIsInitialized(true);
    }
  }, []);

  // Auth State Observer
  useEffect(() => {
    if (!auth) return;
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, []);

  // Firestore Subscription and Migration
  useEffect(() => {
    if (!user || !isInitialized) return;

    const handleUserLogin = async () => {
      // LocalStorageにデータがある場合、新規ユーザーなら移行
      const localData = loadFromLocalStorage();
      if (localData.size > 0) {
        await migrateToFirestore(user.uid, localData, toggleSleepStyle, MOCK_POKEMON, checkIfNewUser);
      }

      // Firestoreからデータを購読
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

  const toggleStyle = async (styleId: string) => {
    const isCollected = collectedStyles.has(styleId);

    // Optimistic UI update - immediately update local state
    const newSet = new Set(collectedStyles);
    if (isCollected) {
      newSet.delete(styleId);
    } else {
      newSet.add(styleId);
    }
    setCollectedStyles(newSet);

    if (user) {
      // Logged in: Save to Firestore
      const pokemon = MOCK_POKEMON.find(p => p.styles.some(s => s.id === styleId));
      if (pokemon) {
        try {
          await toggleSleepStyle(user.uid, pokemon.id, styleId, !isCollected);
        } catch (e) {
          console.error("Failed to toggle style", e);
          setCollectedStyles(collectedStyles);
          alert("保存に失敗しました");
        }
      }
    } else {
      // Guest user: Save to localStorage
      saveToLocalStorage(newSet);
    }
  };

  const toggleAllPokemonStyles = async (pokemon: Pokemon, select: boolean) => {
    // Optimistic UI update - immediately update local state
    const newSet = new Set(collectedStyles);
    pokemon.styles.forEach((style) => {
      if (select) {
        newSet.add(style.id);
      } else {
        newSet.delete(style.id);
      }
    });
    setCollectedStyles(newSet);

    if (user) {
      try {
        await toggleAllStyles(user.uid, pokemon, select);
      } catch (e) {
        console.error("Failed to toggle all styles", e);
        setCollectedStyles(collectedStyles);
        alert("保存に失敗しました");
      }
    } else {
      // Guest user: Save to localStorage
      saveToLocalStorage(newSet);
    }
  };

  const toggleGlobal = async (select: boolean) => {
    if (user) {
      // This might be heavy if many pokemon are displayed, but for now it's okay
      // Ideally we should have a batch operation in backend or a single document for all progress if it's small enough
      // Given the structure, we loop.
      // To avoid spamming write ops, maybe warn user? Or just do it.
      // For filtered list:
      const promises = filteredPokemon.map(p => toggleAllStyles(user.uid, p, select));
      try {
        await Promise.all(promises);
      } catch (e) {
        console.error("Failed to toggle global", e);
        alert("一部の保存に失敗しました");
      }
    } else {
      const newSet = new Set(collectedStyles);
      filteredPokemon.forEach((pokemon) => {
        pokemon.styles.forEach((style) => {
          if (select) {
            newSet.add(style.id);
          } else {
            newSet.delete(style.id);
          }
        });
      });
      setCollectedStyles(newSet);
    }
  };

  // Filter Logic
  const filteredPokemon = selectedField === 'all'
    ? MOCK_POKEMON
    : MOCK_POKEMON.filter(p => p.fields.includes(selectedField));

  // Progress Calculation
  const calculateProgress = (pokemonList: Pokemon[]) => {
    const total = pokemonList.reduce((acc, p) => acc + p.styles.length, 0);
    const collected = pokemonList.reduce((acc, p) => {
      return acc + p.styles.filter(s => collectedStyles.has(s.id)).length;
    }, 0);
    return { total, collected, percentage: total === 0 ? 0 : Math.round((collected / total) * 100) };
  };

  const totalProgress = calculateProgress(filteredPokemon);
  const dozingProgress = calculateProgress(filteredPokemon.filter(p => p.sleepType === 'うとうと'));
  const snoozingProgress = calculateProgress(filteredPokemon.filter(p => p.sleepType === 'すやすや'));
  const slumberingProgress = calculateProgress(filteredPokemon.filter(p => p.sleepType === 'ぐっすり'));

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h1 className="text-xl font-bold text-gray-900">ポケモンスリープ寝顔図鑑</h1>
              <AuthButton />
            </div>

            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <button
                  onClick={() => toggleGlobal(true)}
                  className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                >
                  表示中を全チェック
                </button>
                <button
                  onClick={() => toggleGlobal(false)}
                  className="px-4 py-2 bg-white text-gray-700 text-sm font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors shadow-sm"
                >
                  全解除
                </button>
              </div>
            </div>

            {/* Filter */}
            <div className="flex flex-wrap items-center gap-2 pb-2">
              <button
                onClick={() => setSelectedField('all')}
                className={`px-3 py-1.5 rounded-full text-sm transition-colors ${selectedField === 'all'
                  ? 'bg-gray-800 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
              >
                全て
              </button>
              {FIELD_NAMES.map(field => (
                <button
                  key={field}
                  onClick={() => setSelectedField(field)}
                  className={`px-3 py-1.5 rounded-full text-sm transition-colors ${selectedField === field
                    ? 'bg-green-600 text-white'
                    : 'bg-green-50 text-green-700 hover:bg-green-100'
                    }`}
                >
                  {field}
                </button>
              ))}
            </div>

            {/* Progress Bars */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs sm:text-sm">
              <div className="bg-gray-50 p-2 rounded border border-gray-100">
                <div className="font-bold text-gray-700 mb-1">全体</div>
                <div className="flex justify-between mb-1">
                  <span>{totalProgress.percentage}%</span>
                  <span className="text-gray-500">{totalProgress.collected}/{totalProgress.total}</span>
                </div>
                <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-gray-800" style={{ width: `${totalProgress.percentage}%` }} />
                </div>
              </div>

              <div className="bg-yellow-50 p-2 rounded border border-yellow-100">
                <div className="font-bold text-yellow-800 mb-1">うとうと</div>
                <div className="flex justify-between mb-1 text-yellow-900">
                  <span>{dozingProgress.percentage}%</span>
                  <span>{dozingProgress.collected}/{dozingProgress.total}</span>
                </div>
                <div className="h-1.5 bg-yellow-200 rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-500" style={{ width: `${dozingProgress.percentage}%` }} />
                </div>
              </div>

              <div className="bg-blue-50 p-2 rounded border border-blue-100">
                <div className="font-bold text-blue-800 mb-1">すやすや</div>
                <div className="flex justify-between mb-1 text-blue-900">
                  <span>{snoozingProgress.percentage}%</span>
                  <span>{snoozingProgress.collected}/{snoozingProgress.total}</span>
                </div>
                <div className="h-1.5 bg-blue-200 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500" style={{ width: `${snoozingProgress.percentage}%` }} />
                </div>
              </div>

              <div className="bg-indigo-50 p-2 rounded border border-indigo-100">
                <div className="font-bold text-indigo-800 mb-1">ぐっすり</div>
                <div className="flex justify-between mb-1 text-indigo-900">
                  <span>{slumberingProgress.percentage}%</span>
                  <span>{slumberingProgress.collected}/{slumberingProgress.total}</span>
                </div>
                <div className="h-1.5 bg-indigo-200 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500" style={{ width: `${slumberingProgress.percentage}%` }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 gap-4">
          {filteredPokemon.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
              collectedStyles={collectedStyles}
              onToggleStyle={toggleStyle}
              onToggleAll={toggleAllPokemonStyles}
            />
          ))}
          {filteredPokemon.length === 0 && (
            <div className="text-center py-10 text-gray-500">
              該当するポケモンがいません
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
