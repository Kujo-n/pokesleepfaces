# 将来検討: ポケモンデータ自動更新機能

**ステータス**: 将来検討アイテム（MVP範囲外）  
**優先度**: 低（年4回の手動更新で十分）  
**実装方式**: GitHub Actions + JSON編集

---

## 概要

現在は `data/mockData.ts` を手動編集してデプロイしていますが、将来的にJSON形式でデータを管理し、GitHub Actionsで自動デプロイする仕組みを構築します。

---

## 設計

### データ構造

#### 新規ファイル: `data/pokemon.json`

```json
{
  "pokemon": [
    {
      "id": "bulbasaur",
      "dexNumber": 1,
      "name": "フシギダネ",
      "type": "くさ",
      "sleepType": "うとうと",
      "fields": ["ワカクサ本島", "シアンの砂浜"],
      "styles": [
        {
          "id": "bulbasaur-1",
          "name": "すやすや寝",
          "rarity": 1
        },
        {
          "id": "bulbasaur-2",
          "name": "うとうと寝",
          "rarity": 2
        }
      ]
    }
  ],
  "fields": [
    "ワカクサ本島",
    "ワカクサ本島Ex",
    "シアンの砂浜",
    "トープ洞窟",
    "ウノハナ雪原",
    "ラピスラズリ湖畔",
    "ゴールド旧発電所",
    "アンバー渓谷"
  ]
}
```

### ビルドスクリプト

#### `scripts/generate-mock-data.js`

```javascript
const fs = require('fs');
const path = require('path');

// pokemon.jsonを読み込み
const data = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../data/pokemon.json'), 'utf-8')
);

// TypeScript形式で出力
const output = `// このファイルは自動生成されます。直接編集しないでください。
// 編集する場合は data/pokemon.json を更新してください。

export type SleepStyle = {
  id: string;
  name: string;
  rarity: number;
};

export type Pokemon = {
  id: string;
  dexNumber: number;
  name: string;
  type: string;
  sleepType: 'うとうと' | 'すやすや' | 'ぐっすり';
  fields: string[];
  styles: SleepStyle[];
};

export const FIELD_NAMES = ${JSON.stringify(data.fields, null, 2)};

export const MOCK_POKEMON: Pokemon[] = ${JSON.stringify(data.pokemon, null, 2)};
`;

fs.writeFileSync(
  path.join(__dirname, '../data/mockData.ts'),
  output,
  'utf-8'
);

console.log('✅ mockData.ts generated successfully');
```

### GitHub Actions ワークフロー

#### `.github/workflows/update-pokemon.yml`

```yaml
name: Update Pokemon Data

on:
  push:
    paths:
      - 'data/pokemon.json'
    branches:
      - main
  workflow_dispatch:

jobs:
  generate-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
        
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Generate mockData.ts
        run: node scripts/generate-mock-data.js
        
      - name: Commit generated file
        run: |
          git config user.name "GitHub Actions"
          git config user.email "actions@github.com"
          git add data/mockData.ts
          git diff --staged --quiet || git commit -m "chore: auto-generate mockData.ts from pokemon.json"
          git push
        
      - name: Build
        run: npm run build
        
      - name: Deploy to Firebase Hosting
        uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: '${{ secrets.GITHUB_TOKEN }}'
          firebaseServiceAccount: '${{ secrets.FIREBASE_SERVICE_ACCOUNT }}'
          channelId: live
          projectId: your-firebase-project-id
```

---

## 実装タスク

### Phase 1: 準備（1-2時間）

- [ ] `data/pokemon.json` を作成
- [ ] 既存の `mockData.ts` からJSONへデータ移行
- [ ] `scripts/generate-mock-data.js` を実装
- [ ] `package.json` にスクリプト追加: `"generate:data": "node scripts/generate-mock-data.js"`

### Phase 2: 自動化（1-2時間）

- [ ] `.github/workflows/update-pokemon.yml` を作成
- [ ] GitHub Actionsの動作確認
- [ ] テストデータで動作検証

### Phase 3: ドキュメント（30分）

- [ ] `README.md` に更新手順を追記
- [ ] `docs/setup_guide.md` を更新
- [ ] コントリビューションガイドを作成（オプション）

### Phase 4: 検証（30分）

- [ ] 実際にポケモンを1体追加してテスト
- [ ] ビルドエラーがないか確認
- [ ] デプロイが正常に完了するか確認

**合計見積もり時間**: 3-5時間

---

## 使い方（実装後）

### ポケモンを追加する場合

1. GitHubで `data/pokemon.json` を開く
2. 「Edit this file」をクリック
3. 新しいポケモンデータを追加:
   ```json
   {
     "id": "new-pokemon",
     "dexNumber": 999,
     "name": "新ポケモン",
     "type": "ノーマル",
     "sleepType": "すやすや",
     "fields": ["ワカクサ本島"],
     "styles": [...]
   }
   ```
4. 「Commit changes」をクリック
5. 自動的に `mockData.ts` が生成され、デプロイされる

### フィールドを追加する場合

1. `data/pokemon.json` の `fields` 配列に追加
2. コミット
3. 自動デプロイ

---

## メリット

1. ✅ **非エンジニアでも編集可能**
   - GitHub UIから直接編集できる
   - JSON形式で読みやすい

2. ✅ **バージョン管理**
   - Git履歴が残る
   - ロールバックが簡単

3. ✅ **完全自動化**
   - コミットするだけでデプロイ完了
   - 手動ビルド不要

4. ✅ **データ検証**
   - スクリプトでバリデーション追加可能
   - 型安全性を保持

---

## デメリット・注意点

1. ⚠️ **初期実装コスト**
   - 3-5時間の実装時間が必要

2. ⚠️ **JSON編集の学習コスト**
   - カンマやブラケットのミスに注意が必要
   - GitHub UIの使い方を覚える必要がある

3. ⚠️ **GitHub Actionsの理解**
   - トラブル時にActionsログを確認する必要がある

---

## 実装判断基準

以下の条件を満たす場合に実装を検討:

- ✅ 更新頻度が月1回以上になった
- ✅ 非エンジニアがデータ更新を担当する
- ✅ 複数人でデータ更新を行う
- ✅ 手動デプロイが負担になってきた

現時点（年4回更新）では**実装不要**と判断しています。

---

## 代替案

将来的により高度な機能が必要になった場合の選択肢:

1. **Google Sheets連携**
   - より使いやすいUI
   - 実装コスト: 中

2. **管理画面（Web UI）**
   - 専用の入力フォーム
   - プレビュー機能
   - 実装コスト: 高

3. **Firestore移行**
   - リアルタイム更新
   - 複数クライアント対応
   - 実装コスト: 高
