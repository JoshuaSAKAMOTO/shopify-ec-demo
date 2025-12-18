# Project Architecture / プロジェクト構成

## Website Structure / サイト構成

```
Home (/)
├── Header
│   ├── Top Bar (Location, Contact, Virtual Appointment)
│   ├── Logo (Mediation Craft)
│   └── Navigation (Crystals, Meditation Cushions, Wellness, etc.)
├── Hero Section (Full-width banner)
├── Category Slider (Explore Our Collection)
├── New Arrivals (Product grid)
├── Feature Sections (Alternating image/text)
└── Footer

Product Detail (/products/[handle])
├── Header
├── Breadcrumb
├── Product Section
│   ├── Product Gallery (Thumbnails + Main image)
│   └── Product Info (Title, Price, Size, Quantity, Buttons)
├── Product Tabs (Healing info, How to use, Reviews)
├── Related Products
└── Footer

Collections (/collections/[handle]) - TODO
├── Header
├── Hero Section
├── Filter Sidebar
├── Product Grid
└── Footer
```

---

## Directory Structure / ディレクトリ構成

```
shopify-ec-demo/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── layout.tsx                # Root layout (fonts, metadata)
│   │   ├── page.tsx                  # Home page
│   │   ├── globals.css               # Global styles & Tailwind config
│   │   └── products/
│   │       └── [handle]/
│   │           └── page.tsx          # Product detail page
│   │
│   ├── components/                   # Reusable UI components
│   │   ├── Header.tsx                # Site header with navigation
│   │   ├── Footer.tsx                # Site footer
│   │   ├── Hero.tsx                  # Full-width hero banner
│   │   ├── CategorySlider.tsx        # Horizontal category cards
│   │   ├── NewArrivals.tsx           # Product grid section
│   │   ├── ProductCard.tsx           # Individual product card
│   │   ├── FeatureSection.tsx        # Image/text alternating section
│   │   ├── Breadcrumb.tsx            # Navigation breadcrumb
│   │   ├── ProductGallery.tsx        # Product image gallery
│   │   ├── ProductInfo.tsx           # Product details & actions
│   │   ├── ProductTabs.tsx           # Tabbed content section
│   │   └── RelatedProducts.tsx       # Related products slider
│   │
│   └── lib/
│       └── shopify.ts                # Shopify Storefront API client
│
├── designs/                          # Design reference files (gitignored)
│   ├── full/                         # Full page screenshots
│   └── sections/                     # Section screenshots
│
├── docs/                             # Documentation
│   ├── shopify-headless-guide.md     # Shopify setup guide
│   └── architecture.md               # This file
│
├── public/                           # Static assets
│
├── .env.local                        # Environment variables (gitignored)
├── .env.example                      # Environment template
├── .nvmrc                            # Node.js version (24.12.0)
├── .editorconfig                     # Editor settings
├── .gitattributes                    # Git line ending config
├── next.config.ts                    # Next.js configuration
├── tailwind.config.ts                # Tailwind CSS (if needed)
├── tsconfig.json                     # TypeScript configuration
└── package.json                      # Dependencies & scripts
```

---

## Component Overview / コンポーネント一覧

| Component | Description (EN) | 説明 (JP) |
|-----------|------------------|-----------|
| `Header` | Two-row navigation with mobile menu | 2段ナビゲーション（モバイルメニュー対応） |
| `Footer` | Multi-column footer with social links | 4カラムフッター（SNSリンク付き） |
| `Hero` | Full-width banner with overlay text | 全幅バナー（オーバーレイテキスト） |
| `CategorySlider` | Horizontal scrollable category cards | 横スクロールカテゴリカード |
| `NewArrivals` | Product grid with "View More" button | 商品グリッド（もっと見るボタン付き） |
| `ProductCard` | Individual product display card | 商品カード |
| `FeatureSection` | Alternating image/text layout | 画像/テキスト交互レイアウト |
| `Breadcrumb` | Navigation breadcrumb trail | パンくずナビ |
| `ProductGallery` | Thumbnail + main image gallery | サムネイル付き画像ギャラリー |
| `ProductInfo` | Product details, price, size, quantity | 商品詳細、価格、サイズ、数量 |
| `ProductTabs` | Tabbed content sections | タブ切り替えコンテンツ |
| `RelatedProducts` | Horizontal related products slider | 関連商品スライダー |

---

## Tech Stack / 技術スタック

| Category | Technology |
|----------|------------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Fonts | Geist (body), Cormorant Garamond (headings) |
| E-commerce | Shopify Storefront API |
| API Client | @shopify/storefront-api-client |

---

## Color Palette / カラーパレット

| Variable | Value | Usage (EN) | 用途 (JP) |
|----------|-------|------------|-----------|
| `--background` | `#F5F3F0` | Page background | ページ背景 |
| `--foreground` | `#333333` | Main text | メインテキスト |
| `--accent` | `#3D7A8C` | Links, buttons, logo | リンク、ボタン、ロゴ |
| `--accent-light` | `#5A9AAD` | Hover states | ホバー状態 |
| `--muted` | `#666666` | Secondary text | サブテキスト |
| `--border` | `#E5E0DB` | Borders | ボーダー |
| `--footer-bg` | `#E8E0DC` | Footer background | フッター背景 |
| `--card-bg` | `#FAFAFA` | Card backgrounds | カード背景 |

---

## Pages Status / ページ実装状況

| Page | Route | Status |
|------|-------|--------|
| Home | `/` | ✅ Complete |
| Product Detail | `/products/[handle]` | ✅ Complete |
| Collection List | `/collections/[handle]` | 🔲 TODO |
| Cart | `/cart` | 🔲 TODO |
| Search | `/search` | 🔲 TODO |

---

## Environment Variables / 環境変数

```env
# Shopify store domain (xxx.myshopify.com format)
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com

# Headless channel public access token
SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-token
```

---

## Getting Started / 開始方法

```bash
# Clone the repository
git clone git@github.com:JoshuaSAKAMOTO/shopify-ec-demo.git
cd shopify-ec-demo

# Use correct Node.js version
fnm use  # or: nvm use

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with actual values

# Start development server
npm run dev
```

Open http://localhost:3000 in your browser.
