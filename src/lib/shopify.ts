import { createStorefrontApiClient } from "@shopify/storefront-api-client";

const domain = process.env.SHOPIFY_STORE_DOMAIN!;
const accessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!;

export const shopifyClient = createStorefrontApiClient({
  storeDomain: domain,
  apiVersion: "2025-01",
  publicAccessToken: accessToken,
});

// Types
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

// Fragments
const PRODUCT_FRAGMENT = `
  fragment ProductFields on Product {
    id
    handle
    title
    description
    descriptionHtml
    featuredImage {
      url
      altText
      width
      height
    }
    images(first: 10) {
      nodes {
        url
        altText
        width
        height
      }
    }
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
      maxVariantPrice {
        amount
        currencyCode
      }
    }
    compareAtPriceRange {
      minVariantPrice {
        amount
        currencyCode
      }
      maxVariantPrice {
        amount
        currencyCode
      }
    }
    variants(first: 50) {
      nodes {
        id
        title
        price {
          amount
          currencyCode
        }
        compareAtPrice {
          amount
          currencyCode
        }
        availableForSale
        selectedOptions {
          name
          value
        }
      }
    }
    options {
      name
      values
    }
    tags
  }
`;

// Shop info
export async function getShopInfo() {
  const query = `
    query {
      shop {
        name
        description
      }
    }
  `;

  const { data, errors } = await shopifyClient.request(query);

  if (errors) {
    throw new Error(errors.message || "Failed to fetch shop info");
  }

  return data?.shop;
}

// Get all products
export async function getProducts(first: number = 20): Promise<ShopifyProduct[]> {
  const query = `
    ${PRODUCT_FRAGMENT}
    query GetProducts($first: Int!) {
      products(first: $first) {
        nodes {
          ...ProductFields
        }
      }
    }
  `;

  const { data, errors } = await shopifyClient.request(query, {
    variables: { first },
  });

  if (errors) {
    throw new Error(errors.message || "Failed to fetch products");
  }

  return data?.products?.nodes || [];
}

// Get single product by handle
export async function getProductByHandle(handle: string): Promise<ShopifyProduct | null> {
  const query = `
    ${PRODUCT_FRAGMENT}
    query GetProductByHandle($handle: String!) {
      product(handle: $handle) {
        ...ProductFields
      }
    }
  `;

  const { data, errors } = await shopifyClient.request(query, {
    variables: { handle },
  });

  if (errors) {
    throw new Error(errors.message || "Failed to fetch product");
  }

  return data?.product || null;
}

// Get all collections
export async function getCollections(first: number = 10): Promise<ShopifyCollectionListItem[]> {
  const query = `
    query GetCollections($first: Int!) {
      collections(first: $first) {
        nodes {
          id
          handle
          title
          description
          image {
            url
            altText
            width
            height
          }
        }
      }
    }
  `;

  const { data, errors } = await shopifyClient.request(query, {
    variables: { first },
  });

  if (errors) {
    throw new Error(errors.message || "Failed to fetch collections");
  }

  return data?.collections?.nodes || [];
}

// Get collection by handle with products
export async function getCollectionByHandle(handle: string, productCount: number = 20): Promise<ShopifyCollection | null> {
  const query = `
    ${PRODUCT_FRAGMENT}
    query GetCollectionByHandle($handle: String!, $productCount: Int!) {
      collection(handle: $handle) {
        id
        handle
        title
        description
        image {
          url
          altText
          width
          height
        }
        products(first: $productCount) {
          nodes {
            ...ProductFields
          }
        }
      }
    }
  `;

  const { data, errors } = await shopifyClient.request(query, {
    variables: { handle, productCount },
  });

  if (errors) {
    throw new Error(errors.message || "Failed to fetch collection");
  }

  return data?.collection || null;
}

// Helper: Format price
export function formatPrice(price: ShopifyPrice): string {
  const amount = parseFloat(price.amount);
  return new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: price.currencyCode,
  }).format(amount);
}
