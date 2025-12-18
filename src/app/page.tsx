import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CategorySlider from "@/components/CategorySlider";
import NewArrivals from "@/components/NewArrivals";
import FeatureSection from "@/components/FeatureSection";
import Footer from "@/components/Footer";
import { getProducts, getCollections, formatPrice } from "@/lib/shopify";

// Placeholder categories - will be replaced with collections when available
const defaultCategories = [
  {
    name: "CRYSTALS",
    href: "/collections/crystals",
    image: "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=600&h=800&fit=crop",
  },
  {
    name: "MEDITATION CUSHIONS",
    href: "/collections/meditation-cushions",
    image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=600&h=800&fit=crop",
  },
  {
    name: "WELLNESS PRODUCT",
    href: "/collections/wellness",
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&h=800&fit=crop",
  },
  {
    name: "MEDITATION PRODUCT",
    href: "/collections/meditation",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=800&fit=crop",
  },
];

export default async function Home() {
  // Fetch real products from Shopify
  const products = await getProducts(6);
  const collections = await getCollections(4);

  // Transform products for NewArrivals component
  const newArrivalsProducts = products.map((product) => ({
    id: product.id,
    title: product.title,
    price: formatPrice(product.priceRange.minVariantPrice),
    image: product.featuredImage?.url || "https://images.unsplash.com/photo-1615486511484-92e172cc4fe0?w=500&h=500&fit=crop",
    href: `/products/${product.handle}`,
  }));

  // Transform collections for CategorySlider component
  const categories = collections.length > 0
    ? collections.map((collection) => ({
        name: collection.title.toUpperCase(),
        href: `/collections/${collection.handle}`,
        image: collection.image?.url || "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=600&h=800&fit=crop",
      }))
    : defaultCategories;

  // Get first product for feature section
  const featuredProduct = products[0];

  return (
    <div className="min-h-screen">
      <Header />

      <main>
        {/* Hero Section */}
        <Hero
          subtitle="Save Up To 25% Sitewide"
          title="AMETHYST"
          description="Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt"
          buttonText="GET NOW"
          buttonLink="/collections/amethyst"
          imageSrc="https://images.unsplash.com/photo-1615486511484-92e172cc4fe0?w=1920&h=1080&fit=crop"
          imageAlt="Amethyst crystals"
        />

        {/* Category Slider */}
        <CategorySlider
          title="Explore Our Collection"
          description="Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do Eiusmod Tempor Incididunt"
          categories={categories}
        />

        {/* New Arrivals - Real Products */}
        <NewArrivals
          title="New Arrivals"
          products={newArrivalsProducts}
          viewMoreLink="/collections/all"
        />

        {/* Feature Section 1 */}
        {featuredProduct && (
          <FeatureSection
            title={featuredProduct.title.toUpperCase()}
            description={featuredProduct.description || "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do Eiusmod Tempor Incididunt"}
            buttonText={`Shop ${featuredProduct.title}`}
            buttonLink={`/products/${featuredProduct.handle}`}
            imageSrc={featuredProduct.featuredImage?.url || "https://images.unsplash.com/photo-1615486511484-92e172cc4fe0?w=800&h=800&fit=crop"}
            imageAlt={featuredProduct.title}
            imagePosition="left"
          />
        )}

        {/* Feature Section 2 */}
        <FeatureSection
          title="AMETHYST"
          description="Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do Eiusmod Tempor Incididunt Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do Eiusmod Tempor Incididunt"
          buttonText="Shop Amethyst"
          buttonLink="/collections/amethyst"
          imageSrc="https://images.unsplash.com/photo-1599148401005-fe6d7497cb5e?w=800&h=800&fit=crop"
          imageAlt="Amethyst sphere"
          imagePosition="right"
          backgroundColor="bg-background"
        />
      </main>

      <Footer />
    </div>
  );
}
