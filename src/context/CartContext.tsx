"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useTransition,
  ReactNode,
} from "react";
import { Cart } from "@/lib/shopify";
import {
  addItemToCart,
  updateItemQuantity,
  removeItem,
  getCurrentCart,
} from "@/lib/cart-actions";

interface CartContextType {
  cart: Cart | null;
  isLoading: boolean;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (variantId: string, quantity?: number) => Promise<void>;
  updateQuantity: (lineId: string, quantity: number) => Promise<void>;
  removeFromCart: (lineId: string) => Promise<void>;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const refreshCart = useCallback(async () => {
    const currentCart = await getCurrentCart();
    setCart(currentCart);
  }, []);

  useEffect(() => {
    refreshCart();
  }, [refreshCart]);

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);

  const addToCart = useCallback(
    async (variantId: string, quantity: number = 1) => {
      startTransition(async () => {
        const updatedCart = await addItemToCart(variantId, quantity);
        setCart(updatedCart);
        setIsCartOpen(true);
      });
    },
    []
  );

  const updateQuantity = useCallback(
    async (lineId: string, quantity: number) => {
      startTransition(async () => {
        const updatedCart = await updateItemQuantity(lineId, quantity);
        setCart(updatedCart);
      });
    },
    []
  );

  const removeFromCart = useCallback(async (lineId: string) => {
    startTransition(async () => {
      const updatedCart = await removeItem(lineId);
      setCart(updatedCart);
    });
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        isLoading: isPending,
        isCartOpen,
        openCart,
        closeCart,
        addToCart,
        updateQuantity,
        removeFromCart,
        refreshCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
