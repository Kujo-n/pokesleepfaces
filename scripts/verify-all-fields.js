/**
 * データ整合性チェックスクリプト
 * 
 * 用途:
 * - Google Sheetsからデータ更新後の検証
 * - フィルタリングロジック変更後のリグレッションテスト
 * - フィールド別寝顔数のドキュメント生成
 * 
 * 実行方法:
 *   node scripts/verify-all-fields.js
 * 
 * 出力形式: Markdown Table
 */

const { MOCK_POKEMON, FIELD_NAMES } = require('../data/mockData.ts');

console.log('\n=== 全フィールド × 睡眠タイプ別 寝顔数 ===\n');

const sleepTypes = ['うとうと', 'すやすや', 'ぐっすり'];

// マークダウンテーブルのヘッダー
console.log('| フィールド | うとうと | すやすや | ぐっすり |');
console.log('|-----------|---------|---------|---------|');

// 全体の寝顔数を計算
const totalCounts = sleepTypes.map(sleepType => {
    const targetPokemon = MOCK_POKEMON.filter(p => p.sleepType === sleepType);
    return targetPokemon.reduce((total, p) => total + p.styles.length, 0);
});
console.log(`| **全体** | ${totalCounts[0]} | ${totalCounts[1]} | ${totalCounts[2]} |`);

// イベント限定の寝顔数を計算
const eventField = 'イベント限定';
const eventCounts = sleepTypes.map(sleepType => {
    const targetPokemon = MOCK_POKEMON.filter(p =>
        p.fields.includes(eventField) && p.sleepType === sleepType
    );
    return targetPokemon.reduce((total, p) => {
        const availableStyles = p.styles.filter(s =>
            !s.excludeFromFields || !s.excludeFromFields.includes(eventField)
        );
        return total + availableStyles.length;
    }, 0);
});
console.log(`| イベント限定 | ${eventCounts[0]} | ${eventCounts[1]} | ${eventCounts[2]} |`);

// 通常フィールド（イベント限定を除外）
const fields = FIELD_NAMES.filter(f => f !== 'イベント限定');

fields.forEach(field => {
    const counts = sleepTypes.map(sleepType => {
        const targetPokemon = MOCK_POKEMON.filter(p =>
            p.fields.includes(field) && p.sleepType === sleepType
        );

        return targetPokemon.reduce((total, p) => {
            const availableStyles = p.styles.filter(s =>
                !s.excludeFromFields || !s.excludeFromFields.includes(field)
            );
            return total + availableStyles.length;
        }, 0);
    });

    console.log(`| ${field} | ${counts[0]} | ${counts[1]} | ${counts[2]} |`);
});

console.log('\n✅ データ整合性チェック完了\n');
