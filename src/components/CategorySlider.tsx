"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

interface Category {
  name: string;
  href: string;
  image: string;
}

interface CategorySliderProps {
  title?: string;
  description?: string;
  categories: Category[];
}

export default function CategorySlider({
  title = "Explore Our Collection",
  description = "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do Eiusmod Tempor Incididunt",
  categories,
}: CategorySliderProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12">
          {/* Left: Title and Description */}
          <div className="max-w-sm">
            {/* Decorative Leaf */}
            <svg
              className="w-20 h-20 text-accent mb-4"
              viewBox="0 0 80 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M40 10 C20 20, 10 40, 20 60 C30 50, 40 40, 50 30"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
              />
              <path
                d="M45 15 C60 25, 65 45, 55 60"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
              />
              <path
                d="M25 45 L35 35 M30 50 L40 40 M35 55 L45 45"
                stroke="currentColor"
                strokeWidth="1"
              />
            </svg>

            <h2 className="font-heading text-4xl md:text-5xl text-foreground mb-4 italic">
              {title}
            </h2>
            <p className="text-muted text-sm leading-relaxed">
              {description}
            </p>

            {/* Navigation Arrows */}
            <div className="flex gap-3 mt-8">
              <button
                onClick={() => scroll("left")}
                aria-label="Previous"
                className="w-12 h-12 rounded-full border border-foreground flex items-center justify-center hover:bg-foreground hover:text-white transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>
              <button
                onClick={() => scroll("right")}
                aria-label="Next"
                className="w-12 h-12 rounded-full border border-foreground flex items-center justify-center hover:bg-foreground hover:text-white transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right: Category Cards */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 -mr-4 pr-4 md:mr-0 md:pr-0"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="flex-shrink-0 group"
              >
                <div className="relative w-64 h-80 md:w-72 md:h-96 overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <p className="text-center text-sm tracking-wider mt-4 text-foreground">
                  {category.name}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
