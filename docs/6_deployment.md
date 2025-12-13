# デプロイ手順書

このドキュメントは、ポケスリ寝顔チェッカーを Firebase Hosting にデプロイする手順を説明します。

## 📍 操作場所の表記について

- 💻 **PC操作**: ローカルのコマンドライン（PowerShell/ターミナル）で実行
- 🌐 **GCP操作**: Firebase Console（ブラウザ）で実行

---

## 前提条件

- Node.js がインストールされていること
- Firebase CLI がインストールされていること
- Firebase プロジェクトが作成されていること

---

## 初回セットアップ

### 1. 💻 Firebase CLI のインストール（未インストールの場合）

**操作場所**: PC（コマンドライン）

```bash
npm install -g firebase-tools
```

---

### 2. 💻 Firebase へログイン

**操作場所**: PC（コマンドライン）

```bash
firebase login
```

ブラウザが自動的に開き、Google アカウントでログインします。

---

### 3. 🌐 Firebase プロジェクトの作成

**操作場所**: Firebase Console（ブラウザ）

1. [Firebase Console](https://console.firebase.google.com/) にアクセス
2. 「プロジェクトを追加」をクリック
3. プロジェクト名を入力（例: `sleepingfaceschecker`）
4. Google Analytics の設定（オプション）
5. 「プロジェクトを作成」をクリック

---

### 4. 💻 Firebase プロジェクトの初期化

**操作場所**: PC（プロジェクトルート）

プロジェクトルートで以下のコマンドを実行：

```bash
firebase init
```

以下の設定を選択：
- **Hosting**: Space キーで選択、Enter で確定
- **既存のプロジェクトを使用**: 作成したプロジェクトを選択
- **public directory**: `out` と入力
- **single-page app**: `Yes` を選択
- **GitHub Actions**: `No` を選択（後で設定可能）

**または、手動で `.firebaserc` を作成**:

```json
{
  "projects": {
    "default": "your-project-id"
  }
}
```

---

### 5. 🌐 Firebase Authentication の設定

**操作場所**: Firebase Console（ブラウザ）

1. [Firebase Console](https://console.firebase.google.com/) でプロジェクトを開く
2. 左メニューから「Authentication」を選択
3. 「始める」をクリック
4. 「Sign-in method」タブを開く
5. 「Google」を選択
6. 「有効にする」をオンにする
7. プロジェクトのサポートメールを設定
8. 「保存」をクリック

---

### 6. 🌐 Cloud Firestore の設定

**操作場所**: Firebase Console（ブラウザ）

1. Firebase Console で左メニューから「Firestore Database」を選択
2. 「データベースを作成」をクリック
3. **本番モード**を選択（セキュリティルールは後で設定）
4. ロケーションを選択（例: `asia-northeast1` - 東京）
5. 「有効にする」をクリック

---

### 7. 💻 Firestore セキュリティルールのデプロイ

**操作場所**: PC（プロジェクトルート）

```bash
firebase deploy --only firestore:rules
```

これにより、`firebase/firestore.rules` の内容が Firestore に適用されます。

---

### 8. 🌐 + 💻 環境変数の設定

#### 8-1. 🌐 Firebase 設定値の取得

**操作場所**: Firebase Console（ブラウザ）

1. Firebase Console で「プロジェクトの設定」（⚙️アイコン）→「全般」を開く
2. 「マイアプリ」セクションで「ウェブアプリを追加」（`</>`アイコン）をクリック
3. アプリのニックネームを入力（例: `sleepingfaceschecker-web`）
4. 「Firebase Hosting の設定」のチェックは外す
5. 「アプリを登録」をクリック
6. 表示される `firebaseConfig` の値をコピー

#### 8-2. 💻 環境変数ファイルの作成

**操作場所**: PC（プロジェクトルート）

```bash
cp env.example .env
```

`.env` を編集して、Firebase Console からコピーした値を設定：

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

---

## デプロイ手順

### 1. 💻 ビルド

**操作場所**: PC（プロジェクトルート）

```bash
npm run build
```

これにより、`out` ディレクトリに静的ファイルが生成されます。

---

### 2. 💻 デプロイ

**操作場所**: PC（プロジェクトルート）

```bash
# 本番デプロイ（ビルドとデプロイを一括実行）
npm run deploy:prod

# または個別に実行
npm run build
firebase deploy --only hosting
```

デプロイが完了すると、以下のような URL が表示されます：

```
✔  Deploy complete!

Hosting URL: https://your-project-id.web.app
```

---

### 3. 🌐 動作確認

**操作場所**: ブラウザ

デプロイされた URL にアクセスし、以下を確認：

- [ ] ページが正しく表示される
- [ ] Google ログインが動作する
- [ ] 寝顔の選択/解除が動作する
- [ ] データが Firestore に保存される
- [ ] ページをリロードしてもデータが保持される

---

## トラブルシューティング

### 💻 ビルドエラーが発生する場合

**操作場所**: PC（プロジェクトルート）

```bash
# node_modules を削除して再インストール
rm -rf node_modules package-lock.json
npm install
npm run build
```

---

### 💻 デプロイエラーが発生する場合

**操作場所**: PC（コマンドライン）

```bash
# Firebase CLI を最新版に更新
npm install -g firebase-tools@latest

# ログインし直す
firebase logout
firebase login
```

---

### 💻 環境変数が反映されない場合

**操作場所**: PC（プロジェクトルート）

- `.env` ファイルが正しく作成されているか確認
- ビルド前に環境変数を設定する必要があります
- ビルド後に `.env` を変更した場合は、再ビルドが必要

```bash
# 環境変数を変更した後は必ず再ビルド
npm run build
```

---

### 🌐 Firestore の接続エラーが発生する場合

**確認場所**: Firebase Console（ブラウザ）+ PC

1. 🌐 Firebase Console で Firestore が有効になっているか確認
2. 🌐 セキュリティルールが正しくデプロイされているか確認
   - Firebase Console → Firestore Database → ルール タブ
3. 💻 `.env` の `NEXT_PUBLIC_FIREBASE_PROJECT_ID` が正しいか確認

---

## 更新デプロイ

### 💻 コード更新後のデプロイ手順

**操作場所**: PC（プロジェクトルート）
```
# 1. 本番環境へのデプロイ
npm run deploy:prod

# 2. ステージング環境へのデプロイ（テスト用）
npm run deploy:staging
```

---

## ロールバック

### 🌐 以前のバージョンに戻す

**操作場所**: Firebase Console（ブラウザ）

1. Firebase Console で「Hosting」を開く
2. 「リリース履歴」タブを開く
3. 戻したいバージョンの「...」メニューから「ロールバック」を選択

---

## カスタムドメインの設定（オプション）

### 🌐 独自ドメインの設定

**操作場所**: Firebase Console（ブラウザ）+ ドメインレジストラ

1. 🌐 Firebase Console で「Hosting」を開く
2. 🌐 「カスタムドメインを追加」をクリック
3. 🌐 所有しているドメインを入力
4. 🌐 表示される DNS レコードの設定内容を確認
5. 🌐 ドメインレジストラ（お名前.com、Google Domains など）で DNS レコードを設定
6. 🌐 Firebase Console で「確認」をクリック
7. 🌐 SSL 証明書が自動的にプロビジョニングされます（数分〜24時間）

---

## コスト管理

### 🌐 予算アラートの設定（推奨）

**操作場所**: Google Cloud Console（ブラウザ）

- 小規模運用（〜数千ユーザー）: 無料枠内で運用可能
- 詳細は `docs/gcp-costs.md` を参照

予算アラートの設定手順：

1. [Google Cloud Console](https://console.cloud.google.com/) を開く
2. 左上のプロジェクト選択から、Firebase プロジェクトを選択
3. 左メニューから「お支払い」→「予算とアラート」を選択
4. 「予算を作成」をクリック
5. 月額予算を設定（例: $5）
6. アラート通知のしきい値を設定（例: 50%, 90%, 100%）
7. 「完了」をクリック

---

## 参考リンク

- [Firebase Hosting ドキュメント](https://firebase.google.com/docs/hosting)
- [Next.js 静的エクスポート](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [Firebase Console](https://console.firebase.google.com/)
- [Google Cloud Console](https://console.cloud.google.com/)
