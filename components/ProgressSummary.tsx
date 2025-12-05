'use client';

import { memo } from 'react';

type ProgressData = {
  total: number;
  collected: number;
  percentage: string;
};

type Props = {
  totalProgress: ProgressData;
  dozingProgress: ProgressData;
  snoozingProgress: ProgressData;
  slumberingProgress: ProgressData;
  rarity1Progress: ProgressData;
  rarity2Progress: ProgressData;
  rarity3Progress: ProgressData;
  rarity4Progress: ProgressData;
  selectedSleepType: string;
  setSelectedSleepType: (type: 'all' | 'うとうと' | 'すやすや' | 'ぐっすり') => void;
  selectedRarity: string;
  setSelectedRarity: (rarity: string) => void;
};

function ProgressSummary({
  totalProgress,
  dozingProgress,
  snoozingProgress,
  slumberingProgress,
  rarity1Progress,
  rarity2Progress,
  rarity3Progress,
  rarity4Progress,
  selectedSleepType,
  setSelectedSleepType,
  selectedRarity,
  setSelectedRarity
}: Props) {
  const getSleepTypeInfo = (type: string, current: string) => {
    const isSelected = type === current;
    switch (type) {
      case 'all': return isSelected ? 'bg-gray-200 ring-2 ring-gray-400' : 'hover:bg-gray-100';
      case 'うとうと': return isSelected ? 'bg-yellow-100 ring-2 ring-yellow-400' : 'hover:bg-yellow-50';
      case 'すやすや': return isSelected ? 'bg-blue-100 ring-2 ring-blue-400' : 'hover:bg-blue-50';
      case 'ぐっすり': return isSelected ? 'bg-indigo-100 ring-2 ring-indigo-400' : 'hover:bg-indigo-50';
      default: return '';
    }
  };

  const getRarityInfo = (rarity: string, current: string) => {
    const isSelected = rarity === current;
    switch (rarity) {
      case '1': return isSelected ? 'bg-gray-200 ring-2 ring-gray-400' : 'hover:bg-gray-100';
      case '2': return isSelected ? 'bg-emerald-100 ring-2 ring-emerald-400' : 'hover:bg-emerald-50';
      case '3': return isSelected ? 'bg-pink-100 ring-2 ring-pink-400' : 'hover:bg-pink-50';
      case '4': return isSelected ? 'bg-amber-100 ring-2 ring-amber-400' : 'hover:bg-amber-50';
      default: return '';
    }
  };

  return (
    <div className="space-y-0">
      {/* 睡眠タイプ別進捗 */}
      <div className="grid grid-cols-4 gap-1 text-xs sm:text-lg bg-gray-50 p-2 rounded-t border border-gray-100">
        <button
          onClick={() => setSelectedSleepType('all')}
          className={`flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-2 rounded p-1 transition-all ${getSleepTypeInfo('all', selectedSleepType)}`}
        >
          <span className="font-bold text-gray-700">全体</span>
          <div className="flex items-baseline gap-1">
            <span className="font-medium text-gray-900">{totalProgress.percentage}%</span>
            <span className="text-gray-900 text-xs">({totalProgress.collected}/{totalProgress.total})</span>
          </div>
        </button>
        <button
          onClick={() => setSelectedSleepType(selectedSleepType === 'うとうと' ? 'all' : 'うとうと')}
          className={`flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-2 border-l border-gray-200 rounded p-1 transition-all ${getSleepTypeInfo('うとうと', selectedSleepType)}`}
        >
          <span className="font-bold text-yellow-600">うとうと</span>
          <div className="flex items-baseline gap-1">
            <span className="font-medium text-gray-900">{dozingProgress.percentage}%</span>
            <span className="text-gray-900 text-xs">({dozingProgress.collected}/{dozingProgress.total})</span>
          </div>
        </button>
        <button
          onClick={() => setSelectedSleepType(selectedSleepType === 'すやすや' ? 'all' : 'すやすや')}
          className={`flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-2 border-l border-gray-200 rounded p-1 transition-all ${getSleepTypeInfo('すやすや', selectedSleepType)}`}
        >
          <span className="font-bold text-blue-600">すやすや</span>
          <div className="flex items-baseline gap-1">
            <span className="font-medium text-gray-900">{snoozingProgress.percentage}%</span>
            <span className="text-gray-900 text-xs">({snoozingProgress.collected}/{snoozingProgress.total})</span>
          </div>
        </button>
        <button
          onClick={() => setSelectedSleepType(selectedSleepType === 'ぐっすり' ? 'all' : 'ぐっすり')}
          className={`flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-2 border-l border-gray-200 rounded p-1 transition-all ${getSleepTypeInfo('ぐっすり', selectedSleepType)}`}
        >
          <span className="font-bold text-indigo-600">ぐっすり</span>
          <div className="flex items-baseline gap-1">
            <span className="font-medium text-gray-900">{slumberingProgress.percentage}%</span>
            <span className="text-gray-900 text-xs">({slumberingProgress.collected}/{slumberingProgress.total})</span>
          </div>
        </button>
      </div>

      {/* レアリティ別進捗 */}
      <div className="grid grid-cols-4 gap-1 text-xs sm:text-lg bg-gray-50 p-2 rounded-b border-t-0 border border-gray-100">
        <button
          onClick={() => setSelectedRarity(selectedRarity === '1' ? 'all' : '1')}
          className={`flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-2 rounded p-1 transition-all ${getRarityInfo('1', selectedRarity)}`}
        >
          <span className="font-bold text-gray-500">★1</span>
          <div className="flex items-baseline gap-1">
            <span className="font-medium text-gray-900">{rarity1Progress.percentage}%</span>
            <span className="text-gray-900 text-xs">({rarity1Progress.collected}/{rarity1Progress.total})</span>
          </div>
        </button>
        <button
          onClick={() => setSelectedRarity(selectedRarity === '2' ? 'all' : '2')}
          className={`flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-2 border-l border-gray-200 rounded p-1 transition-all ${getRarityInfo('2', selectedRarity)}`}
        >
          <span className="font-bold text-emerald-600">★2</span>
          <div className="flex items-baseline gap-1">
            <span className="font-medium text-gray-900">{rarity2Progress.percentage}%</span>
            <span className="text-gray-900 text-xs">({rarity2Progress.collected}/{rarity2Progress.total})</span>
          </div>
        </button>
        <button
          onClick={() => setSelectedRarity(selectedRarity === '3' ? 'all' : '3')}
          className={`flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-2 border-l border-gray-200 rounded p-1 transition-all ${getRarityInfo('3', selectedRarity)}`}
        >
          <span className="font-bold text-pink-600">★3</span>
          <div className="flex items-baseline gap-1">
            <span className="font-medium text-gray-900">{rarity3Progress.percentage}%</span>
            <span className="text-gray-900 text-xs">({rarity3Progress.collected}/{rarity3Progress.total})</span>
          </div>
        </button>
        <button
          onClick={() => setSelectedRarity(selectedRarity === '4' ? 'all' : '4')}
          className={`flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-2 border-l border-gray-200 rounded p-1 transition-all ${getRarityInfo('4', selectedRarity)}`}
        >
          <span className="font-bold text-amber-600">★4</span>
          <div className="flex items-baseline gap-1">
            <span className="font-medium text-gray-900">{rarity4Progress.percentage}%</span>
            <span className="text-gray-900 text-xs">({rarity4Progress.collected}/{rarity4Progress.total})</span>
          </div>
        </button>
      </div>
    </div>
  );
}

// メモ化: 進捗データが変わった時のみ再レンダリング
export default memo(ProgressSummary);
