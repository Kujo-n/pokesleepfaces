/**
 * Firestore ユーザーデータコピースクリプト
 * 
 * 事前準備:
 *   npm install firebase-admin
 * 
 * 使用方法:
 *   node scripts/copy-user-data.js <userId> [targetEnvironment]
 * 
 * 例:
 *   node scripts/copy-user-data.js user123 staging
 *   node scripts/copy-user-data.js user123 production
 */

const admin = require('firebase-admin');
const path = require('path');

// 環境変数から認証情報を読み込み
const serviceAccountPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;

if (!serviceAccountPath) {
    console.error('❌ エラー: GOOGLE_APPLICATION_CREDENTIALS 環境変数が設定されていません');
    console.log('');
    console.log('設定方法:');
    console.log('  export GOOGLE_APPLICATION_CREDENTIALS="/path/to/serviceAccountKey.json"');
    console.log('');
    console.log('サービスアカウントキーの取得:');
    console.log('  1. Firebase Console → プロジェクト設定 → サービスアカウント');
    console.log('  2. 「新しい秘密鍵の生成」をクリック');
    console.log('  3. ダウンロードしたJSONファイルのパスを環境変数に設定');
    process.exit(1);
}

// Firebase Admin SDK 初期化
admin.initializeApp({
    credential: admin.credential.applicationDefault()
});

const db = admin.firestore();

/**
 * ユーザーデータをコピー
 * @param {string} userId - コピー元のユーザーID
 * @param {string} targetEnv - コピー先環境 ('staging' | 'production')
 */
async function copyUserData(userId, targetEnv = 'staging') {
    try {
        console.log(`📋 ユーザーデータコピー開始`);
        console.log(`  ユーザーID: ${userId}`);
        console.log(`  コピー先: ${targetEnv}`);
        console.log('');

        // コレクション名の決定
        const sourceCollection = 'users';
        const targetCollection = targetEnv === 'staging' ? 'users_staging' : 'users';

        if (sourceCollection === targetCollection) {
            console.warn('⚠️  警告: コピー元とコピー先が同じです。処理を中止します。');
            return;
        }

        // ユーザーデータの取得
        const sourceDocRef = db.collection(sourceCollection).doc(userId);
        const sourceDoc = await sourceDocRef.get();

        if (!sourceDoc.exists) {
            console.error(`❌ エラー: ユーザー ${userId} が見つかりません`);
            process.exit(1);
        }

        const userData = sourceDoc.data();
        console.log(`✅ ユーザーデータ取得成功`);
        console.log(`  lastAccessed: ${userData.lastAccessed?.toDate()}`);
        console.log(`  isAnonymous: ${userData.isAnonymous}`);
        console.log('');

        // サブコレクション（collections）のコピー
        const collectionsRef = sourceDocRef.collection('collections');
        const collectionsSnapshot = await collectionsRef.get();

        console.log(`📦 サブコレクション: ${collectionsSnapshot.size} 件のポケモンデータ`);
        console.log('');

        // ターゲットへの書き込み
        const targetDocRef = db.collection(targetCollection).doc(userId);

        // バッチ書き込み
        const batch = db.batch();

        // ユーザードキュメントをコピー
        batch.set(targetDocRef, {
            ...userData,
            copiedFrom: sourceCollection,
            copiedAt: admin.firestore.FieldValue.serverTimestamp()
        });

        // サブコレクションをコピー
        let copiedCount = 0;
        for (const doc of collectionsSnapshot.docs) {
            const targetSubDocRef = targetDocRef.collection('collections').doc(doc.id);
            batch.set(targetSubDocRef, doc.data());
            copiedCount++;
        }

        // コミット
        await batch.commit();

        console.log(`✅ コピー完了`);
        console.log(`  ユーザードキュメント: 1 件`);
        console.log(`  サブコレクション: ${copiedCount} 件`);
        console.log(`  コピー先: ${targetCollection}/${userId}`);

    } catch (error) {
        console.error('❌ エラー:', error.message);
        process.exit(1);
    }
}

/**
 * 複数ユーザーのデータをコピー
 * @param {string[]} userIds - ユーザーIDの配列
 * @param {string} targetEnv - コピー先環境
 */
async function copyMultipleUsers(userIds, targetEnv = 'staging') {
    console.log(`📋 複数ユーザーデータコピー開始`);
    console.log(`  対象ユーザー数: ${userIds.length}`);
    console.log(`  コピー先: ${targetEnv}`);
    console.log('');

    for (let i = 0; i < userIds.length; i++) {
        console.log(`[${i + 1}/${userIds.length}] ${userIds[i]}`);
        await copyUserData(userIds[i], targetEnv);
        console.log('');
    }

    console.log('✅ 全ユーザーのコピーが完了しました');
}

// コマンドライン引数の処理
const args = process.argv.slice(2);

if (args.length === 0) {
    console.log('使用方法:');
    console.log('  node scripts/copy-user-data.js <userId> [targetEnvironment]');
    console.log('');
    console.log('例:');
    console.log('  node scripts/copy-user-data.js user123 staging');
    console.log('  node scripts/copy-user-data.js user123,user456,user789 staging');
    console.log('');
    console.log('引数:');
    console.log('  userId: コピー元のユーザーID（カンマ区切りで複数指定可能）');
    console.log('  targetEnvironment: コピー先環境 (staging | production) デフォルト: staging');
    process.exit(1);
}

const userIdInput = args[0];
const targetEnv = args[1] || 'staging';

// カンマ区切りで複数ユーザーIDが指定されている場合
if (userIdInput.includes(',')) {
    const userIds = userIdInput.split(',').map(id => id.trim());
    copyMultipleUsers(userIds, targetEnv)
        .then(() => process.exit(0))
        .catch(err => {
            console.error(err);
            process.exit(1);
        });
} else {
    copyUserData(userIdInput, targetEnv)
        .then(() => process.exit(0))
        .catch(err => {
            console.error(err);
            process.exit(1);
        });
}
