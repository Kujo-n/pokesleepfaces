'use client';

import { useState } from 'react';
import Image from 'next/image';
import PokemonCard from '@/components/PokemonCard';
import DataProtectionWarning from '@/components/DataProtectionWarning';
import HelpModal from '@/components/HelpModal';
import FilterPanel from '@/components/FilterPanel';
import ProgressSummary from '@/components/ProgressSummary';
import { useSwipeable } from 'react-swipeable';
import { useAuth } from '@/hooks/useAuth';
import { useCollection } from '@/hooks/useCollection';
import { useFilters } from '@/hooks/useFilters';
import { useProgress } from '@/hooks/useProgress';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBulkActionOpen, setIsBulkActionOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  // カスタムフック利用
  const { user } = useAuth();
  const { collectedStyles, toggleStyle, toggleAllPokemonStyles, toggleGlobal, isSyncing } = useCollection(user);
  const {
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
  } = useFilters(user, collectedStyles);

  const progressData = useProgress(
    filteredPokemon,
    collectedStyles,
    selectedField,
    selectedRarity,
    showUncollectedOnly,
    filterBaseCollectedStyles
  );

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => setIsMenuOpen(false),
    trackMouse: true
  });

  return (
    <main className="min-h-screen bg-gray-50 pb-20 lg:pl-80 transition-all duration-300">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col gap-4">
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
                width={30}
                height={30}
                className="rounded-lg"
              />
              <h1 className="text-xl font-bold text-gray-900">ポケスリ寝顔チェッカー</h1>
            </div>

            {/* Navigation Drawer Overlay */}
            {isMenuOpen && (
              <div
                className="fixed inset-0 bg-black/50 z-40 transition-opacity lg:hidden"
                onClick={() => setIsMenuOpen(false)}
              />
            )}

            {/* Navigation Drawer */}
            <div {...swipeHandlers} className={`fixed top-0 left-0 h-full w-80 bg-white z-50 shadow-lg transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:shadow-none lg:border-r lg:border-gray-200`}>
              <FilterPanel
                selectedField={selectedField}
                setSelectedField={setSelectedField}
                selectedSleepType={selectedSleepType}
                setSelectedSleepType={setSelectedSleepType}
                selectedRarity={selectedRarity}
                setSelectedRarity={setSelectedRarity}
                showUncollectedOnly={showUncollectedOnly}
                setShowUncollectedOnly={setShowUncollectedOnly}
                collectedStyles={collectedStyles}
                setFilterBaseCollectedStyles={setFilterBaseCollectedStyles}
                updateFilterPreferences={updateFilterPreferences}
                isBulkActionOpen={isBulkActionOpen}
                setIsBulkActionOpen={setIsBulkActionOpen}
                toggleGlobal={(select) => toggleGlobal(filteredPokemon, select, selectedField)}
                setIsMenuOpen={setIsMenuOpen}
                setIsHelpOpen={setIsHelpOpen}
              />
            </div>

            {/* Progress Summary */}
            <ProgressSummary
              {...progressData}
              selectedSleepType={selectedSleepType}
              setSelectedSleepType={setSelectedSleepType}
              selectedRarity={selectedRarity}
              setSelectedRarity={setSelectedRarity}
            />
          </div>
        </div>
      </header>

      <DataProtectionWarning />

      {/* 同期中オーバーレイ */}
      {isSyncing && (
        <div className="fixed inset-0 bg-white/80 z-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
            <p className="text-gray-700 font-medium">データを同期中...</p>
            <p className="text-gray-500 text-sm mt-1">しばらくお待ちください</p>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredPokemon.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
              collectedStyles={collectedStyles}
              onToggleStyle={toggleStyle}
              onToggleAll={(p, select) => toggleAllPokemonStyles(p, select, selectedField)}
              selectedField={selectedField}
              selectedRarity={selectedRarity}
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

      <HelpModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
    </main>
  );
}
