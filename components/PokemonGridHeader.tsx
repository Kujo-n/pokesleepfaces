'use client';

import { memo } from 'react';

function PokemonGridHeader() {
    return (
        <div className="grid grid-cols-[auto_repeat(4,minmax(32px,60px))] gap-0 bg-gray-100 border-b-2 border-gray-300">
            {/* ポケモン名ヘッダー */}
            <div className="p-2 font-bold text-sm text-gray-700 border-r border-gray-200">
                ポケモン
            </div>

            {/* レアリティヘッダー */}
            {[1, 2, 3, 4].map((rarity) => (
                <div
                    key={rarity}
                    className="p-2 text-center font-bold text-sm text-gray-700 border-r border-gray-200 last:border-r-0"
                >
                    <span className="text-yellow-500">★</span>{rarity}
                </div>
            ))}
        </div>
    );
}

export default memo(PokemonGridHeader);

