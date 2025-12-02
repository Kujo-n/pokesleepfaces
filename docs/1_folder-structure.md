# プロジェクト構成

このドキュメントは、ポケモンスリープ寝顔図鑑管理アプリのフォルダ構成を説明します。

## ディレクトリ構造

```
pokesleepfaces/
├── app/                    # Next.js App Router
│   ├── favicon.ico        # ファビコン
│   ├── fonts/             # フォントファイル
│   ├── globals.css        # グローバルスタイル
│   ├── layout.tsx         # ルートレイアウト
│   └── page.tsx           # メインページ（ダッシュボード）
│
├── components/            # Reactコンポーネント
│   ├── AuthButton.tsx     # 認証ボタン（Google ログイン/ログアウト）
│   └── PokemonCard.tsx    # ポケモンカード表示コンポーネント
│
├── data/                  # データ定義
│   └── mockData.ts        # モックデータ（ポケモン・寝顔スタイル）
│
├── firebase/              # Firebase設定
│   ├── config.ts          # Firebase初期化設定
│   └── firestore.rules    # Firestoreセキュリティルール
│
├── lib/                   # ユーティリティ・ヘルパー
│   ├── db.ts              # Firestore操作関数
│   └── localStorage.ts    # LocalStorage操作（ゲストユーザー用）
│
├── public/                # 静的ファイル
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
│
├── docs/                  # ドキュメント
│   ├── 1_folder-structure.md    # このファイル - プロジェクト構造
│   ├── 2_setup_guide.md         # 環境構築手順書
│   ├── 3_architecture.md        # アーキテクチャ図
│   ├── 4_performance.md         # パフォーマンス最適化
│   ├── 5_deployment.md          # デプロイ手順書
│   ├── 6_date-update_guide.md   # データ更新ガイド
│   └── gcp-costs.md             # GCPコスト試算
│
├── .gitignore             # Git除外設定
├── .next/                 # Next.jsビルド出力（自動生成）
├── node_modules/          # 依存パッケージ（自動生成）
├── env.example            # 環境変数テンプレート
├── eslint.config.mjs      # ESLint設定
├── next-env.d.ts          # Next.js型定義（自動生成）
├── next.config.ts         # Next.js設定
├── package.json           # プロジェクト依存関係
├── package-lock.json      # 依存関係ロックファイル
├── postcss.config.mjs     # PostCSS設定
├── README.md              # プロジェクト概要
├── tsconfig.json          # TypeScript設定
└── walkthrough.md         # 実装ウォークスルー
```

## 主要ファイルの説明

### アプリケーションコア

#### `app/page.tsx`
- メインページコンポーネント
- ダッシュボード、進捗表示、ポケモンリストを統合
- Firebase認証状態の管理
- Firestoreとのリアルタイム同期

#### `components/PokemonCard.tsx`
- 個別ポケモンの表示カード
- 寝顔スタイルの選択/解除機能
- 展開/折りたたみ機能
- 一括選択/解除機能

#### `components/AuthButton.tsx`
- Google認証ボタン
- ログイン/ログアウト処理
- ユーザー情報表示

### データ層

#### `data/mockData.ts`
- ポケモンと寝顔スタイルのマスターデータ
- 型定義（`Pokemon`, `SleepStyle`）
- フィールド名リスト

#### `lib/db.ts`
- Firestore操作のヘルパー関数
- `toggleSleepStyle`: 個別スタイルの切り替え
- `toggleAllStyles`: ポケモン単位の一括切り替え
- `subscribeToUserCollection`: リアルタイム同期
- `checkIfNewUser`: 新規ユーザー判定

#### `lib/localStorage.ts`
- ゲストユーザー用のLocalStorage操作
- `saveToLocalStorage`: 未ログイン時のデータ保存
- `loadFromLocalStorage`: 起動時のデータ読み込み
- `migrateToFirestore`: 新規ユーザーログイン時の自動移行
- `clearLocalStorage`: LocalStorageクリア

### Firebase設定

#### `firebase/config.ts`
- Firebase初期化
- 環境変数からの設定読み込み
- Auth, Firestoreインスタンスのエクスポート

#### `firebase/firestore.rules`
- Firestoreセキュリティルール
- ユーザーごとのデータ分離
- 読み取り/書き込み権限の定義

### 設定ファイル

#### `next.config.ts`
- Next.js設定
- ビルドオプション

#### `tsconfig.json`
- TypeScript設定
- パスエイリアス（`@/*`）
- コンパイルオプション

#### `eslint.config.mjs`
- ESLint設定
- コード品質チェック

#### `postcss.config.mjs`
- PostCSS設定
- Tailwind CSS処理

### ドキュメント

#### `docs/2_setup_guide.md`
- 環境構築手順
- Node.jsインストール
- Firebase設定方法

#### `walkthrough.md`
- 実装機能の説明
- UI/UX機能
- バックエンド連携

#### `README.md`
- プロジェクト概要
- クイックスタートガイド

## データフロー

```
User Action (UI)
    ↓
app/page.tsx (State Management)
    ↓
lib/db.ts (Firestore Operations)
    ↓
Firebase Firestore (Cloud Database)
    ↓
Real-time Sync
    ↓
app/page.tsx (UI Update)
```

## 技術スタック

- **フロントエンド**: Next.js 16 (App Router), React 19, TypeScript
- **スタイリング**: Tailwind CSS 4
- **バックエンド**: Firebase (Authentication, Firestore)
- **開発ツール**: ESLint, PostCSS

## 環境変数

`.env.local` に以下の環境変数を設定:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

詳細は `docs/2_setup_guide.md` を参照してください。
