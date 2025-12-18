import Image from "next/image";
import Link from "next/link";

interface HeroProps {
  subtitle?: string;
  title: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  imageSrc: string;
  imageAlt: string;
}

export default function Hero({
  subtitle = "Save Up To 25% Sitewide",
  title = "AMETHYST",
  description = "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt",
  buttonText = "GET NOW",
  buttonLink = "/collections/amethyst",
  imageSrc,
  imageAlt,
}: HeroProps) {
  return (
    <section className="relative w-full h-[500px] md:h-[600px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover"
          priority
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full max-w-7xl mx-auto px-4 flex items-center">
        <div className="max-w-lg text-white">
          {subtitle && (
            <p className="text-sm md:text-base tracking-wider mb-2 uppercase">
              {subtitle}
            </p>
          )}
          <h2 className="font-heading text-5xl md:text-7xl font-light tracking-wide mb-4">
            {title}
          </h2>
          {description && (
            <p className="text-sm md:text-base text-white/80 mb-6 max-w-md leading-relaxed">
              {description}
            </p>
          )}
          {buttonText && buttonLink && (
            <Link
              href={buttonLink}
              className="inline-block border border-white px-8 py-3 text-sm tracking-wider hover:bg-white hover:text-black transition-colors"
            >
              {buttonText}
            </Link>
          )}
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="absolute top-4 left-0 right-0">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="text-xs text-white/70 tracking-wide">
            <Link href="/" className="hover:text-white">HOME</Link>
            <span className="mx-2">/</span>
            <Link href="/collections/crystals" className="hover:text-white">CRYSTALS</Link>
            <span className="mx-2">/</span>
            <span className="text-white">ROCK CRYSTAL</span>
            <span className="mx-2">/</span>
            <span className="text-white">{title}</span>
          </nav>
        </div>
      </div>
    </section>
  );
}
