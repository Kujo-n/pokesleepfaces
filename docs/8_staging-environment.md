# ステージング環境構築ガイド

本番相当のテスト環境（ステージング環境）を構築する手順を説明します。

---

## 概要

**構成:**
- **本番環境**: `https://your-project-id.web.app`
- **ステージング環境**: `https://your-project-id--staging-xxxxx.web.app`
- **Firestore**: 同一プロジェクト内で環境別コレクション使用
  - 本番: `users` コレクション
  - ステージング: `users_staging` コレクション

---

## 1. ステージング環境のセットアップ

### 1-1. Firebase Hosting プレビューチャネル作成

```bash
# 永続的なステージングチャネルを作成
firebase hosting:channel:deploy staging

# または期限付き（30日間）
firebase hosting:channel:deploy staging --expires 30d
```

デプロイが完了すると、ステージング環境のURLが表示されます：

```
✔  Channel URL (staging): https://your-project-id--staging-xxxxx.web.app
```

### 1-2. 環境変数の確認

ステージング環境でも同じFirebaseプロジェクトを使用するため、`.env.local` の変更は不要です。

---

## 2. デプロイ方法

### 本番環境へのデプロイ

```bash
npm run deploy:prod
```

### ステージング環境へのデプロイ

```bash
npm run deploy:staging
```

---

## 3. ユーザーデータのコピー

本番環境のユーザーデータをステージング環境にコピーして、実データでのテストが可能です。

### 3-1. サービスアカウントキーの取得

1. [Firebase Console](https://console.firebase.google.com/) を開く
2. プロジェクト設定 → サービスアカウント
3. 「新しい秘密鍵の生成」をクリック
4. ダウンロードしたJSONファイルを安全な場所に保存

### 3-2. 環境変数の設定

```bash
# Windows (PowerShell)
$env:GOOGLE_APPLICATION_CREDENTIALS="C:\path\to\serviceAccountKey.json"

# macOS/Linux
export GOOGLE_APPLICATION_CREDENTIALS="/path/to/serviceAccountKey.json"
```

### 3-3. firebase-admin のインストール

```bash
npm install
```

### 3-4. ユーザーデータのコピー

**単一ユーザー:**

```bash
npm run copy:user <userId> staging
```

**複数ユーザー:**

```bash
npm run copy:user user123,user456,user789 staging
```

**例:**

```bash
# ユーザーID "abc123" のデータをステージングにコピー
npm run copy:user abc123 staging
```

---

## 4. ステージング環境での動作確認

### 確認項目

- [ ] ステージングURLにアクセスできる
- [ ] Google認証が動作する
- [ ] コピーしたユーザーデータが表示される
- [ ] 寝顔の選択/解除が動作する
- [ ] データが `users_staging` コレクションに保存される

### Firestoreでの確認

1. [Firebase Console](https://console.firebase.google.com/) を開く
2. Firestore Database を選択
3. `users_staging` コレクションを確認
4. コピーしたユーザーIDのドキュメントが存在することを確認

---

## 5. ステージング環境の削除

不要になったステージングチャネルを削除：

```bash
firebase hosting:channel:delete staging
```

---

## 6. トラブルシューティング

### サービスアカウントキーのエラー

```
❌ エラー: GOOGLE_APPLICATION_CREDENTIALS 環境変数が設定されていません
```

**解決方法:**
- 環境変数が正しく設定されているか確認
- ファイルパスに空白が含まれる場合は引用符で囲む

### ユーザーが見つからないエラー

```
❌ エラー: ユーザー user123 が見つかりません
```

**解決方法:**
- ユーザーIDが正しいか確認
- `users` コレクションにユーザーが存在するか Firebase Console で確認

### 権限エラー

```
❌ エラー: Missing or insufficient permissions
```

**解決方法:**
- サービスアカウントに適切な権限があるか確認
- Firebase Console → IAM で「Cloud Datastore User」ロールを付与

---

## 7. セキュリティ上の注意

### サービスアカウントキーの管理

⚠️ **重要**: サービスアカウントキーは機密情報です。

- **Gitにコミットしない**: `.gitignore` に追加
- **安全な場所に保管**: パスワード管理ツールなどを使用
- **定期的にローテーション**: 90日ごとに新しいキーを生成
- **不要になったら削除**: Firebase Console から古いキーを削除

### .gitignore への追加

```gitignore
# サービスアカウントキー
*serviceAccountKey*.json
serviceAccount*.json
```

---

## 8. CI/CD との連携

GitHub Actions でステージング環境への自動デプロイも可能です。

**例: `.github/workflows/deploy-staging.yml`**

```yaml
name: Deploy to Staging

on:
  push:
    branches:
      - develop

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run build
      - uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: '${{ secrets.GITHUB_TOKEN }}'
          firebaseServiceAccount: '${{ secrets.FIREBASE_SERVICE_ACCOUNT }}'
          channelId: staging
          projectId: your-project-id
```

---

## 参考リンク

- [Firebase Hosting プレビューチャネル](https://firebase.google.com/docs/hosting/test-preview-deploy)
- [Firebase Admin SDK](https://firebase.google.com/docs/admin/setup)
- [Firestore セキュリティルール](https://firebase.google.com/docs/firestore/security/get-started)
