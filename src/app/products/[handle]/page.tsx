import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import ProductGallery from "@/components/ProductGallery";
import ProductInfo from "@/components/ProductInfo";
import ProductTabs from "@/components/ProductTabs";
import RelatedProducts from "@/components/RelatedProducts";
import { getProductByHandle, getProducts, formatPrice } from "@/lib/shopify";

// Default tabs for product information
const defaultTabs = [
  {
    id: "description",
    label: "Description",
    content: [] as { title: string; description: string }[],
  },
  {
    id: "how-to-use",
    label: "How Can You Use It",
    content: [
      {
        title: "Usage Instructions",
        description:
          "Clean your crystal regularly under running water. Charge it under moonlight for best results. Hold it during meditation for enhanced spiritual connection.",
      },
    ],
  },
  {
    id: "client-sayings",
    label: "Clients Sayings",
    content: [
      {
        title: "Customer Reviews",
        description:
          "Our customers love the energy and beauty of this piece. Many report feeling a sense of calm and peace when having it in their space.",
      },
    ],
  },
];

interface PageProps {
  params: Promise<{ handle: string }>;
}

export default async function ProductPage({ params }: PageProps) {
  const { handle } = await params;

  // Fetch product data from Shopify
  const product = await getProductByHandle(handle);

  if (!product) {
    notFound();
  }

  // Fetch related products (other products excluding current one)
  const allProducts = await getProducts(5);
  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id)
    .slice(0, 4)
    .map((p) => ({
      id: p.id,
      title: p.title,
      price: formatPrice(p.priceRange.minVariantPrice),
      image: p.featuredImage?.url || "https://images.unsplash.com/photo-1615486511484-92e172cc4fe0?w=500&h=500&fit=crop",
      href: `/products/${p.handle}`,
    }));

  // Transform product images for gallery
  const productImages = product.images.nodes.length > 0
    ? product.images.nodes.map((img) => ({
        src: img.url,
        alt: img.altText || product.title,
      }))
    : [
        {
          src: product.featuredImage?.url || "https://images.unsplash.com/photo-1615486511484-92e172cc4fe0?w=600&h=600&fit=crop",
          alt: product.title,
        },
      ];

  // Extract size options if available
  const sizeOption = product.options.find(
    (opt) => opt.name.toLowerCase() === "size" || opt.name.toLowerCase() === "サイズ"
  );
  const sizes = sizeOption?.values || [];

  // Transform variants for cart functionality
  const variants = product.variants.nodes.map((v) => ({
    id: v.id,
    title: v.title,
    availableForSale: v.availableForSale,
  }));

  // Calculate discount percentage
  const currentPrice = parseFloat(product.priceRange.minVariantPrice.amount);
  const compareAtPrice = parseFloat(product.compareAtPriceRange.minVariantPrice.amount);
  const discountPercentage = compareAtPrice > currentPrice
    ? Math.round(((compareAtPrice - currentPrice) / compareAtPrice) * 100)
    : 0;

  // Build breadcrumb from product tags or use default
  const breadcrumbItems = [
    { label: "HOME", href: "/" },
    { label: "PRODUCTS", href: "/collections/all" },
    { label: product.title.toUpperCase() },
  ];

  // Build tabs with product description
  const tabs = [...defaultTabs];
  if (product.description) {
    tabs[0] = {
      ...tabs[0],
      content: [
        {
          title: "About This Product",
          description: product.description,
        },
      ],
    };
  }
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        {/* Product Section */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Gallery */}
            <div className="w-full overflow-hidden">
              <ProductGallery images={productImages} />
            </div>

            {/* Product Info */}
            <div className="w-full">
              <ProductInfo
                title={product.title}
                rating={4.5}
                reviewCount={0}
                price={formatPrice(product.priceRange.minVariantPrice)}
                compareAtPrice={compareAtPrice > currentPrice ? formatPrice(product.compareAtPriceRange.minVariantPrice) : undefined}
                discountPercentage={discountPercentage}
                description={product.description || ""}
                sizes={sizes}
                variants={variants}
              />
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <ProductTabs tabs={tabs} />

        {/* Related Products */}
        <RelatedProducts title="Related Products" products={relatedProducts} />
      </main>

      <Footer />
    </div>
  );
}
