'use client';

import { FIELD_NAMES } from '@/data/mockData';

type Props = {
  selectedField: string;
  setSelectedField: (field: string) => void;
  selectedSleepType: 'all' | 'うとうと' | 'すやすや' | 'ぐっすり';
  setSelectedSleepType: (type: 'all' | 'うとうと' | 'すやすや' | 'ぐっすり') => void;
  selectedRarity: string;
  setSelectedRarity: (rarity: string) => void;
  showUncollectedOnly: boolean;
  setShowUncollectedOnly: (show: boolean) => void;
  collectedStyles: Set<string>;
  setFilterBaseCollectedStyles: (styles: Set<string>) => void;
  updateFilterPreferences: (updates: { field?: string; sleepType?: string; rarity?: string; uncollectedOnly?: boolean }) => void;
  isBulkActionOpen: boolean;
  setIsBulkActionOpen: (open: boolean) => void;
  toggleGlobal: (select: boolean) => void;
  setIsMenuOpen: (open: boolean) => void;
  setIsHelpOpen: (open: boolean) => void;
};

export default function FilterPanel({
  selectedField,
  setSelectedField,
  selectedSleepType,
  setSelectedSleepType,
  selectedRarity,
  setSelectedRarity,
  showUncollectedOnly,
  setShowUncollectedOnly,
  collectedStyles,
  setFilterBaseCollectedStyles,
  updateFilterPreferences,
  isBulkActionOpen,
  setIsBulkActionOpen,
  toggleGlobal,
  setIsMenuOpen,
  setIsHelpOpen
}: Props) {
  return (
    <div className="p-4 flex flex-col gap-6 h-full overflow-y-auto">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setIsMenuOpen(false)}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-600 lg:hidden"
          aria-label="閉じる"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        </button>
        <h2 className="text-lg font-bold text-gray-900">フィルタ</h2>
      </div>

      {/* 一括操作 */}
      <div className="flex flex-col gap-2">
        <button
          onClick={() => setIsBulkActionOpen(!isBulkActionOpen)}
          className="flex justify-between items-center w-full py-2 text-left group"
          aria-expanded={isBulkActionOpen}
          aria-label="一括操作メニュー"
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
                aria-label="表示中のすべての寝顔をチェック"
              >
                表示中を全チェック
              </button>
              <button
                onClick={() => toggleGlobal(false)}
                className="flex-1 px-4 py-2 bg-white text-gray-700 text-sm font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors shadow-sm"
                aria-label="表示中のすべての寝顔のチェックを解除"
              >
                全解除
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* フィールドフィルタ */}
      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-semibold text-gray-500">フィールド</h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => {
              setSelectedField('all');
              updateFilterPreferences({ field: 'all' });
            }}
            className={`px-3 py-1.5 rounded-full text-sm transition-colors ${selectedField === 'all'
              ? 'bg-gray-800 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            aria-pressed={selectedField === 'all'}
            aria-label="すべてのフィールドを表示"
          >
            全て
          </button>
          {FIELD_NAMES.map(field => (
            <button
              key={field}
              onClick={() => {
                setSelectedField(field);
                updateFilterPreferences({ field });
              }}
              className={`px-3 py-1.5 rounded-full text-sm transition-colors ${selectedField === field
                ? field === 'イベント限定'
                  ? 'bg-purple-600 text-white'
                  : 'bg-green-600 text-white'
                : field === 'イベント限定'
                  ? 'bg-purple-50 text-purple-700 hover:bg-purple-100'
                  : 'bg-green-50 text-green-700 hover:bg-green-100'
                }`}
              aria-pressed={selectedField === field}
              aria-label={`${field}のみ表示`}
            >
              {field}
            </button>
          ))}
        </div>
      </div>

      {/* 睡眠タイプフィルタ */}
      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-semibold text-gray-500">睡眠タイプ</h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => {
              setSelectedSleepType('all');
              updateFilterPreferences({ sleepType: 'all' });
            }}
            className={`px-3 py-1.5 rounded-full text-sm transition-colors ${selectedSleepType === 'all'
              ? 'bg-gray-800 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            aria-pressed={selectedSleepType === 'all'}
            aria-label="すべての睡眠タイプを表示"
          >
            全て
          </button>
          <button
            onClick={() => {
              setSelectedSleepType('うとうと');
              updateFilterPreferences({ sleepType: 'うとうと' });
            }}
            className={`px-3 py-1.5 rounded-full text-sm transition-colors ${selectedSleepType === 'うとうと'
              ? 'bg-yellow-500 text-white'
              : 'bg-yellow-50 text-yellow-800 hover:bg-yellow-100'
              }`}
            aria-pressed={selectedSleepType === 'うとうと'}
            aria-label="うとうとを表示"
          >
            うとうと
          </button>
          <button
            onClick={() => {
              setSelectedSleepType('すやすや');
              updateFilterPreferences({ sleepType: 'すやすや' });
            }}
            className={`px-3 py-1.5 rounded-full text-sm transition-colors ${selectedSleepType === 'すやすや'
              ? 'bg-blue-500 text-white'
              : 'bg-blue-50 text-blue-800 hover:bg-blue-100'
              }`}
            aria-pressed={selectedSleepType === 'すやすや'}
            aria-label="すやすやを表示"
          >
            すやすや
          </button>
          <button
            onClick={() => {
              setSelectedSleepType('ぐっすり');
              updateFilterPreferences({ sleepType: 'ぐっすり' });
            }}
            className={`px-3 py-1.5 rounded-full text-sm transition-colors ${selectedSleepType === 'ぐっすり'
              ? 'bg-indigo-500 text-white'
              : 'bg-indigo-50 text-indigo-800 hover:bg-indigo-100'
              }`}
            aria-pressed={selectedSleepType === 'ぐっすり'}
            aria-label="ぐっすりを表示"
          >
            ぐっすり
          </button>
        </div>
      </div>

      {/* レアリティフィルタ */}
      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-semibold text-gray-500">レアリティ</h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => {
              setSelectedRarity('all');
              updateFilterPreferences({ rarity: 'all' });
            }}
            className={`px-3 py-1.5 rounded-full text-sm transition-colors ${selectedRarity === 'all'
              ? 'bg-gray-800 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            aria-pressed={selectedRarity === 'all'}
            aria-label="すべてのレアリティを表示"
          >
            全て
          </button>
          {['1', '2', '3', '4'].map((rarity) => (
            <button
              key={rarity}
              onClick={() => {
                setSelectedRarity(rarity);
                updateFilterPreferences({ rarity });
              }}
              className={`px-3 py-1.5 rounded-full text-sm transition-colors ${selectedRarity === rarity
                ? 'bg-amber-500 text-white'
                : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
                }`}
              aria-pressed={selectedRarity === rarity}
              aria-label={`★${rarity}を表示`}
            >
              ★{rarity}
            </button>
          ))}
        </div>
      </div>

      {/* その他フィルタ */}
      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-semibold text-gray-500">その他</h3>
        <label
          className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm bg-orange-50 text-orange-700 hover:bg-orange-100 cursor-pointer transition-colors w-fit"
          htmlFor="uncollected-only-filter"
        >
          <input
            id="uncollected-only-filter"
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
              updateFilterPreferences({ uncollectedOnly: checked });
            }}
            className="w-4 h-4 text-orange-600 bg-white border-orange-300 rounded focus:ring-orange-500 focus:ring-2 cursor-pointer"
            aria-describedby="uncollected-filter-description"
          />
          <span id="uncollected-filter-description">未収集のみ</span>
        </label>
      </div>

      {/* ヘルプボタン */}
      <div className="mt-auto flex flex-col gap-3">
        {/* Note記事リンク */}
        {process.env.NEXT_PUBLIC_NOTE_ARTICLE_URL && (
          <a
            href={process.env.NEXT_PUBLIC_NOTE_ARTICLE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-3 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="使い方の記事をNoteで見る"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
            </svg>
            <span className="font-medium">使い方の記事 (Note)</span>
          </a>
        )}

        {/* ヘルプボタン */}
        <button
          onClick={() => {
            setIsMenuOpen(false);
            setIsHelpOpen(true);
          }}
          className="flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
          aria-label="ヘルプとよくある質問を表示"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
          <span className="font-medium">ヘルプ・よくある質問</span>
        </button>
      </div>
    </div>
  );
}
