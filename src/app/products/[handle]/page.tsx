import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import ProductGallery from "@/components/ProductGallery";
import ProductInfo from "@/components/ProductInfo";
import ProductTabs from "@/components/ProductTabs";
import RelatedProducts from "@/components/RelatedProducts";

// Placeholder data - replace with Shopify data later
const productData = {
  title: "Amethyst Bunny Figurine",
  rating: 4.5,
  reviewCount: 86,
  price: "₹19,795",
  compareAtPrice: "M.R.P.₹20,795",
  discountPercentage: 10,
  description:
    "Invite A Sense Of Calm And Charm Into Your Space With Our Amethyst Bunny Figurine – A Delicate Blend Of Nature's Beauty And Artisanal Craftsmanship ...",
  sizes: ["2-4 Inches", "4-6 Inches", "6-8 Inches", "8-10 Inches"],
  images: [
    {
      src: "https://images.unsplash.com/photo-1615486511484-92e172cc4fe0?w=600&h=600&fit=crop",
      alt: "Amethyst Bunny Figurine - Main",
    },
    {
      src: "https://images.unsplash.com/photo-1599148401005-fe6d7497cb5e?w=600&h=600&fit=crop",
      alt: "Amethyst Bunny Figurine - Angle 2",
    },
    {
      src: "https://images.unsplash.com/photo-1615486511262-6b8e1e8f1c51?w=600&h=600&fit=crop",
      alt: "Amethyst Bunny Figurine - Angle 3",
    },
    {
      src: "https://images.unsplash.com/photo-1615486364523-e71749e46123?w=600&h=600&fit=crop",
      alt: "Amethyst Bunny Figurine - Video",
    },
  ],
};

const tabs = [
  {
    id: "healing-crystals",
    label: "Healing With Crystals",
    content: [
      {
        title: "Physical Problems And Diseases",
        description:
          "Alzheimer's, Anorexia, Bruises, Bulimia, Burns, Dementia, Emphysema, Fatigue, Infertility, Kidneys, Lungs, Menstrual, Migraines, Pain, Shingles, And Several Skin Related Diseases.",
      },
      {
        title: "Emotional Concerns And Conditions",
        description:
          "Acceptance, Aggression, Anger, Care Of Self, Comfort, Conflicts, Crisis, Crying, Depression, Despair, Emotional Balance, Emotional Blockages, Healing, Release, And The Trauma, Forgiveness, Frustration, Gentleness, Grief, Guilt, Happiness, Hurt Feelings, Jealousy, Joy, Kindness, Loneliness, Love, Nurture, Perseverance, Positive Energy, Rage, Removes Negativity, Self Confidence, Self Esteem, Stress/Tension, And The Tranquility",
      },
      {
        title: "Physical Problems And Diseases",
        description:
          "Alzheimer's, Anorexia, Bruises, Bulimia, Burns, Dementia, Emphysema, Fatigue, Infertility, Kidneys, Lungs, Menstrual, Migraines, Pain, Shingles, And Several Skin Related Diseases.",
      },
    ],
  },
  {
    id: "healing-vastu",
    label: "Healing With Vastu",
    content: [
      {
        title: "Vastu Benefits",
        description:
          "Place this crystal in the northeast corner of your home or office for maximum positive energy flow and spiritual enhancement.",
      },
    ],
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

const relatedProducts = [
  {
    id: "r1",
    title: "Shunya Seated Meditation Set",
    price: "Rs. 7,900",
    image: "https://images.unsplash.com/photo-1615486511484-92e172cc4fe0?w=500&h=500&fit=crop",
    href: "/products/shunya-meditation-set-1",
  },
  {
    id: "r2",
    title: "Shunya Seated Meditation Set",
    price: "Rs. 7,900",
    image: "https://images.unsplash.com/photo-1599148401005-fe6d7497cb5e?w=500&h=500&fit=crop",
    href: "/products/shunya-meditation-set-2",
  },
  {
    id: "r3",
    title: "Shunya Seated Meditation Set",
    price: "Rs. 7,900",
    image: "https://images.unsplash.com/photo-1615486511262-6b8e1e8f1c51?w=500&h=500&fit=crop",
    href: "/products/shunya-meditation-set-3",
  },
  {
    id: "r4",
    title: "Shunya Seated Meditation Set",
    price: "Rs. 7,900",
    image: "https://images.unsplash.com/photo-1615486364523-e71749e46123?w=500&h=500&fit=crop",
    href: "/products/shunya-meditation-set-4",
  },
];

const breadcrumbItems = [
  { label: "HOME", href: "/" },
  { label: "CRYSTALS", href: "/collections/crystals" },
  { label: "ROCK CRYSTAL", href: "/collections/rock-crystal" },
  { label: "AMETHYST", href: "/collections/amethyst" },
  { label: "AMETHYST BUNNY FIGURINE" },
];

export default function ProductPage() {
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
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Gallery */}
            <ProductGallery images={productData.images} />

            {/* Product Info */}
            <ProductInfo
              title={productData.title}
              rating={productData.rating}
              reviewCount={productData.reviewCount}
              price={productData.price}
              compareAtPrice={productData.compareAtPrice}
              discountPercentage={productData.discountPercentage}
              description={productData.description}
              sizes={productData.sizes}
            />
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
