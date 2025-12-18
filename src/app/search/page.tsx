import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { searchProducts, formatPrice } from "@/lib/shopify";

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q: query } = await searchParams;
  const products = query ? await searchProducts(query, 20) : [];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="font-heading text-3xl text-foreground mb-2">
            Search Results
          </h1>
          {query && (
            <p className="text-muted">
              {products.length} result{products.length !== 1 ? "s" : ""} for &quot;{query}&quot;
            </p>
          )}
        </div>

        {!query && (
          <div className="text-center py-16">
            <svg
              className="w-16 h-16 text-gray-300 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
            <p className="text-muted text-lg">
              Enter a search term to find products
            </p>
          </div>
        )}

        {query && products.length === 0 && (
          <div className="text-center py-16">
            <svg
              className="w-16 h-16 text-gray-300 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-muted text-lg mb-4">
              No products found for &quot;{query}&quot;
            </p>
            <p className="text-muted">
              Try using different keywords or check your spelling
            </p>
          </div>
        )}

        {products.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.title}
                price={formatPrice(product.priceRange.minVariantPrice)}
                image={
                  product.featuredImage?.url ||
                  "https://images.unsplash.com/photo-1615486511484-92e172cc4fe0?w=500&h=500&fit=crop"
                }
                href={`/products/${product.handle}`}
              />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
