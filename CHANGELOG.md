# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
- Google Sheetsのデータ入力フォーマットを変更
  - 旧: カンマ区切りテキスト形式（`fields`, `locations`列）
  - 新: チェックボックス形式（各フィールド名の列に`TRUE`/`FALSE`）
- `data/mockData.ts`: Google Sheetsから自動生成されるように変更
- ドキュメント構成を整理
  - `docs/gcp-costs.md`: `docs/6_gcp-costs.md`からリネーム
  - `docs/1_folder-structure.md`: docsフォルダのリストを更新
  - `README.md`: ドキュメントリストにデータ更新ガイドを追加

### Fixed
- `scripts/fetch-sheets-to-ts.js`: FALSE値の処理ロジックを改善
  - 空文字列と"FALSE"文字列を正しく処理
- 未収集のみフィルタ機能の進捗集計ロジックを改善
- デバッグログを削除

### Removed
- `docs/7_google_sheets_format_change.md`: `docs/6_date-update_guide.md`に統合

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
