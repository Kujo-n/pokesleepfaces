# ポケモンスリープ 寝顔図鑑

ポケモンスリープの寝顔コレクションを管理するWebアプリケーションです。

## 重要な仕様について

### 寝顔数のカウント方法

**このWebアプリと公式ポケモンスリープアプリでは、フィールド別の寝顔数に差異があります。**

- **公式アプリ**: ダークライやホリデーイーブイなどの**期間限定ポケモンの寝顔は、フィールド別の寝顔数にカウントされません**
- **このWebアプリ**: すべてのポケモン（期間限定を含む）の寝顔を**フィールド別の寝顔数にカウントします**

この差異は仕様であり、バグではありません。このWebアプリでは、期間限定ポケモンも含めた完全な寝顔コレクションの管理を目的としています。

## 主な機能

- 寝顔コレクションの記録・管理
- フィールド別フィルタリング
- 睡眠タイプ別フィルタリング（うとうと・すやすや・ぐっすり）
- 未収集のみ表示
- 進捗状況の可視化
- Firebaseによるデータ同期（ログイン時）
- ローカルストレージによるオフライン対応（ゲストユーザー）



## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
