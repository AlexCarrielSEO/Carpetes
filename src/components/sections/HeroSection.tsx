import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface HeroSectionProps {
  title?: string;
  description?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  imageUrl?: string;
  imageAlt?: string;
  onPrimaryButtonClick?: () => void;
  onSecondaryButtonClick?: () => void;
}

export default function HeroSection({
  title = "Transforme Seu Espaço com Carpetes Personalizados",
  description = "Carpetes de qualidade artesanal projetados para combinar perfeitamente com seu estilo e requisitos de espaço. Experimente o luxo sob seus pés.",
  primaryButtonText = "Obter Orçamento Grátis",
  secondaryButtonText = "Ver Nossa Coleção",
  imageUrl = "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
  imageAlt = "Custom carpet in a modern living room",
  onPrimaryButtonClick = () => {},
  onSecondaryButtonClick = () => {},
}: HeroSectionProps) {
  return (
    <section className="w-full bg-gradient-to-r from-gray-100 to-gray-200 py-16 md:py-24">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-primary">
            {title}
          </h1>
          <p className="text-lg text-gray-700 max-w-md">{description}</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="font-medium"
              onClick={onPrimaryButtonClick}
            >
              {primaryButtonText}
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="font-medium"
              onClick={onSecondaryButtonClick}
            >
              {secondaryButtonText}
            </Button>
          </div>
        </div>
        <div className="rounded-lg overflow-hidden shadow-xl">
          <AspectRatio ratio={16 / 9}>
            <div className="relative w-full h-full bg-gray-300 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white opacity-80"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polygon points="10 8 16 12 10 16 10 8" />
                </svg>
              </div>
              <img
                src={imageUrl}
                alt={imageAlt}
                className="w-full h-full object-cover"
              />
            </div>
          </AspectRatio>
        </div>
      </div>
    </section>
  );
}
