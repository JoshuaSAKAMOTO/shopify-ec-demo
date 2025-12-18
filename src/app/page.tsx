import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CategorySlider from "@/components/CategorySlider";
import NewArrivals from "@/components/NewArrivals";
import FeatureSection from "@/components/FeatureSection";
import Footer from "@/components/Footer";

// Placeholder data - replace with Shopify data later
const categories = [
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

const newArrivalsProducts = [
  {
    id: "1",
    title: "Shunya Seated Meditation Set",
    price: "Rs. 7,900",
    image: "https://images.unsplash.com/photo-1600618528240-fb9fc964b853?w=500&h=500&fit=crop",
    href: "/products/shunya-meditation-set-1",
  },
  {
    id: "2",
    title: "Shunya Seated Meditation Set",
    price: "Rs. 7,900",
    image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=500&h=500&fit=crop",
    href: "/products/shunya-meditation-set-2",
  },
  {
    id: "3",
    title: "Shunya Seated Meditation Set",
    price: "Rs. 7,900",
    image: "https://images.unsplash.com/photo-1517976487492-5750f3195933?w=500&h=500&fit=crop",
    href: "/products/shunya-meditation-set-3",
  },
  {
    id: "4",
    title: "Shunya Seated Meditation Set",
    price: "Rs. 7,900",
    image: "https://images.unsplash.com/photo-1591228127791-8e2eaef098d3?w=500&h=500&fit=crop",
    href: "/products/shunya-meditation-set-4",
  },
  {
    id: "5",
    title: "Shunya Seated Meditation Set",
    price: "Rs. 7,900",
    image: "https://images.unsplash.com/photo-1602192509154-0b900ee1f851?w=500&h=500&fit=crop",
    href: "/products/shunya-meditation-set-5",
  },
  {
    id: "6",
    title: "Shunya Seated Meditation Set",
    price: "Rs. 7,900",
    image: "https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?w=500&h=500&fit=crop",
    href: "/products/shunya-meditation-set-6",
  },
];

export default function Home() {
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

        {/* New Arrivals */}
        <NewArrivals
          title="New Arrivals"
          products={newArrivalsProducts}
          viewMoreLink="/collections/new-arrivals"
        />

        {/* Feature Section 1 */}
        <FeatureSection
          title="AMETHYST"
          description="Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do Eiusmod Tempor Incididunt Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do Eiusmod Tempor Incididunt"
          buttonText="Shop Amethyst"
          buttonLink="/collections/amethyst"
          imageSrc="https://images.unsplash.com/photo-1615486511484-92e172cc4fe0?w=800&h=800&fit=crop"
          imageAlt="Amethyst crystal"
          imagePosition="left"
        />

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
