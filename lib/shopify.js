import Client from "shopify-buy";

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken =
  process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

const client =
  domain && storefrontAccessToken
    ? Client.buildClient({
        domain,
        storefrontAccessToken,
      })
    : null;

function requireClient() {
  if (!client) {
    throw new Error(
      "Missing Shopify credentials. Add NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN and NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN to .env.local.",
    );
  }

  return client;
}

export async function getAllProducts() {
  return await requireClient().product.fetchAll();
}

export async function getProductByHandle(handle) {
  return await requireClient().product.fetchByHandle(handle);
}

export async function createCheckout() {
  return await requireClient().checkout.create();
}

export async function addLineItems(checkoutId, lineItems) {
  return await requireClient().checkout.addLineItems(checkoutId, lineItems);
}

export async function getCheckout(checkoutId) {
  return await requireClient().checkout.fetch(checkoutId);
}
