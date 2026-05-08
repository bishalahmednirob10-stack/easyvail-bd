# EasyVail BD

EasyVail BD is a Next.js storefront for modest hijab collections, including Namaji, Gola, and Iqra product layouts.

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Shopify Setup

Copy `.env.local.example` to `.env.local` and add your Shopify Storefront credentials:

```bash
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-storefront-token
```

The site also includes a local product catalog in `lib/products.js`, so product photos display before Shopify is connected.
