"use client";

import Image from "next/image";
import { useState } from "react";

interface ProductGalleryProps {
  images: {
    src: string;
    alt: string;
  }[];
}

export default function ProductGallery({ images }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className="flex gap-4">
      {/* Thumbnails */}
      <div className="flex flex-col gap-3">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedIndex(index)}
            className={`relative w-20 h-20 border-2 transition-colors ${
              selectedIndex === index ? "border-accent" : "border-transparent"
            }`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
            />
            {/* Video indicator for last thumbnail */}
            {index === images.length - 1 && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <svg
                  className="w-8 h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="relative flex-1 aspect-square bg-card-bg">
        <Image
          src={images[selectedIndex]?.src || ""}
          alt={images[selectedIndex]?.alt || ""}
          fill
          className="object-contain"
          priority
        />
      </div>
    </div>
  );
}
