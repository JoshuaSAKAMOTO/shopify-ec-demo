import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  id: string;
  title: string;
  price: string;
  image: string;
  href: string;
  hoverImage?: string;
}

export default function ProductCard({
  title,
  price,
  image,
  href,
  hoverImage,
}: ProductCardProps) {
  return (
    <Link href={href} className="group block">
      {/* Image Container */}
      <div className="relative aspect-square bg-card-bg overflow-hidden mb-4">
        <Image
          src={image}
          alt={title}
          fill
          className={`object-cover transition-opacity duration-300 ${hoverImage ? "group-hover:opacity-0" : ""}`}
        />
        {hoverImage && (
          <Image
            src={hoverImage}
            alt={`${title} alternate`}
            fill
            className="object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />
        )}
      </div>

      {/* Product Info */}
      <div className="text-center">
        <h3 className="text-sm text-foreground mb-1 group-hover:underline">
          {title}
        </h3>
        <p className="text-sm text-muted">
          {price}
        </p>
      </div>
    </Link>
  );
}
