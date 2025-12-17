# Shopify ヘッドレス開発ガイド（Next.js）

## 概要

- **目的**: 学習用のShopifyヘッドレス開発環境構築
- **構成**: Next.js + Shopify Storefront API
- **人数**: 2人での共同開発
- **費用**: 無料（Shopify Partner Programを利用）

---

## 1. Shopify開発環境のセットアップ

### Shopify Partner Program（無料）

1. [Shopify Partners](https://www.shopify.com/partners) にアクセス
2. 無料アカウントを作成
3. ダッシュボードから「開発ストアを作成」

> 開発ストアは無制限に作成可能。全機能をテストできる。

### チームメンバーの招待

**方法A: 開発ストア単位で招待**
1. 開発ストアの管理画面にログイン
2. 設定 → ユーザーと権限
3. 「スタッフを追加」→ メールアドレス入力 → 権限設定 → 招待送信

**方法B: Partnerアカウント全体で共有**
1. Partnerダッシュボード → 設定 → アカウント → チームを管理
2. チームメンバーを招待（全開発ストアへのアクセス権付与可能）

---

## 2. 学習ロードマップ

### Phase 1: 基礎固め（1〜2週間）
- [ ] Shopifyの基本概念を理解（商品、コレクション、カート、チェックアウト）
- [ ] GraphQLの基礎学習
- [ ] 開発ストアにテスト用商品データを登録

### Phase 2: Storefront API を理解（1〜2週間）
- [ ] Storefront APIの仕組みを学ぶ
- [ ] GraphiQL（Shopify GraphiQL App）でクエリを試す
- [ ] 商品取得、カート操作、チェックアウト作成を実践

### Phase 3: フロントエンド構築（2〜4週間）
- [ ] Next.jsプロジェクトのセットアップ
- [ ] 商品一覧ページ
- [ ] 商品詳細ページ（動的ルーティング）
- [ ] カート機能
- [ ] チェックアウトへのリダイレクト

### Phase 4: 発展
- [ ] Customer Account API（顧客ログイン）
- [ ] Shopify Functions（カスタムロジック）
- [ ] Webhook連携

---

## 3. Next.js プロジェクトセットアップ

### Storefront APIのアクセス設定

1. 開発ストアの管理画面 → 設定 → アプリと販売チャネル → アプリを開発
2. 「アプリを作成」
3. Storefront APIのアクセススコープを設定
4. **Storefront APIのアクセストークンを取得**（後で使用）

### プロジェクト作成

```bash
npx create-next-app@latest my-shopify-store
cd my-shopify-store
```

### ライブラリインストール

```bash
npm install @shopify/storefront-api-client
```

### 環境変数の設定

`.env.local` を作成:

```env
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-storefront-access-token
```

> ⚠️ `.env.local` は `.gitignore` に追加済みであることを確認

---

## 4. GitHub での共同開発

### リポジトリセットアップ

1. GitHubでリポジトリ作成（Private推奨）
2. 相手をCollaboratorに招待（Settings → Collaborators）

### .gitignore に含めるもの

```
.env.local
.env*.local
node_modules/
```

### ブランチ運用

```
main                       ← マージ先（本番相当）
├── feature/product-list   ← 機能ごとにブランチ作成
├── feature/cart
└── feature/checkout
```

### 開発フロー

1. `main` から feature ブランチを作成
2. 作業完了後、Pull Request を作成
3. レビュー後 `main` にマージ

### 環境変数の共有

`.env.local` はGitにコミットしないため、以下の方法で共有:
- Notionやセキュアなチャットで直接共有
- Vercelにデプロイする場合は、Vercel側で環境変数を設定

---

## 5. 参考リソース

- [Shopify Partners](https://www.shopify.com/partners)
- [Storefront API ドキュメント](https://shopify.dev/docs/api/storefront)
- [Vercel Commerce（Next.js + Shopify実装例）](https://github.com/vercel/commerce)
- [Shopify GraphiQL App](https://shopify.dev/docs/apps/tools/graphiql-admin-api)

---

## 6. 実装の優先順位

1. **商品一覧の取得・表示** ← まずここから
2. 商品詳細ページ
3. カート機能
4. チェックアウト連携

---

## 備考

- Storefront APIはRESTではなく**GraphQL**がメイン
- チェックアウトはShopifyホスト型を使用（セキュリティ的に推奨）
- 困ったらShopify公式ドキュメントとVercel Commerceのコードを参照
