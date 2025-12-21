# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.6.0] - 2025-12-22

### Added
- **グリッド表示モード**:
  - カード表示とグリッド表示を切り替えるトグルボタンをヘッダーに追加
  - グリッド表示では1行1ポケモン、レアリティ別（★1〜★4）の列でチェックボックスを表示
  - 同一レアリティに複数の寝顔がある場合、頭文字で識別可能
  - ログインユーザーは表示モードの設定がFirestoreに保存され、次回アクセス時に復元
- **`lib/pokemonUtils.ts`**: 共通ユーティリティ関数
  - `filterPokemonStyles`: フィルタリングロジック
  - `getSleepTypeColor`: 睡眠タイプの色取得
  - `groupStylesByRarity`: レアリティ別グループ化

## [1.5.0] - 2025-12-17

### Added
- **寝顔収集状況確認モーダル**:
  - ヘッダーに追加されたアイコンから、全体の収集状況とフィールドごとの収集状況を一覧で確認できる機能を追加
  - 各フィールドに出現するポケモン・寝顔のみを対象とした正確な進捗率を表示
  - 全体、睡眠タイプ（3種）、レアリティ（★3, ★4）の進捗を1行でコンパクトに表示するUIを実装
  - `excludeFromFields`（特定フィールド除外設定）を考慮した計算ロジックを実装

## [1.4.1] - 2025-12-12

### Fixed
- **ログアウト後の状態管理不具合を修正**:
  - ログアウト後、既に表示されているPokemonCardで入力ができなくなる問題を解決
  - `memo`化されたコンポーネントが古いコールバック関数を保持し続ける問題に対処
  - `useCollection`のトグル関数内で`user`変数の代わりに`auth?.currentUser`を直接参照するように変更
  - 依存配列から`user`を削除し、コールバックの再生成頻度を最適化
  - これによりログアウト後も既存のコンポーネントが最新の認証状態を正しく判断できるように改善
- **一括操作がレアリティフィルタを無視する不具合を修正**:
  - `toggleAllPokemonStyles`と`toggleGlobal`がレアリティフィルタを考慮するように修正

### Changed
- `hooks/useCollection.ts`:
  - `toggleStyle`, `toggleAllPokemonStyles`, `toggleGlobal` 各関数の実装を改善
  - Firestore操作の直前に`auth?.currentUser`で最新の認証状態を確認
  - パフォーマンス向上（コールバックの不要な再生成を削減）
- **フィルタパラメータの一元管理**:
  - `types/filters.ts`に`FilterState`型を新規作成
  - 一括操作関数のパラメータをオブジェクト渡しに変更
  - 新しいフィルタ追加時の修正箇所を削減（5箇所→3箇所）


## [1.4.0] - 2025-12-07

### Deployment
- **クロスプラットフォームデプロイ対応**:
  - `package.json` のデプロイスクリプト (`deploy:staging`, `deploy:prod`) を Node.js ベースに移行
  - OSに依存しない安全なファイル操作（`copySync`, `unlinkSync`）を実装

### Documentation
- **ステージング環境ガイドの更新**:
  - `docs/8_staging-environment.md` にFirestoreセキュリティルールの適用手順を追加
  - トラブルシューティング（権限エラー、404エラー）を拡充

### Optimization & Testing
- **データ構造と処理の最適化**:
  - データサイズを約40%削減 (351KB → 211KB)
  - フィルタ処理の順序最適化により、処理速度を30〜85%高速化
- **品質保証の強化**:
  - データ整合性を検証するチェックスクリプトを追加
  - ダブルトグル連続操作などのエッジケースに対する回帰テストを追加
  - テスト仕様書 (`docs/5_test-specification.md`) の作成とドキュメント整理

## [1.3.4] - 2025-12-07

### Mixed
- **全選択ボタンの不具合修正**:
  - ダブルクリック現象（選択直後に解除される等）を修正
  - 連続操作時の状態不競合（Stale Closure）を解消し、動作を安定化
- **エラーハンドリングのUX改善**:
  - **Toast通知の導入**: `window.alert` によるブロッキングなエラー通知を廃止
  - 非侵入的なToast通知により、エラー時も操作を妨げない設計に変更
  - `app/layout.tsx` に `ToastProvider` を配置しアプリ全体で利用可能に

## [1.3.3] - 2025-12-06

### Security
- **CVE-2025-55182 への対応**:
  - React および ReactDOM のバージョンを `19.2.1` に更新

## [1.3.2] - 2025-12-06

### Added
- **LocalStorageによる即時状態復元機能**:
  - アプリ起動時に前回の入力状態（収集状況）を即座に表示
  - 収集状況の変更を自動的にLocalStorageに保存
  - ログイン後はFirestoreと同期（Server Wins戦略）
  - オフラインキャッシュとして機能

### Changed
- `hooks/useCollection.ts`: 
  - 起動時にLocalStorageから状態を読み込む処理を追加
  - 状態変更時の自動保存処理を一元化（`useEffect`で実装）
  - 手動の`saveToLocalStorage`呼び出しを削除
- `lib/localStorage.ts`:
  - `migrateToFirestore`関数を修正し、既存ユーザーのLocalStorageをキャッシュとして保持
- ドキュメント更新:
  - `docs/3_architecture.md`: データ同期フロー図を追加
  - `docs/4_performance.md`: LocalStorage即時復元機能の説明を追加

### Technical Notes
- **Server Wins戦略**: ローカルとサーバーのデータが異なる場合、Firestoreのデータが優先されます
- **同期タイミング**: ログイン完了後、Firestoreから最新データを取得し、ローカル表示を更新します

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
