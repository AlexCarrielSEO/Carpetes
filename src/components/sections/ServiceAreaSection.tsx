import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { MapPin } from "lucide-react";

interface ServiceAreaSectionProps {
  title?: string;
  description?: string;
  newsletterTitle?: string;
  newsletterDescription?: string;
  mapImageUrl?: string;
}

export default function ServiceAreaSection({
  title = "Nossa Área de Serviço",
  description = "Fornecemos nossos serviços de carpetes personalizados em toda a área metropolitana e subúrbios adjacentes. Verifique se sua localização está dentro da nossa área de serviço.",
  newsletterTitle = "Mantenha-se Atualizado",
  newsletterDescription = "Assine nossa newsletter para receber as últimas tendências de design, ofertas especiais e dicas de manutenção.",
  mapImageUrl = "https://images.unsplash.com/photo-1569336415962-a4bd9f69c07b?w=800&q=80",
}: ServiceAreaSectionProps) {
  const [zipCode, setZipCode] = useState("");
  const [zipCodeResult, setZipCodeResult] = useState<null | boolean>(null);
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const checkServiceArea = (e: React.FormEvent) => {
    e.preventDefault();
    // This would normally check against a database of service areas
    // For demo purposes, we'll just check if the zip code starts with a number less than 6
    const firstDigit = parseInt(zipCode.charAt(0));
    setZipCodeResult(!isNaN(firstDigit) && firstDigit < 6);
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would send this to your backend
    console.log("Email submitted:", email);
    // Reset the form
    setEmail("");
    // Show success message
    setIsSubscribed(true);
    setTimeout(() => setIsSubscribed(false), 3000);
  };

  return (
    <section className="w-full py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{title}</h2>
            <p className="text-lg text-gray-700 mb-8">{description}</p>

            <div className="mb-8">
              <form onSubmit={checkServiceArea} className="flex gap-4">
                <Input
                  type="text"
                  placeholder="Digite seu CEP"
                  aria-label="Digite seu CEP"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  className="max-w-xs"
                />
                <Button type="submit">Verificar</Button>
              </form>

              {zipCodeResult !== null && (
                <div
                  className={`mt-4 p-4 rounded-md ${zipCodeResult ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                >
                  {zipCodeResult
                    ? "Ótimas notícias! Atendemos sua área."
                    : "Lamentamos, mas atualmente não atendemos sua área. Entre em contato conosco para arranjos especiais."}
                </div>
              )}
            </div>

            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">{newsletterTitle}</h3>
              <p className="text-gray-700 mb-4">{newsletterDescription}</p>
              <form onSubmit={handleEmailSubmit} className="flex gap-4">
                <Input
                  type="email"
                  placeholder="Seu endereço de email"
                  aria-label="Seu endereço de email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-grow"
                />
                <Button type="submit">Assinar</Button>
              </form>
              {isSubscribed && (
                <div className="mt-4 p-3 bg-green-100 text-green-800 rounded-md">
                  Obrigado por assinar nossa newsletter!
                </div>
              )}
            </div>
          </div>

          <div className="rounded-lg overflow-hidden shadow-lg">
            <AspectRatio ratio={4 / 3}>
              <div className="w-full h-full bg-gray-200">
                {/* This would be replaced with an actual map integration in a real application */}
                <div className="w-full h-full relative bg-gray-300">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin
                        size={48}
                        className="mx-auto mb-4 text-gray-600"
                        aria-hidden="true"
                      />
                      <p className="text-gray-700 font-medium">
                        Mapa Interativo da Área de Serviço
                      </p>
                      <p className="text-gray-500 text-sm">
                        (A integração do mapa seria implementada aqui)
                      </p>
                    </div>
                  </div>
                  <img
                    src={mapImageUrl}
                    alt="Service area map"
                    className="w-full h-full object-cover opacity-50"
                  />
                </div>
              </div>
            </AspectRatio>
          </div>
        </div>
      </div>
    </section>
  );
}
