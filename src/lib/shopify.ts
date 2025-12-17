import { createStorefrontApiClient } from "@shopify/storefront-api-client";

const domain = process.env.SHOPIFY_STORE_DOMAIN!;
const accessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!;

export const shopifyClient = createStorefrontApiClient({
  storeDomain: domain,
  apiVersion: "2025-01",
  publicAccessToken: accessToken,
});

// Test query to verify connection
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
