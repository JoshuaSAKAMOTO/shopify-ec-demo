import Link from "next/link";
import ProductCard from "./ProductCard";

interface Product {
  id: string;
  title: string;
  price: string;
  image: string;
  href: string;
}

interface NewArrivalsProps {
  title?: string;
  products: Product[];
  viewMoreLink?: string;
}

export default function NewArrivals({
  title = "New Arrivals",
  products,
  viewMoreLink = "/collections/new-arrivals",
}: NewArrivalsProps) {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        {/* Title */}
        <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-12 italic">
          {title}
        </h2>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-12">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center">
          <Link
            href={viewMoreLink}
            className="inline-block bg-accent text-white px-12 py-3 text-sm tracking-wider hover:bg-accent-light transition-colors"
          >
            VIEW MORE
          </Link>
        </div>
      </div>
    </section>
  );
}
