/**
 * Firestore初期データ投入スクリプト
 * 
 * 現行の mockData.ts のデータを Firestore にマイグレーションする。
 * 一度だけ実行する移行用スクリプト。
 * 
 * 使い方:
 *   node scripts/seed-firestore.js
 * 
 * 環境変数:
 *   GOOGLE_APPLICATION_CREDENTIALS: Firebase Admin SDKのサービスアカウントキーパス
 *   FIRESTORE_ENV: 'production' | 'staging' (デフォルト: 'production')
 */

const fs = require('fs');
const path = require('path');

// mockData.ts から MOCK_POKEMON と FIELD_NAMES を抽出する
// TypeScriptファイルなので直接requireできないため、正規表現でパースする
function parseMockData() {
    const filePath = path.join(__dirname, '../data/mockData.ts');
    const content = fs.readFileSync(filePath, 'utf-8');

    // FIELD_NAMES を抽出
    const fieldNamesMatch = content.match(/export const FIELD_NAMES = (\[[\s\S]*?\]);/);
    if (!fieldNamesMatch) {
        throw new Error('FIELD_NAMES が見つかりません');
    }
    const fieldNames = JSON.parse(fieldNamesMatch[1]);

    // MOCK_POKEMON を抽出
    const pokemonMatch = content.match(/export const MOCK_POKEMON: Pokemon\[\] = (\[[\s\S]*\]);/);
    if (!pokemonMatch) {
        throw new Error('MOCK_POKEMON が見つかりません');
    }
    const pokemonData = JSON.parse(pokemonMatch[1]);

    return { fieldNames, pokemonData };
}

async function main() {
    console.log('🚀 Firestore初期データ投入を開始します...\n');

    // Firebase Admin SDK を動的にロード
    let admin;
    try {
        admin = require('firebase-admin');
    } catch {
        console.error('❌ firebase-admin がインストールされていません。');
        console.error('   npm install --save-dev firebase-admin を実行してください。');
        process.exit(1);
    }

    // .env ファイルの読み込み
    try {
        require('dotenv').config({ path: path.join(__dirname, '../.env') });
    } catch (e) {
        console.warn('⚠️ dotenvの読み込みをスキップします（インストールされていない可能性があります）');
    }

    // Firebase Admin 初期化
    if (!admin.apps.length) {
        // GOOGLE_APPLICATION_CREDENTIALS 環境変数があればそれを使用、なければデフォルト
        const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
        
        if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
            const serviceAccount = require(process.env.GOOGLE_APPLICATION_CREDENTIALS);
            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount),
                projectId: projectId
            });
        } else {
            // Firebase CLI でログイン済みの場合はデフォルト認証を使用
            // プロジェクトIDを指定しないとエラーになるため設定
            admin.initializeApp({
                projectId: projectId || 'sleepingfaceschecker'
            });
        }
    }

    const db = admin.firestore();
    const env = process.env.FIRESTORE_ENV || 'production';
    const masterCollection = env === 'staging' ? 'master_staging' : 'master';

    console.log(`📦 環境: ${env}`);
    console.log(`📁 コレクション: ${masterCollection}\n`);

    // mockData.ts からデータを読み込み
    console.log('📖 mockData.ts を読み込み中...');
    const { fieldNames, pokemonData } = parseMockData();
    console.log(`   フィールド: ${fieldNames.length} 件`);
    console.log(`   ポケモン: ${pokemonData.length} 匹\n`);

    // 1. フィールド名を保存
    console.log('💾 フィールド名を保存中...');
    await db.collection(masterCollection).doc('fields').set({
        names: fieldNames,
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
    console.log('   ✅ フィールド名を保存しました\n');

    // 2. ポケモンデータを保存（バッチ書き込み）
    console.log('💾 ポケモンデータを保存中...');
    const BATCH_SIZE = 500; // Firestoreのバッチ上限
    let batchCount = 0;

    for (let i = 0; i < pokemonData.length; i += BATCH_SIZE) {
        const batch = db.batch();
        const chunk = pokemonData.slice(i, i + BATCH_SIZE);

        chunk.forEach((pokemon) => {
            const docRef = db.collection(masterCollection)
                .doc('pokemon')
                .collection('entries')
                .doc(pokemon.id);

            batch.set(docRef, {
                ...pokemon,
                updatedAt: admin.firestore.FieldValue.serverTimestamp()
            });
        });

        await batch.commit();
        batchCount++;
        console.log(`   バッチ ${batchCount}: ${chunk.length} 件を保存`);
    }

    console.log(`\n✅ 初期データ投入が完了しました！`);
    console.log(`📊 合計: ${fieldNames.length} フィールド, ${pokemonData.length} ポケモン`);
}

main().catch((error) => {
    console.error('\n❌ エラーが発生しました:', error.message);
    process.exit(1);
});
