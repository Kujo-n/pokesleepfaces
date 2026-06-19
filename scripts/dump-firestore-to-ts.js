/**
 * Firestore → mockData.ts 書き出しスクリプト（seed-firestore.js の逆向き）
 *
 * 現在の正データ（Firestore master コレクション）を読み出し、
 * data/mockData.ts をその状態に合わせて再生成する。
 * 管理画面(Admin UI)で更新した内容をバックアップ用の静的ファイルへ反映する用途。
 *
 * 使い方:
 *   node scripts/dump-firestore-to-ts.js
 *
 * 環境変数:
 *   GOOGLE_APPLICATION_CREDENTIALS: Firebase Admin SDKのサービスアカウントキーパス
 *   FIRESTORE_ENV: 'production' | 'staging' (デフォルト: 'production')
 *   NEXT_PUBLIC_FIREBASE_PROJECT_ID: プロジェクトID
 */

const fs = require('fs');
const path = require('path');

const MOCK_DATA_PATH = path.join(__dirname, '../data/mockData.ts');

/**
 * 現行 mockData.ts の MOCK_POKEMON 並び順を読み取り、id→元の出現順 のマップを返す。
 * 同一図鑑番号（フォーム違い）のタイブレークに使い、差分を最小化する。
 * 読み取れない場合は空マップ（dexNumber + id 順にフォールバック）。
 */
function loadExistingOrder() {
    try {
        const content = fs.readFileSync(MOCK_DATA_PATH, 'utf-8');
        const match = content.match(/export const MOCK_POKEMON: Pokemon\[\] = (\[[\s\S]*\]);/);
        if (!match) return new Map();
        const list = JSON.parse(match[1]);
        const order = new Map();
        list.forEach((p, index) => order.set(p.id, index));
        return order;
    } catch {
        return new Map();
    }
}

/**
 * Firestoreドキュメントを mockData.ts のプロパティ順に正規化する。
 * updatedAt 等の付帯フィールドを除去し、excludeFromFields は中身がある時のみ残す。
 */
function normalizePokemon(data) {
    const styles = (data.styles || []).map((s) => {
        const style = {
            id: s.id,
            name: s.name,
            rarity: s.rarity,
        };
        if (Array.isArray(s.excludeFromFields) && s.excludeFromFields.length > 0) {
            style.excludeFromFields = s.excludeFromFields;
        }
        return style;
    });

    return {
        id: data.id,
        dexNumber: data.dexNumber,
        name: data.name,
        type: data.type,
        sleepType: data.sleepType,
        fields: data.fields || [],
        styles,
    };
}

/**
 * TypeScriptコードを生成する（fetch-sheets-to-ts.js と同一体裁）
 */
function generateTypeScriptCode(fields, pokemon) {
    return `export type SleepStyle = {
    id: string;
    name: string;
    rarity: number; // 1-5 stars
    excludeFromFields?: string[]; // ポケモンfieldsから除外するフィールド（省略時は全fields出現）
};

export type Pokemon = {
    id: string;
    dexNumber: number;
    name: string;
    type: string;
    sleepType: 'うとうと' | 'すやすや' | 'ぐっすり';
    fields: string[]; // 出現フィールド
    styles: SleepStyle[];
};

export const FIELD_NAMES = ${JSON.stringify(fields, null, 4)};

export const MOCK_POKEMON: Pokemon[] = ${JSON.stringify(pokemon, null, 4)};
`;
}

async function main() {
    console.log('🚀 Firestore → mockData.ts の書き出しを開始します...\n');

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
    } catch {
        console.warn('⚠️ dotenvの読み込みをスキップします（インストールされていない可能性があります）');
    }

    // Firebase Admin 初期化（seed-firestore.js と同じ方式）
    if (!admin.apps.length) {
        const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

        if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
            const serviceAccount = require(process.env.GOOGLE_APPLICATION_CREDENTIALS);
            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount),
                projectId: projectId,
            });
        } else {
            admin.initializeApp({
                projectId: projectId || 'sleepingfaceschecker',
            });
        }
    }

    const db = admin.firestore();
    const env = process.env.FIRESTORE_ENV || 'production';
    const masterCollection = env === 'staging' ? 'master_staging' : 'master';

    console.log(`📦 環境: ${env}`);
    console.log(`📁 コレクション: ${masterCollection}\n`);

    // 1. フィールド名を取得
    console.log('📖 フィールド名を読み込み中...');
    const fieldsDoc = await db.collection(masterCollection).doc('fields').get();
    if (!fieldsDoc.exists) {
        throw new Error(`${masterCollection}/fields が存在しません。Firestoreが空の可能性があります。`);
    }
    const fieldNames = fieldsDoc.data().names || [];
    console.log(`   フィールド: ${fieldNames.length} 件\n`);

    // 2. ポケモンデータを取得
    console.log('📖 ポケモンデータを読み込み中...');
    const entriesSnapshot = await db
        .collection(masterCollection)
        .doc('pokemon')
        .collection('entries')
        .get();

    if (entriesSnapshot.empty) {
        throw new Error(`${masterCollection}/pokemon/entries が空です。`);
    }

    const pokemonData = entriesSnapshot.docs.map((doc) => normalizePokemon(doc.data()));
    console.log(`   ポケモン: ${pokemonData.length} 匹\n`);

    // 3. 並び替え（dexNumber昇順 → 現行ファイルの並び → id順）
    const existingOrder = loadExistingOrder();
    pokemonData.sort((a, b) => {
        if (a.dexNumber !== b.dexNumber) return a.dexNumber - b.dexNumber;
        const ai = existingOrder.has(a.id) ? existingOrder.get(a.id) : Number.MAX_SAFE_INTEGER;
        const bi = existingOrder.has(b.id) ? existingOrder.get(b.id) : Number.MAX_SAFE_INTEGER;
        if (ai !== bi) return ai - bi;
        return a.id.localeCompare(b.id);
    });

    // 4. TypeScriptコードを生成して書き込み
    console.log('📝 mockData.ts を生成中...');
    const tsCode = generateTypeScriptCode(fieldNames, pokemonData);
    fs.writeFileSync(MOCK_DATA_PATH, tsCode, 'utf-8');

    console.log(`\n✅ 書き出しが完了しました！`);
    console.log(`📊 合計: ${fieldNames.length} フィールド, ${pokemonData.length} ポケモン`);
    console.log(`📄 出力: ${MOCK_DATA_PATH}`);
}

main().catch((error) => {
    console.error('\n❌ エラーが発生しました:', error.message);
    process.exit(1);
});
