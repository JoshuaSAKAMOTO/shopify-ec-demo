"use client";

import { useRef } from "react";
import ProductCard from "./ProductCard";

interface Product {
  id: string;
  title: string;
  price: string;
  image: string;
  href: string;
}

interface RelatedProductsProps {
  title?: string;
  products: Product[];
}

export default function RelatedProducts({
  title = "Related Products",
  products,
}: RelatedProductsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-heading text-2xl md:text-3xl text-foreground italic">
            {title}
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => scroll("left")}
              aria-label="Previous"
              className="w-10 h-10 rounded-full border border-foreground flex items-center justify-center hover:bg-foreground hover:text-white transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button
              onClick={() => scroll("right")}
              aria-label="Next"
              className="w-10 h-10 rounded-full border border-foreground flex items-center justify-center hover:bg-foreground hover:text-white transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>

        {/* Products Slider */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {products.map((product) => (
            <div key={product.id} className="flex-shrink-0 w-64">
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
