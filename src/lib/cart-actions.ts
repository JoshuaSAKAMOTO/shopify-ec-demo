"use server";

import { cookies } from "next/headers";
import {
  createCart,
  getCart,
  addToCart,
  updateCartLines,
  removeFromCart,
  Cart,
} from "./shopify";

const CART_COOKIE_NAME = "shopify_cart_id";

export async function getOrCreateCart(): Promise<Cart> {
  const cookieStore = await cookies();
  const cartId = cookieStore.get(CART_COOKIE_NAME)?.value;

  if (cartId) {
    const existingCart = await getCart(cartId);
    if (existingCart) {
      return existingCart;
    }
  }

  // Create new cart
  const newCart = await createCart();
  cookieStore.set(CART_COOKIE_NAME, newCart.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return newCart;
}

export async function addItemToCart(
  variantId: string,
  quantity: number = 1
): Promise<Cart> {
  const cart = await getOrCreateCart();
  return addToCart(cart.id, [{ merchandiseId: variantId, quantity }]);
}

export async function updateItemQuantity(
  lineId: string,
  quantity: number
): Promise<Cart | null> {
  const cookieStore = await cookies();
  const cartId = cookieStore.get(CART_COOKIE_NAME)?.value;

  if (!cartId) return null;

  if (quantity <= 0) {
    return removeFromCart(cartId, [lineId]);
  }

  return updateCartLines(cartId, [{ id: lineId, quantity }]);
}

export async function removeItem(lineId: string): Promise<Cart | null> {
  const cookieStore = await cookies();
  const cartId = cookieStore.get(CART_COOKIE_NAME)?.value;

  if (!cartId) return null;

  return removeFromCart(cartId, [lineId]);
}

export async function getCurrentCart(): Promise<Cart | null> {
  const cookieStore = await cookies();
  const cartId = cookieStore.get(CART_COOKIE_NAME)?.value;

  if (!cartId) return null;

  return getCart(cartId);
}
