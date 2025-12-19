import { memo } from 'react';

type ProgressData = {
    total: number;
    collected: number;
    percentage: number;
};

type Props = {
    label: string; // "全体" or Field Name
    totalProgress: ProgressData;
    dozingProgress: ProgressData;
    snoozingProgress: ProgressData;
    slumberingProgress: ProgressData;
    rarity1Progress: ProgressData;
    rarity2Progress: ProgressData;
    rarity3Progress: ProgressData;
    rarity4Progress: ProgressData;
};

// Helper component for individual stat block
// Added className prop for custom styles (borders etc)
const StatBlock = ({ label, progress, colorClass, bgColorClass = "", className = "" }: { label: string, progress: ProgressData, colorClass: string, bgColorClass?: string, className?: string }) => (
    <div className={`flex flex-col items-center justify-center gap-0.5 p-1 ${bgColorClass} ${className} h-full`}>
        <span className={`font-bold text-[10px] text-center leading-tight ${colorClass}`}>{label}</span>
        <div className="flex flex-col items-center leading-none">
            <span className="font-bold text-gray-900 text-xs">{progress.percentage}%</span>
            <span className="text-gray-900 text-[9px] transform scale-0.9 whitespace-nowrap">
                ({progress.collected}/{progress.total})
            </span>
        </div>
    </div>
);

function CollectionStatusItem({
    label,
    totalProgress,
    dozingProgress,
    snoozingProgress,
    slumberingProgress,
    rarity1Progress, // Unused
    rarity2Progress, // Unused
    rarity3Progress,
    rarity4Progress,
}: Props) {
    return (
        <div className="w-full mb-2 last:mb-0">
            {/* 
                Single Row: 6 Columns
                Removed divide-x to manage borders manually for custom thickness
            */}
            <div className="grid grid-cols-6 gap-0 bg-white rounded border border-gray-300 overflow-hidden items-stretch shadow-sm">

                {/* 1. Field Name & Overall (Distinct Background) */}
                <StatBlock
                    label={label}
                    progress={totalProgress}
                    colorClass="text-gray-900"
                    bgColorClass="bg-slate-200"
                    className="border-r border-gray-300"
                />

                {/* 2. Dozing */}
                <StatBlock
                    label="うとうと"
                    progress={dozingProgress}
                    colorClass="text-gray-800"
                    bgColorClass="bg-yellow-100" // 薄黄色
                    className="border-r border-gray-200"
                />

                {/* 3. Snoozing */}
                <StatBlock
                    label="すやすや"
                    progress={snoozingProgress}
                    colorClass="text-gray-800"
                    bgColorClass="bg-sky-100" // 水色
                    className="border-r border-gray-200"
                />

                {/* 4. Slumbering (Prominent Border Right) */}
                <StatBlock
                    label="ぐっすり"
                    progress={slumberingProgress}
                    colorClass="text-gray-800"
                    bgColorClass="bg-indigo-200" // 濃い青（背景として文字が見える範囲で濃いめ）
                    // Double thickness border for separation
                    className="border-r-2 border-gray-400"
                />

                {/* 5. Rarity 3 */}
                <StatBlock
                    label="★3"
                    progress={rarity3Progress}
                    colorClass="text-pink-600"
                    className="border-r border-gray-200"
                />

                {/* 6. Rarity 4 (No right border) */}
                <StatBlock
                    label="★4"
                    progress={rarity4Progress}
                    colorClass="text-amber-600"
                />
            </div>
        </div>
    );
}

export default memo(CollectionStatusItem);
