# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.3.1] - 2025-12-06

### Changed
- **UI改善**: Googleログインボタンをナビゲーションバー内に移動
  - ヘッダーエリアをシンプル化
  - フィルタパネル上部にログインボタンを配置
  - ヘッダーのアイコン・タイトルサイズを調整

## [1.3.0] - 2025-12-05

### Added
- **アーキテクチャ刷新**: アプリケーションの再設計とリファクタリング
  - カスタムフックの導入 (`useAuth`, `useCollection`, `useFilters`, `useProgress`)
  - コンポーネントの責務分離とディレクトリ構造の整備
- **パフォーマンス最適化**:
  - `PokemonCard` 等の主要コンポーネントをメモ化 (`React.memo`)
  - スタイル切替の応答速度を 200ms → 3.8ms に改善（98%高速化）
  - 再レンダリング回数を 209回 → 1回 に削減
- **安定性向上**:
  - `ErrorBoundary` の導入によるクラッシュ防止
  - データ書き込み時の厳格な入力バリデーション追加

### Changed
- `app/page.tsx`: ロジックをカスタムフックに委譲し、可読性と保守性を向上
- ドキュメント構成の刷新:
  - アーキテクチャ図、フォルダ構成、パフォーマンスレポートの更新

## [1.2.0] - 2025-12-03

### Added
- Google Sheetsによるデータ管理システムを実装
  - `scripts/fetch-sheets-to-ts.js`: Google SheetsからTypeScriptファイルを自動生成するスクリプト
  - `npm run update:data`: データ更新コマンドを追加
- `docs/6_date-update_guide.md`: データ更新ガイドを新規作成
  - Google Sheetsの構造説明
  - 更新手順（ポケモン追加、寝顔修正、フィールド追加）
  - 環境設定方法
  - トラブルシューティング

### Changed
- `data/mockData.ts`: Google Sheetsから自動生成されるように変更
- ドキュメント構成を整理
  - `docs/gcp-costs.md`: `docs/6_gcp-costs.md`からリネーム
  - `docs/1_folder-structure.md`: docsフォルダのリストを更新
  - `README.md`: ドキュメントリストにデータ更新ガイドを追加

## [1.1.0] - 2024-11-XX

### Added
- スワイプナビゲーションの実装
  - モバイルドロワーをスワイプで閉じる機能
  - 左配置の戻るボタン
- データ保護警告機能
  - 未ログインユーザー向けの警告表示
  - データ消失リスクの通知
- ヘルプ・FAQ機能
  - ログイン方法の説明
  - データ移行手順
  - フィルタの使い方ガイド

### Changed
- ドロワーUIの改善
  - モバイル向けナビゲーションの最適化
  - ユーザビリティの向上

### Fixed
- 未収集のみフィルタ機能の進捗集計ロジックを改善
- デバッグログを削除

## [1.0.1] - 2024-11-XX

### Fixed
- Firebase Analyticsの初期化処理を修正
- measurement IDを追加

### Changed
- バージョン番号を1.0.1に更新

---

## リリースノート作成ガイドライン

### カテゴリ
- **Added**: 新機能
- **Changed**: 既存機能の変更
- **Deprecated**: 非推奨になった機能
- **Removed**: 削除された機能
- **Fixed**: バグ修正
- **Security**: セキュリティ関連の修正

### バージョニング
- **Major (X.y.z)**: 互換性のないAPI変更や大規模な機能追加
- **Minor (x.Y.z)**: 後方互換性のある機能追加
- **Patch (x.y.Z)**: 後方互換性のあるバグ修正
