'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
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
  const [selectedSleepType, setSelectedSleepType] = useState<'all' | 'うとうと' | 'すやすや' | 'ぐっすり'>('all');
  const [showUncollectedOnly, setShowUncollectedOnly] = useState<boolean>(false);
  const [filterBaseCollectedStyles, setFilterBaseCollectedStyles] = useState<Set<string>>(new Set());
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBulkActionOpen, setIsBulkActionOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Use setTimeout to avoid "Calling setState synchronously within an effect" lint error
    // and to ensure we are not blocking the main thread.
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
    // Filter styles based on selectedField
    const targetStyles = selectedField === 'all'
      ? pokemon.styles
      : pokemon.styles.filter(s => s.locations.includes(selectedField));

    const targetStyleIds = targetStyles.map(s => s.id);

    // Optimistic UI update
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
      // Guest user: Save to localStorage
      saveToLocalStorage(newSet);
    }
  };

  const toggleGlobal = async (select: boolean) => {
    // Prepare updates
    const updates = filteredPokemon.map(p => {
      const targetStyles = selectedField === 'all'
        ? p.styles
        : p.styles.filter(s => s.locations.includes(selectedField));
      return {
        pokemonId: p.id,
        styleIds: targetStyles.map(s => s.id)
      };
    }).filter(u => u.styleIds.length > 0);

    // Optimistic UI update
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
        setCollectedStyles(collectedStyles); // Revert on error
        alert("一部の保存に失敗しました");
      }
    } else {
      saveToLocalStorage(newSet);
    }
  };

  // Filter Logic
  const filteredPokemon = MOCK_POKEMON.filter(p => {
    // Sleep type filter
    const matchesSleepType = selectedSleepType === 'all' || p.sleepType === selectedSleepType;
    if (!matchesSleepType) return false;

    // Field filter
    const hasStylesInField = selectedField === 'all' || p.styles.some(s => s.locations.includes(selectedField));
    const matchesField = hasStylesInField;

    if (!matchesField) return false;

    // Uncollected filter
    if (showUncollectedOnly) {
      const availableStyles = selectedField === 'all'
        ? p.styles
        : p.styles.filter(s => s.locations.includes(selectedField));
      const hasUncollected = availableStyles.some(s => !filterBaseCollectedStyles.has(s.id));
      return hasUncollected;
    }

    return true;
  });
  // Progress Calculation
  const calculateProgress = (pokemonList: Pokemon[]) => {
    const total = pokemonList.reduce((acc, p) => {
      const availableStyles = selectedField === 'all'
        ? p.styles
        : p.styles.filter(s => s.locations.includes(selectedField));
      return acc + availableStyles.length;
    }, 0);

    const collected = pokemonList.reduce((acc, p) => {
      const availableStyles = selectedField === 'all'
        ? p.styles
        : p.styles.filter(s => s.locations.includes(selectedField));
      return acc + availableStyles.filter(s => collectedStyles.has(s.id)).length;
    }, 0);

    return { total, collected, percentage: total === 0 ? 0 : Math.round((collected / total) * 100) };
  };

  const totalProgress = calculateProgress(filteredPokemon);
  const dozingProgress = calculateProgress(filteredPokemon.filter(p => p.sleepType === 'うとうと'));
  const snoozingProgress = calculateProgress(filteredPokemon.filter(p => p.sleepType === 'すやすや'));
  const slumberingProgress = calculateProgress(filteredPokemon.filter(p => p.sleepType === 'ぐっすり'));

  // Rarity Progress Calculation
  const calculateRarityProgress = (pokemonList: Pokemon[], rarity: number) => {
    const total = pokemonList.reduce((acc, p) => {
      const availableStyles = selectedField === 'all'
        ? p.styles
        : p.styles.filter(s => s.locations.includes(selectedField));
      return acc + availableStyles.filter(s => s.rarity === rarity).length;
    }, 0);

    const collected = pokemonList.reduce((acc, p) => {
      const availableStyles = selectedField === 'all'
        ? p.styles
        : p.styles.filter(s => s.locations.includes(selectedField));
      return acc + availableStyles.filter(s => s.rarity === rarity && collectedStyles.has(s.id)).length;
    }, 0);

    return { total, collected, percentage: total === 0 ? 0 : Math.round((collected / total) * 100) };
  };

  const rarity1Progress = calculateRarityProgress(filteredPokemon, 1);
  const rarity2Progress = calculateRarityProgress(filteredPokemon, 2);
  const rarity3Progress = calculateRarityProgress(filteredPokemon, 3);
  const rarity4Progress = calculateRarityProgress(filteredPokemon, 4);

  return (
    <main className="min-h-screen bg-gray-50 pb-20 lg:pl-80 transition-all duration-300">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-600 lg:hidden"
                  aria-label="Menu"
                >
                  {isMenuOpen ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="3" y1="12" x2="21" y2="12"></line>
                      <line x1="3" y1="6" x2="21" y2="6"></line>
                      <line x1="3" y1="18" x2="21" y2="18"></line>
                    </svg>
                  )}
                </button>
                <Image
                  src="/icon.png"
                  alt="ポケスリ寝顔チェッカー"
                  width={40}
                  height={40}
                  className="rounded-lg"
                />
                <h1 className="text-2xl font-bold text-gray-900">ポケスリ寝顔チェッカー</h1>
              </div>
              <AuthButton />
            </div>

            {/* Navigation Drawer Overlay */}
            {isMenuOpen && (
              <div
                className="fixed inset-0 bg-black/50 z-40 transition-opacity lg:hidden"
                onClick={() => setIsMenuOpen(false)}
              />
            )}

            {/* Navigation Drawer */}
            <div className={`fixed top-0 left-0 h-full w-80 bg-white z-50 shadow-lg transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:shadow-none lg:border-r lg:border-gray-200`}>
              <div className="p-4 flex flex-col gap-6 h-full overflow-y-auto">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-bold text-gray-900">フィルタ</h2>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-600 lg:hidden"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>

                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => setIsBulkActionOpen(!isBulkActionOpen)}
                    className="flex justify-between items-center w-full py-2 text-left group"
                  >
                    <h3 className="text-sm font-semibold text-gray-500 group-hover:text-gray-700 transition-colors">一括操作</h3>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`text-gray-400 transition-transform duration-200 ${isBulkActionOpen ? 'rotate-180' : ''}`}
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </button>

                  <div className={`grid transition-all duration-200 ease-in-out ${isBulkActionOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                    <div className="overflow-hidden">
                      <div className="flex gap-2 pt-2">
                        <button
                          onClick={() => toggleGlobal(true)}
                          className="flex-1 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                        >
                          表示中を全チェック
                        </button>
                        <button
                          onClick={() => toggleGlobal(false)}
                          className="flex-1 px-4 py-2 bg-white text-gray-700 text-sm font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors shadow-sm"
                        >
                          全解除
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <h3 className="text-sm font-semibold text-gray-500">フィールド</h3>
                  <div className="flex flex-wrap gap-2">
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
                          ? field === 'イベント限定'
                            ? 'bg-purple-600 text-white'
                            : 'bg-green-600 text-white'
                          : field === 'イベント限定'
                            ? 'bg-purple-50 text-purple-700 hover:bg-purple-100'
                            : 'bg-green-50 text-green-700 hover:bg-green-100'
                          }`}
                      >
                        {field}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <h3 className="text-sm font-semibold text-gray-500">睡眠タイプ</h3>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setSelectedSleepType('all')}
                      className={`px-3 py-1.5 rounded-full text-sm transition-colors ${selectedSleepType === 'all'
                        ? 'bg-gray-800 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                      全て
                    </button>
                    <button
                      onClick={() => setSelectedSleepType('うとうと')}
                      className={`px-3 py-1.5 rounded-full text-sm transition-colors ${selectedSleepType === 'うとうと'
                        ? 'bg-yellow-500 text-white'
                        : 'bg-yellow-50 text-yellow-800 hover:bg-yellow-100'
                        }`}
                    >
                      うとうと
                    </button>
                    <button
                      onClick={() => setSelectedSleepType('すやすや')}
                      className={`px-3 py-1.5 rounded-full text-sm transition-colors ${selectedSleepType === 'すやすや'
                        ? 'bg-blue-500 text-white'
                        : 'bg-blue-50 text-blue-800 hover:bg-blue-100'
                        }`}
                    >
                      すやすや
                    </button>
                    <button
                      onClick={() => setSelectedSleepType('ぐっすり')}
                      className={`px-3 py-1.5 rounded-full text-sm transition-colors ${selectedSleepType === 'ぐっすり'
                        ? 'bg-indigo-500 text-white'
                        : 'bg-indigo-50 text-indigo-800 hover:bg-indigo-100'
                        }`}
                    >
                      ぐっすり
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <h3 className="text-sm font-semibold text-gray-500">その他</h3>
                  <label className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm bg-orange-50 text-orange-700 hover:bg-orange-100 cursor-pointer transition-colors w-fit">
                    <input
                      type="checkbox"
                      checked={showUncollectedOnly}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        setShowUncollectedOnly(checked);
                        if (checked) {
                          setFilterBaseCollectedStyles(new Set(collectedStyles));
                        } else {
                          setFilterBaseCollectedStyles(new Set());
                        }
                      }}
                      className="w-4 h-4 text-orange-600 bg-white border-orange-300 rounded focus:ring-orange-500 focus:ring-2 cursor-pointer"
                    />
                    <span>未収集のみ</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Progress Bars */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs sm:text-sm">
              <div className="bg-gray-50 p-2 rounded border border-gray-100">
                <div className="font-bold text-gray-700 mb-1">全体</div>
                <div className="flex justify-between mb-1 text-gray-900">
                  <span>{totalProgress.percentage}%</span>
                  <span>{totalProgress.collected}/{totalProgress.total}</span>
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

            {/* Rarity Progress (Compact) */}
            <div className="mt-2 grid grid-cols-4 gap-1 text-xs sm:text-sm bg-gray-50 p-2 rounded border border-gray-100">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-2">
                <span className="font-bold text-gray-500">★1</span>
                <div className="flex items-baseline gap-1">
                  <span className="font-medium text-gray-900">{rarity1Progress.percentage}%</span>
                  <span className="hidden sm:inline text-gray-900 text-xs">({rarity1Progress.collected}/{rarity1Progress.total})</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-2 border-l border-gray-200">
                <span className="font-bold text-emerald-600">★2</span>
                <div className="flex items-baseline gap-1">
                  <span className="font-medium text-gray-900">{rarity2Progress.percentage}%</span>
                  <span className="hidden sm:inline text-gray-900 text-xs">({rarity2Progress.collected}/{rarity2Progress.total})</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-2 border-l border-gray-200">
                <span className="font-bold text-pink-600">★3</span>
                <div className="flex items-baseline gap-1">
                  <span className="font-medium text-gray-900">{rarity3Progress.percentage}%</span>
                  <span className="hidden sm:inline text-gray-900 text-xs">({rarity3Progress.collected}/{rarity3Progress.total})</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-2 border-l border-gray-200">
                <span className="font-bold text-amber-600">★4</span>
                <div className="flex items-baseline gap-1">
                  <span className="font-medium text-gray-900">{rarity4Progress.percentage}%</span>
                  <span className="hidden sm:inline text-gray-900 text-xs">({rarity4Progress.collected}/{rarity4Progress.total})</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredPokemon.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
              collectedStyles={collectedStyles}
              onToggleStyle={toggleStyle}
              onToggleAll={toggleAllPokemonStyles}
              selectedField={selectedField}
              showUncollectedOnly={showUncollectedOnly}
              filterBaseCollectedStyles={filterBaseCollectedStyles}
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
