import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import ProductCard from "@/components/ProductCard";
import { getCollectionByHandle, formatPrice } from "@/lib/shopify";

interface PageProps {
  params: Promise<{ handle: string }>;
}

export default async function CollectionPage({ params }: PageProps) {
  const { handle } = await params;

  const collection = await getCollectionByHandle(handle, 50);

  if (!collection) {
    notFound();
  }

  const breadcrumbItems = [
    { label: "HOME", href: "/" },
    { label: "COLLECTIONS", href: "/" },
    { label: collection.title.toUpperCase() },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero Section */}
        {collection.image && (
          <div
            className="relative h-64 md:h-80 bg-cover bg-center"
            style={{ backgroundImage: `url(${collection.image.url})` }}
          >
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 flex items-center justify-center">
              <h1 className="font-heading text-4xl md:text-5xl text-white text-center">
                {collection.title}
              </h1>
            </div>
          </div>
        )}

        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        {/* Collection Info */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          {!collection.image && (
            <h1 className="font-heading text-3xl md:text-4xl text-foreground mb-4">
              {collection.title}
            </h1>
          )}
          {collection.description && (
            <p className="text-muted max-w-3xl mb-8">
              {collection.description}
            </p>
          )}

          {/* Product Count */}
          <p className="text-sm text-muted mb-6">
            {collection.products.nodes.length} product
            {collection.products.nodes.length !== 1 ? "s" : ""}
          </p>

          {/* Products Grid */}
          {collection.products.nodes.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {collection.products.nodes.map((product) => (
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
          ) : (
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
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
              <p className="text-muted text-lg">
                No products in this collection yet.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
