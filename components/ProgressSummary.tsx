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
};

function ProgressSummary({
  totalProgress,
  dozingProgress,
  snoozingProgress,
  slumberingProgress,
  rarity1Progress,
  rarity2Progress,
  rarity3Progress,
  rarity4Progress
}: Props) {
  return (
    <div className="space-y-0">
      {/* 睡眠タイプ別進捗 */}
      <div className="grid grid-cols-4 gap-1 text-xs sm:text-lg bg-gray-50 p-2 rounded-t border border-gray-100">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-2">
          <span className="font-bold text-gray-700">全体</span>
          <div className="flex items-baseline gap-1">
            <span className="font-medium text-gray-900">{totalProgress.percentage}%</span>
            <span className="text-gray-900 text-xs">({totalProgress.collected}/{totalProgress.total})</span>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-2 border-l border-gray-200">
          <span className="font-bold text-yellow-600">うとうと</span>
          <div className="flex items-baseline gap-1">
            <span className="font-medium text-gray-900">{dozingProgress.percentage}%</span>
            <span className="text-gray-900 text-xs">({dozingProgress.collected}/{dozingProgress.total})</span>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-2 border-l border-gray-200">
          <span className="font-bold text-blue-600">すやすや</span>
          <div className="flex items-baseline gap-1">
            <span className="font-medium text-gray-900">{snoozingProgress.percentage}%</span>
            <span className="text-gray-900 text-xs">({snoozingProgress.collected}/{snoozingProgress.total})</span>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-2 border-l border-gray-200">
          <span className="font-bold text-indigo-600">ぐっすり</span>
          <div className="flex items-baseline gap-1">
            <span className="font-medium text-gray-900">{slumberingProgress.percentage}%</span>
            <span className="text-gray-900 text-xs">({slumberingProgress.collected}/{slumberingProgress.total})</span>
          </div>
        </div>
      </div>

      {/* レアリティ別進捗 */}
      <div className="grid grid-cols-4 gap-1 text-xs sm:text-lg bg-gray-50 p-2 rounded-b border-t-0 border border-gray-100">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-2">
          <span className="font-bold text-gray-500">★1</span>
          <div className="flex items-baseline gap-1">
            <span className="font-medium text-gray-900">{rarity1Progress.percentage}%</span>
            <span className="text-gray-900 text-xs">({rarity1Progress.collected}/{rarity1Progress.total})</span>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-2 border-l border-gray-200">
          <span className="font-bold text-emerald-600">★2</span>
          <div className="flex items-baseline gap-1">
            <span className="font-medium text-gray-900">{rarity2Progress.percentage}%</span>
            <span className="text-gray-900 text-xs">({rarity2Progress.collected}/{rarity2Progress.total})</span>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-2 border-l border-gray-200">
          <span className="font-bold text-pink-600">★3</span>
          <div className="flex items-baseline gap-1">
            <span className="font-medium text-gray-900">{rarity3Progress.percentage}%</span>
            <span className="text-gray-900 text-xs">({rarity3Progress.collected}/{rarity3Progress.total})</span>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-2 border-l border-gray-200">
          <span className="font-bold text-amber-600">★4</span>
          <div className="flex items-baseline gap-1">
            <span className="font-medium text-gray-900">{rarity4Progress.percentage}%</span>
            <span className="text-gray-900 text-xs">({rarity4Progress.collected}/{rarity4Progress.total})</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// メモ化: 進捗データが変わった時のみ再レンダリング
export default memo(ProgressSummary);
