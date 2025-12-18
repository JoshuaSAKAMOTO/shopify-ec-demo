// Shopify Types - can be imported on client side

export interface ShopifyImage {
  url: string;
  altText: string | null;
  width: number;
  height: number;
}

export interface ShopifyPrice {
  amount: string;
  currencyCode: string;
}

export interface ShopifyProduct {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  featuredImage: ShopifyImage | null;
  images: {
    nodes: ShopifyImage[];
  };
  priceRange: {
    minVariantPrice: ShopifyPrice;
    maxVariantPrice: ShopifyPrice;
  };
  compareAtPriceRange: {
    minVariantPrice: ShopifyPrice;
    maxVariantPrice: ShopifyPrice;
  };
  variants: {
    nodes: {
      id: string;
      title: string;
      price: ShopifyPrice;
      compareAtPrice: ShopifyPrice | null;
      availableForSale: boolean;
      selectedOptions: {
        name: string;
        value: string;
      }[];
    }[];
  };
  options: {
    name: string;
    values: string[];
  }[];
  tags: string[];
}

export interface ShopifyCollectionListItem {
  id: string;
  handle: string;
  title: string;
  description: string;
  image: ShopifyImage | null;
}

export interface ShopifyCollection extends ShopifyCollectionListItem {
  products: {
    nodes: ShopifyProduct[];
  };
}

export interface CartLine {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    product: {
      id: string;
      title: string;
      handle: string;
      featuredImage: ShopifyImage | null;
    };
    price: ShopifyPrice;
  };
  cost: {
    totalAmount: ShopifyPrice;
  };
}

export interface Cart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    subtotalAmount: ShopifyPrice;
    totalAmount: ShopifyPrice;
    totalTaxAmount: ShopifyPrice | null;
  };
  lines: {
    nodes: CartLine[];
  };
}

// Helper: Format price - safe for client-side use
export function formatPrice(price: ShopifyPrice): string {
  const amount = parseFloat(price.amount);
  return new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: price.currencyCode,
  }).format(amount);
}
