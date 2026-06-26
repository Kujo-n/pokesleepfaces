/** 寝顔スタイルのレアリティに関する単一情報源 */

/** レアリティ最小値 */
export const MIN_RARITY = 1;

/** レアリティ最大値（現状は★5まで存在） */
export const MAX_RARITY = 5;

/** 反復用レアリティリスト [1, 2, 3, 4, 5] */
export const RARITY_LEVELS: number[] = Array.from(
  { length: MAX_RARITY - MIN_RARITY + 1 },
  (_, i) => MIN_RARITY + i,
);

/**
 * グリッド表示の列定義（ヘッダー・行で共通）。
 * 先頭はポケモン名列で、最小 6.5rem（text-sm の全角6文字 + セル余白）を確保し、
 * 6文字までは省略せず表示する。以降はレアリティ列。
 */
export const GRID_TEMPLATE_COLUMNS = `minmax(6.5rem, auto) repeat(${RARITY_LEVELS.length}, minmax(32px, 60px))`;
