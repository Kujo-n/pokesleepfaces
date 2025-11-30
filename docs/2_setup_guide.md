# 環境構築手順書 (Setup Guide)

このドキュメントは、ポケモンスリープ寝顔図鑑管理アプリの開発環境を再現するための手順書です。

## 前提条件
- OS: Windows 10/11
- 権限: 管理者権限 (Node.js インストール時)

## 1. Node.js のインストール
プロジェクトの実行には Node.js (LTS版推奨) が必要です。

```powershell
# winget を使用してインストールする場合
winget install -e --id OpenJS.NodeJS.LTS --accept-source-agreements --accept-package-agreements
```
インストール後、ターミナルを再起動して `node -v` と `npm -v` が実行できることを確認してください。

## 2. プロジェクトのセットアップ
リポジトリをクローンした後、以下のコマンドで依存関係をインストールします。

```powershell
# 依存関係のインストール
npm install
```

### 新規作成時の手順 (参考)
本プロジェクトは以下のコマンドで初期化されました。
```powershell
npx -y create-next-app@latest . --typescript --eslint --tailwind --no-src-dir --app --import-alias "@/*"
npm install firebase
```

## 3. 環境変数の設定
Firebase と連携するために環境変数の設定が必要です。
`env.example` をコピーして `.env.local` を作成してください。

```powershell
cp env.example .env.local
```
`.env.local` 内の各項目に、Firebase コンソールから取得した値を設定してください。
※ UI実装フェーズでは、この設定はスキップ可能です（モックデータを使用）。

## 4. Firebase セットアップ

1. [Firebase Console](https://console.firebase.google.com/) で新規プロジェクトを作成します。
2. **Authentication** を有効にし、**Google ログイン** プロバイダを有効にします。
3. **Cloud Firestore** を作成します（テストモードまたは本番モード）。
    - 本番モードの場合は、`firebase/firestore.rules` の内容をルールエディタに貼り付けて公開してください。
4. プロジェクトの設定 > 全般 > マイアプリ からウェブアプリを追加します。
5. 表示される `firebaseConfig` の内容を `.env.local` ファイルに設定します（`env.example` をコピーして作成）。

```bash
cp env.example .env.local
```

`.env.local` の内容:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

## 5. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで `http://localhost:3000` にアクセスします。
Googleログインボタンが表示され、ログインすると収集状況がFirestoreに保存されるようになります。


