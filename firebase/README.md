# サービスアカウントキー

このディレクトリにはFirebase Admin SDKで使用するサービスアカウントキーを配置します。

## ⚠️ セキュリティ警告

**サービスアカウントキーは機密情報です。絶対にGitにコミットしないでください。**

## ファイル配置

```
firebase/
├── firestore.rules
└── serviceAccountKey.json  ← ここに配置（Gitignore対象）
```

## 取得方法

1. [Firebase Console](https://console.firebase.google.com/) を開く
2. プロジェクト設定 → サービスアカウント
3. 「新しい秘密鍵の生成」をクリック
4. ダウンロードしたJSONファイルを `firebase/serviceAccountKey.json` として保存

## 使用方法

```bash
# 環境変数に設定
export GOOGLE_APPLICATION_CREDENTIALS="$(pwd)/firebase/serviceAccountKey.json"

# データコピースクリプト実行
npm run copy:user <userId> staging
```

## セキュリティベストプラクティス

- ✅ `.gitignore` に追加済み
- ✅ 定期的にローテーション（90日ごと推奨）
- ✅ 不要になったら Firebase Console から削除
- ✅ パスワード管理ツールでバックアップ
