"use client";

import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/shopify-types";
import Image from "next/image";
import Link from "next/link";

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    isLoading,
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-semibold">
            Shopping Cart ({cart?.totalQuantity || 0})
          </h2>
          <button
            onClick={closeCart}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close cart"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {!cart || cart.lines.nodes.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <svg
                className="w-16 h-16 text-gray-300 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <p className="text-muted mb-4">Your cart is empty</p>
              <button
                onClick={closeCart}
                className="text-accent hover:text-accent-light underline"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <ul className="space-y-4">
              {cart.lines.nodes.map((line) => (
                <li key={line.id} className="flex gap-4 py-4 border-b border-border">
                  {/* Product Image */}
                  <div className="relative w-20 h-20 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                    {line.merchandise.product.featuredImage ? (
                      <Image
                        src={line.merchandise.product.featuredImage.url}
                        alt={line.merchandise.product.title}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        No image
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/products/${line.merchandise.product.handle}`}
                      onClick={closeCart}
                      className="font-medium text-foreground hover:text-accent line-clamp-2"
                    >
                      {line.merchandise.product.title}
                    </Link>
                    {line.merchandise.title !== "Default Title" && (
                      <p className="text-sm text-muted mt-1">
                        {line.merchandise.title}
                      </p>
                    )}
                    <p className="text-sm font-medium mt-1">
                      {formatPrice(line.merchandise.price)}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(line.id, line.quantity - 1)}
                        disabled={isLoading}
                        className="w-8 h-8 flex items-center justify-center border border-border rounded hover:bg-gray-100 disabled:opacity-50"
                      >
                        -
                      </button>
                      <span className="w-8 text-center">{line.quantity}</span>
                      <button
                        onClick={() => updateQuantity(line.id, line.quantity + 1)}
                        disabled={isLoading}
                        className="w-8 h-8 flex items-center justify-center border border-border rounded hover:bg-gray-100 disabled:opacity-50"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeFromCart(line.id)}
                        disabled={isLoading}
                        className="ml-auto text-sm text-muted hover:text-red-500 disabled:opacity-50"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {cart && cart.lines.nodes.length > 0 && (
          <div className="border-t border-border p-4 space-y-4">
            <div className="flex justify-between text-lg font-semibold">
              <span>Subtotal</span>
              <span>{formatPrice(cart.cost.subtotalAmount)}</span>
            </div>
            <p className="text-sm text-muted">
              Shipping and taxes calculated at checkout.
            </p>
            <a
              href={cart.checkoutUrl}
              className="block w-full bg-accent text-white text-center py-3 rounded hover:bg-accent-light transition-colors font-medium"
            >
              Checkout
            </a>
            <button
              onClick={closeCart}
              className="block w-full text-center py-2 text-accent hover:text-accent-light"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
