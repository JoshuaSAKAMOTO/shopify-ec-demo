"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";

interface Variant {
  id: string;
  title: string;
  availableForSale: boolean;
}

interface ProductInfoProps {
  title: string;
  rating: number;
  reviewCount: number;
  price: string;
  compareAtPrice?: string;
  discountPercentage?: number;
  description: string;
  sizes?: string[];
  variants?: Variant[];
  checkoutUrl?: string;
}

export default function ProductInfo({
  title,
  rating,
  reviewCount,
  price,
  compareAtPrice,
  discountPercentage,
  description,
  sizes = [],
  variants = [],
  checkoutUrl,
}: ProductInfoProps) {
  const [selectedSize, setSelectedSize] = useState(sizes[0] || "");
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const { addToCart, isLoading } = useCart();

  // Find the selected variant based on size
  const selectedVariant = variants.find((v) =>
    v.title === selectedSize || v.title === "Default Title"
  ) || variants[0];

  const handleAddToCart = async () => {
    if (selectedVariant) {
      await addToCart(selectedVariant.id, quantity);
    }
  };

  const handleBuyNow = async () => {
    if (selectedVariant) {
      await addToCart(selectedVariant.id, quantity);
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      }
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  const toggleAccordion = (section: string) => {
    setOpenAccordion(openAccordion === section ? null : section);
  };

  return (
    <div className="space-y-6">
      {/* Title and Actions */}
      <div className="flex items-start justify-between">
        <h1 className="font-heading text-2xl md:text-3xl text-foreground">
          {title}
        </h1>
        <div className="flex gap-2">
          <button aria-label="Add to wishlist" className="p-2 hover:text-accent">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
          </button>
          <button aria-label="Share" className="p-2 hover:text-accent">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-2">
        <div className="flex">{renderStars(rating)}</div>
        <span className="text-sm text-muted">{rating}</span>
        <span className="text-sm text-muted">|</span>
        <span className="text-sm text-accent">{reviewCount} Reviews</span>
      </div>

      {/* Price */}
      <div className="flex items-center gap-3">
        <span className="text-xl font-semibold text-foreground">{price}</span>
        {compareAtPrice && (
          <span className="text-muted line-through">{compareAtPrice}</span>
        )}
        {discountPercentage && (
          <span className="text-accent">({discountPercentage}% Off)</span>
        )}
      </div>

      <p className="text-xs text-muted">Inclusive Of All Taxes</p>

      {/* Description */}
      <p className="text-sm text-muted leading-relaxed">
        {description}{" "}
        <button className="text-accent hover:underline">Read More</button>
      </p>

      {/* Size Selector */}
      {sizes.length > 0 && (
        <div>
          <p className="text-sm text-foreground mb-3">
            Size: <span className="text-muted">({selectedSize})</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 text-sm border rounded-full transition-colors ${
                  selectedSize === size
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-border text-foreground hover:border-accent"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity */}
      <div>
        <p className="text-sm text-foreground mb-3">Quantity</p>
        <div className="inline-flex items-center border border-border rounded">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-4 py-2 text-foreground hover:bg-gray-100"
          >
            −
          </button>
          <span className="px-4 py-2 text-foreground min-w-[50px] text-center">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="px-4 py-2 text-foreground hover:bg-gray-100"
          >
            +
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={handleBuyNow}
          disabled={isLoading || !selectedVariant?.availableForSale}
          className="flex-1 bg-accent text-white py-3 px-6 text-sm tracking-wider hover:bg-accent-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "PROCESSING..." : "BUY NOW"}
        </button>
        <button
          onClick={handleAddToCart}
          disabled={isLoading || !selectedVariant?.availableForSale}
          className="flex-1 border border-foreground text-foreground py-3 px-6 text-sm tracking-wider hover:bg-foreground hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "ADDING..." : selectedVariant?.availableForSale ? "ADD TO CART" : "OUT OF STOCK"}
        </button>
      </div>

      {/* Accordion Sections */}
      <div className="border-t border-border pt-4 space-y-0">
        {["Metaphysical Properties", "Features"].map((section) => (
          <div key={section} className="border-b border-border">
            <button
              onClick={() => toggleAccordion(section)}
              className="w-full flex items-center justify-between py-4 text-sm text-foreground"
            >
              <span>{section}</span>
              <svg
                className={`w-5 h-5 transition-transform ${
                  openAccordion === section ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openAccordion === section && (
              <div className="pb-4 text-sm text-muted">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
