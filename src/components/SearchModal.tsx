"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { searchProducts, formatPrice, ShopifyProduct } from "@/lib/shopify";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ShopifyProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSearch = useCallback(async (searchQuery: string) => {
    if (searchQuery.length < 2) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    try {
      const products = await searchProducts(searchQuery, 6);
      setResults(products);
    } catch {
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const debounce = setTimeout(() => {
      handleSearch(query);
    }, 300);

    return () => clearTimeout(debounce);
  }, [query, handleSearch]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      onClose();
    }
  };

  const handleProductClick = () => {
    setQuery("");
    setResults([]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-x-0 top-0 z-50 bg-white shadow-xl">
        <div className="max-w-4xl mx-auto p-4">
          {/* Search Input */}
          <form onSubmit={handleSubmit} className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full px-4 py-3 pr-20 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-lg"
              autoFocus
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="p-2 text-muted hover:text-foreground"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                className="p-2 text-muted hover:text-foreground"
              >
                <span className="text-sm">ESC</span>
              </button>
            </div>
          </form>

          {/* Results */}
          <div className="mt-4 max-h-[60vh] overflow-y-auto">
            {isLoading && (
              <div className="text-center py-8 text-muted">
                Searching...
              </div>
            )}

            {!isLoading && query.length >= 2 && results.length === 0 && (
              <div className="text-center py-8 text-muted">
                No products found for &quot;{query}&quot;
              </div>
            )}

            {!isLoading && results.length > 0 && (
              <div className="space-y-4">
                <p className="text-sm text-muted">
                  {results.length} product{results.length > 1 ? "s" : ""} found
                </p>
                <ul className="grid gap-4">
                  {results.map((product) => (
                    <li key={product.id}>
                      <Link
                        href={`/products/${product.handle}`}
                        onClick={handleProductClick}
                        className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="relative w-16 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                          {product.featuredImage ? (
                            <Image
                              src={product.featuredImage.url}
                              alt={product.title}
                              fill
                              className="object-cover"
                              sizes="64px"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                              No image
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-foreground truncate">
                            {product.title}
                          </h3>
                          <p className="text-sm text-accent">
                            {formatPrice(product.priceRange.minVariantPrice)}
                          </p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>

                {query.trim() && (
                  <button
                    onClick={handleSubmit}
                    className="w-full py-3 text-center text-accent hover:text-accent-light border-t border-border"
                  >
                    View all results for &quot;{query}&quot;
                  </button>
                )}
              </div>
            )}

            {!isLoading && query.length < 2 && (
              <div className="text-center py-8 text-muted">
                Type at least 2 characters to search
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
