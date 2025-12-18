import Image from "next/image";
import Link from "next/link";

interface FeatureSectionProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  imageSrc: string;
  imageAlt: string;
  imagePosition?: "left" | "right";
  backgroundColor?: string;
}

export default function FeatureSection({
  title,
  description,
  buttonText,
  buttonLink,
  imageSrc,
  imageAlt,
  imagePosition = "left",
  backgroundColor = "bg-card-bg",
}: FeatureSectionProps) {
  const isImageLeft = imagePosition === "left";

  return (
    <section className={`${backgroundColor}`}>
      <div className="max-w-7xl mx-auto">
        <div className={`grid md:grid-cols-2 ${isImageLeft ? "" : "direction-rtl"}`}>
          {/* Image */}
          <div className={`relative aspect-square md:aspect-auto md:min-h-[500px] ${!isImageLeft ? "md:order-2" : ""}`}>
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover"
            />
          </div>

          {/* Content */}
          <div className={`flex items-center ${!isImageLeft ? "md:order-1" : ""}`}>
            <div className="px-8 py-12 md:px-16 md:py-0">
              <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-6 tracking-wide">
                {title}
              </h2>
              <p className="text-muted text-sm leading-relaxed mb-8 max-w-md">
                {description}
              </p>
              <Link
                href={buttonLink}
                className="inline-flex items-center gap-2 text-sm text-foreground hover:text-accent transition-colors group"
              >
                <span className="w-8 h-px bg-current" />
                <span>{buttonText}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
