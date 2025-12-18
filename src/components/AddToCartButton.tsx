"use client";

import { useCart } from "@/context/CartContext";
import { useState } from "react";

interface AddToCartButtonProps {
  variantId: string;
  availableForSale?: boolean;
  className?: string;
}

export default function AddToCartButton({
  variantId,
  availableForSale = true,
  className = "",
}: AddToCartButtonProps) {
  const { addToCart, isLoading } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = async () => {
    await addToCart(variantId, quantity);
  };

  if (!availableForSale) {
    return (
      <button
        disabled
        className={`w-full bg-gray-300 text-gray-500 py-3 rounded cursor-not-allowed ${className}`}
      >
        Out of Stock
      </button>
    );
  }

  return (
    <div className="space-y-3">
      {/* Quantity Selector */}
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium">Quantity:</span>
        <div className="flex items-center border border-border rounded">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-3 py-2 hover:bg-gray-100 transition-colors"
            aria-label="Decrease quantity"
          >
            -
          </button>
          <span className="px-4 py-2 border-x border-border min-w-[50px] text-center">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="px-3 py-2 hover:bg-gray-100 transition-colors"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        disabled={isLoading}
        className={`w-full bg-accent text-white py-3 rounded hover:bg-accent-light transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      >
        {isLoading ? "Adding..." : "Add to Cart"}
      </button>
    </div>
  );
}
