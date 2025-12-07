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

※ 初回構築時やセキュリティルールを変更した場合は、以下のコマンドでFirestoreルールも適用してください：

```bash
npx firebase deploy --only firestore:rules
```

---

## 3. ステージング環境での動作確認

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

## 4. ステージング環境の削除

不要になったステージングチャネルを削除：

```bash
firebase hosting:channel:delete staging
```

---

## 5. トラブルシューティング

### 権限エラー

### ステージング環境での権限エラー

```
Error toggling all styles: FirebaseError: Missing or insufficient permissions.
```

**解決方法:**
- `users_staging` コレクションへの書き込みルールがクラウドに反映されていない可能性があります。
- 以下のコマンドでルールを明示的にデプロイしてください：

```bash
npx firebase deploy --only firestore:rules
```

---

## 参考リンク

- [Firebase Hosting プレビューチャネル](https://firebase.google.com/docs/hosting/test-preview-deploy)
- [Firebase Admin SDK](https://firebase.google.com/docs/admin/setup)
- [Firestore セキュリティルール](https://firebase.google.com/docs/firestore/security/get-started)
