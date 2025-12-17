# Shopify Headless E-commerce Demo

A headless e-commerce demo built with Next.js and Shopify Storefront API.

## Prerequisites

- **Node.js**: v24.12.0 (use [nvm](https://github.com/nvm-sh/nvm) or [fnm](https://github.com/Schniz/fnm) for version management)
- **npm**: v10.x or later
- **Git**: Latest version

### Verify Node.js Version

```bash
# Install fnm (recommended) or nvm first, then:
fnm use
# or
nvm use
```

This will automatically use the version specified in `.nvmrc`.

## Getting Started

### 1. Clone the repository

```bash
git clone git@github.com:JoshuaSAKAMOTO/shopify-ec-demo.git
cd shopify-ec-demo
```

### 2. Set Node.js version

```bash
fnm use   # or: nvm use
```

If the required version is not installed:

```bash
fnm install   # or: nvm install
```

### 3. Install dependencies

```bash
npm install
```

### 4. Set up environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local` with the actual values (get these from your team):

```env
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-storefront-access-token
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Setup Checklist

Before starting development, verify:

- [ ] Node.js version matches `.nvmrc` (`node -v` should show `v24.12.0`)
- [ ] All dependencies installed without errors (`npm install`)
- [ ] `.env.local` file created with valid credentials
- [ ] Development server starts without errors (`npm run dev`)
- [ ] You can access the app in browser at `http://localhost:3000`

## Project Structure

```
├── src/
│   └── app/          # Next.js App Router pages
├── public/           # Static assets
├── docs/             # Project documentation
├── .env.example      # Environment variable template
├── .nvmrc            # Node.js version specification
├── .editorconfig     # Editor configuration
└── .gitattributes    # Git line ending configuration
```

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **E-commerce**: Shopify Storefront API
- **API Client**: [@shopify/storefront-api-client](https://www.npmjs.com/package/@shopify/storefront-api-client)

## Branch Strategy

```
main                       ← Production-ready code
├── feature/product-list   ← Feature branches
├── feature/cart
└── feature/checkout
```

1. Create a feature branch from `main`
2. Make changes and commit
3. Open a Pull Request
4. Merge after review

## Troubleshooting

### Port already in use

If port 3000 is occupied, Next.js will automatically use another port (e.g., 3001).

### Node version mismatch

```bash
fnm install 24.12.0   # or: nvm install 24.12.0
fnm use               # or: nvm use
```

### Missing environment variables

Ensure `.env.local` exists and contains valid Shopify credentials. Contact your team lead for the values.

## Resources

- [Shopify Storefront API Docs](https://shopify.dev/docs/api/storefront)
- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Commerce (Reference Implementation)](https://github.com/vercel/commerce)
