import { createStorefrontApiClient } from "@shopify/storefront-api-client";

// Re-export types for convenience (server-side imports)
export type {
  ShopifyImage,
  ShopifyPrice,
  ShopifyProduct,
  ShopifyCollectionListItem,
  ShopifyCollection,
  CartLine,
  Cart,
} from "./shopify-types";
export { formatPrice } from "./shopify-types";

// Import types for internal use
import type {
  ShopifyProduct,
  ShopifyCollectionListItem,
  ShopifyCollection,
  Cart,
} from "./shopify-types";

const domain = process.env.SHOPIFY_STORE_DOMAIN!;
const accessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!;

export const shopifyClient = createStorefrontApiClient({
  storeDomain: domain,
  apiVersion: "2025-01",
  publicAccessToken: accessToken,
});

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

// Cart Fragment
const CART_FRAGMENT = `
  fragment CartFields on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      subtotalAmount {
        amount
        currencyCode
      }
      totalAmount {
        amount
        currencyCode
      }
      totalTaxAmount {
        amount
        currencyCode
      }
    }
    lines(first: 100) {
      nodes {
        id
        quantity
        merchandise {
          ... on ProductVariant {
            id
            title
            product {
              id
              title
              handle
              featuredImage {
                url
                altText
                width
                height
              }
            }
            price {
              amount
              currencyCode
            }
          }
        }
        cost {
          totalAmount {
            amount
            currencyCode
          }
        }
      }
    }
  }
`;

// Create a new cart
export async function createCart(): Promise<Cart> {
  const mutation = `
    ${CART_FRAGMENT}
    mutation CreateCart {
      cartCreate {
        cart {
          ...CartFields
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const { data, errors } = await shopifyClient.request(mutation);

  if (errors) {
    throw new Error(errors.message || "Failed to create cart");
  }

  if (data?.cartCreate?.userErrors?.length > 0) {
    throw new Error(data.cartCreate.userErrors[0].message);
  }

  return data?.cartCreate?.cart;
}

// Get cart by ID
export async function getCart(cartId: string): Promise<Cart | null> {
  const query = `
    ${CART_FRAGMENT}
    query GetCart($cartId: ID!) {
      cart(id: $cartId) {
        ...CartFields
      }
    }
  `;

  const { data, errors } = await shopifyClient.request(query, {
    variables: { cartId },
  });

  if (errors) {
    throw new Error(errors.message || "Failed to fetch cart");
  }

  return data?.cart || null;
}

// Add items to cart
export async function addToCart(
  cartId: string,
  lines: { merchandiseId: string; quantity: number }[]
): Promise<Cart> {
  const mutation = `
    ${CART_FRAGMENT}
    mutation AddToCart($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          ...CartFields
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const { data, errors } = await shopifyClient.request(mutation, {
    variables: { cartId, lines },
  });

  if (errors) {
    throw new Error(errors.message || "Failed to add to cart");
  }

  if (data?.cartLinesAdd?.userErrors?.length > 0) {
    throw new Error(data.cartLinesAdd.userErrors[0].message);
  }

  return data?.cartLinesAdd?.cart;
}

// Update cart line quantities
export async function updateCartLines(
  cartId: string,
  lines: { id: string; quantity: number }[]
): Promise<Cart> {
  const mutation = `
    ${CART_FRAGMENT}
    mutation UpdateCartLines($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart {
          ...CartFields
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const { data, errors } = await shopifyClient.request(mutation, {
    variables: { cartId, lines },
  });

  if (errors) {
    throw new Error(errors.message || "Failed to update cart");
  }

  if (data?.cartLinesUpdate?.userErrors?.length > 0) {
    throw new Error(data.cartLinesUpdate.userErrors[0].message);
  }

  return data?.cartLinesUpdate?.cart;
}

// Remove items from cart
export async function removeFromCart(
  cartId: string,
  lineIds: string[]
): Promise<Cart> {
  const mutation = `
    ${CART_FRAGMENT}
    mutation RemoveFromCart($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          ...CartFields
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const { data, errors } = await shopifyClient.request(mutation, {
    variables: { cartId, lineIds },
  });

  if (errors) {
    throw new Error(errors.message || "Failed to remove from cart");
  }

  if (data?.cartLinesRemove?.userErrors?.length > 0) {
    throw new Error(data.cartLinesRemove.userErrors[0].message);
  }

  return data?.cartLinesRemove?.cart;
}

// Search products
export async function searchProducts(
  query: string,
  first: number = 20
): Promise<ShopifyProduct[]> {
  const searchQuery = `
    ${PRODUCT_FRAGMENT}
    query SearchProducts($query: String!, $first: Int!) {
      search(query: $query, first: $first, types: [PRODUCT]) {
        nodes {
          ... on Product {
            ...ProductFields
          }
        }
      }
    }
  `;

  const { data, errors } = await shopifyClient.request(searchQuery, {
    variables: { query, first },
  });

  if (errors) {
    throw new Error(errors.message || "Failed to search products");
  }

  return data?.search?.nodes || [];
}
