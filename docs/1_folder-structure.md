# プロジェクト構成

このドキュメントは、ポケモンスリープ寝顔図鑑管理アプリのフォルダ構成を説明します。

## ディレクトリ構造

```
pokesleepfaces/
├── app/                    # Next.js App Router
│   ├── favicon.ico        # ファビコン
│   ├── fonts/             # フォントファイル
│   ├── globals.css        # グローバルスタイル
│   ├── layout.tsx         # ルートレイアウト（ErrorBoundary含む）
│   └── page.tsx           # メインページ（コンポーネント統合）
│
├── components/            # Reactコンポーネント
│   ├── AuthButton.tsx     # 認証ボタン
│   ├── DataProtectionWarning.tsx # データ保護警告
│   ├── ErrorBoundary.tsx  # エラー境界コンポーネント
│   ├── FilterPanel.tsx    # フィルタ操作パネル
│   ├── HelpModal.tsx      # ヘルプモーダル
│   ├── PokemonCard.tsx    # ポケモンカード（メモ化済み）
│   └── ProgressSummary.tsx # 進捗サマリー表示
│
├── data/                  # データ定義
│   └── mockData.ts        # モックデータ
│
├── firebase/              # Firebase設定
│   ├── config.ts          # 初期化設定
│   └── firestore.rules    # セキュリティルール
│
├── hooks/                 # カスタムフック
│   ├── useAuth.ts         # 認証状態管理
│   ├── useCollection.ts   # コレクション操作
│   ├── useFilters.ts      # フィルタロジック
│   └── useProgress.ts     # 進捗計算ロジック
│
├── lib/                   # ユーティリティ
│   ├── db.ts              # Firestore操作（バリデーション付）
│   └── localStorage.ts    # LocalStorage操作（サイズ制限付）
│
├── types/                 # 型定義
│   └── filters.ts         # フィルタ状態型（FilterState）
│
├── public/                # 静的ファイル
│   └── ...
│
├── docs/                  # ドキュメント
│   └── ...
│
├── .gitignore             # Git除外設定
├── eslint.config.mjs      # ESLint設定
├── jest.config.js         # Jest設定
├── jest.setup.js          # Jestセットアップ
├── next.config.ts         # Next.js設定
├── package.json           # 依存関係
└── ...
```

## 主要ファイルの説明

### アプリケーションコア

#### `app/page.tsx`
- メインページのエントリーポイント
- カスタムフックとUIコンポーネントの統合
- 責務を分離し、コードの見通しを改善

#### `hooks/`
- **`useAuth.ts`**: Firebase認証状態の監視
- **`useCollection.ts`**: 寝顔収集データの管理（Firestore/LocalStorage同期）
- **`useFilters.ts`**: フィルタリング状態とロジック
- **`useProgress.ts`**: 進捗率の計算（メモ化による最適化）

#### `components/`
- **`PokemonCard.tsx`**: `React.memo`により最適化されたカードコンポーネント
- **`FilterPanel.tsx`**: フィルタUIと一括操作ボタン
- **`ProgressSummary.tsx`**: 全体・タイプ別・レアリティ別の進捗表示
- **`ErrorBoundary.tsx`**: 予期せぬエラーをキャッチし、フォールバックUIを表示

### データ層

#### `lib/db.ts`
- Firestore操作関数群
- 入力値の厳格なバリデーション（型チェック、空文字チェック）

#### `lib/localStorage.ts`
- ゲストユーザー用データ永続化
- 容量制限（5MB）のチェックとエラーハンドリング
- `QuotaExceededError`への対応

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

`.env`（または `.env.local`）に以下の環境変数を設定:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

詳細は `docs/2_setup_guide.md` を参照してください。
