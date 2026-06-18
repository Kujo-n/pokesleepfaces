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
