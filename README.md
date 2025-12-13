# ポケスリ寝顔チェッカー

ポケモンスリープの寝顔コレクションを管理するWebアプリケーションです。

## 主な機能

- 寝顔コレクションの記録・管理
- フィールド別フィルタリング
- 睡眠タイプ別フィルタリング（うとうと・すやすや・ぐっすり）
- 未収集のみ表示（フィルタ適用時は、進捗率の分母も未収集数に基づいて再計算されます）
- レアリティ別進捗表示（★1〜★4）
- 進捗状況の可視化（小数点以下の収集率表示対応）
- フィルタ設定の自動保存（ログインユーザーのみ）
- Firebaseによるデータ同期（ログイン時）
- ローカルストレージによるオフライン対応（ゲストユーザー）
- データ保護に関する警告表示（未ログインユーザー向け）
- ヘルプ・FAQ機能（ログイン、データ移行、フィルタの使い方など）
- モバイル向けナビゲーション改善（スワイプで閉じる、ナビゲーションバー内にGoogleログインボタン配置）



## 技術スタック

- **フロントエンド**: Next.js 16 (App Router), React 19, TypeScript
- **スタイリング**: Tailwind CSS 4
- **バックエンド**: Firebase (Authentication, Firestore)
- **ホスティング**: Firebase Hosting
- **開発ツール**: ESLint, PostCSS

## 開発環境のセットアップ

### 前提条件
- Node.js (LTS版推奨)
- npm または yarn

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 環境変数の設定

```bash
cp env.example .env
```

`.env` を編集して、Firebase の設定値を入力してください。

詳細は [docs/2_setup_guide.md](docs/2_setup_guide.md) を参照してください。

### 3. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

## デプロイ

### Firebase Hosting へのデプロイ

```bash
# ビルド
npm run build

# デプロイ
firebase deploy --only hosting
```

詳細な手順は [docs/6_deployment.md](docs/6_deployment.md) を参照してください。

## ドキュメント

初めての方は、以下の順番で読むことを推奨します：

1. [フォルダ構成](docs/1_folder-structure.md) - プロジェクト構造の説明
2. [環境構築手順書](docs/2_setup_guide.md) - 開発環境のセットアップ
3. [アーキテクチャ図](docs/3_architecture.md) - システム構成の詳細
4. [パフォーマンス最適化](docs/4_performance.md) - 実装された最適化の説明
5. [テスト仕様書](docs/5_test-specification.md) - 品質保証とテスト
6. [デプロイ手順書](docs/6_deployment.md) - Firebase Hosting へのデプロイ
7. [データ更新ガイド](docs/6_date-update_guide.md) - Google Sheetsでのデータ管理
8. [ステージング環境構築ガイド](docs/8_staging-environment.md) - テスト環境の構築と検証
9. [GCP コスト試算](docs/gcp-costs.md) - 運用コストの見積もり

## ライセンス

このプロジェクトは [Creative Commons Attribution-NonCommercial 4.0 International License (CC BY-NC 4.0)](https://creativecommons.org/licenses/by-nc/4.0/) の下で公開されています。

**商用利用は禁止されています。** 個人的な使用、学習、研究目的での使用は自由です。

## 公開URL
https://sleepingfaceschecker.web.app

## バージョン管理

このプロジェクトは [Semantic Versioning](https://semver.org/) に準拠しています。

- **Major (X.y.z)**: 互換性のないAPI変更や大規模な機能追加
- **Minor (x.Y.z)**: 後方互換性のある機能追加
- **Patch (x.y.Z)**: 後方互換性のあるバグ修正
