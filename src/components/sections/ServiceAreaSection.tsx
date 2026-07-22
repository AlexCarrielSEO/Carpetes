import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { MapPin, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

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
  const [isChecking, setIsChecking] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleZipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    // Remove all non-digits
    const digits = value.replace(/\D/g, "");

    // Format as 00000-000
    let formatted = digits;
    if (digits.length > 5) {
      formatted = `${digits.slice(0, 5)}-${digits.slice(5, 8)}`;
    } else {
      formatted = digits.slice(0, 5);
    }

    setZipCode(formatted);
    setValidationError(null);
    setZipCodeResult(null);
  };

  const checkServiceArea = (e: React.FormEvent) => {
    e.preventDefault();

    const cleanZip = zipCode.replace(/\D/g, "");
    if (cleanZip.length < 8) {
      setValidationError("O CEP deve conter 8 dígitos.");
      setZipCodeResult(null);
      return;
    }

    setValidationError(null);
    setZipCodeResult(null);
    setIsChecking(true);

    // Simulated API call with loading spinner
    setTimeout(() => {
      // This would normally check against a database of service areas
      // For demo purposes, we'll just check if the zip code starts with a number less than 6
      const firstDigit = parseInt(cleanZip.charAt(0));
      setZipCodeResult(!isNaN(firstDigit) && firstDigit < 6);
      setIsChecking(false);
    }, 800);
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
              <form onSubmit={checkServiceArea} className="flex flex-col sm:flex-row gap-4 items-start">
                <div className="w-full max-w-xs">
                  <Input
                    type="text"
                    id="cep-input"
                    placeholder="Digite seu CEP (Ex: 01001-000)"
                    value={zipCode}
                    onChange={handleZipChange}
                    className="w-full"
                    maxLength={9}
                    aria-describedby="cep-validation"
                    aria-label="Digite seu CEP para verificar cobertura"
                  />
                </div>
                <Button type="submit" disabled={isChecking || zipCode.replace(/\D/g, "").length < 8}>
                  {isChecking ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Verificando...
                    </>
                  ) : (
                    "Verificar"
                  )}
                </Button>
              </form>

              <div
                id="cep-validation"
                aria-live="polite"
                className="mt-2 text-sm min-h-[20px]"
              >
                {validationError && (
                  <p className="text-red-600 flex items-center gap-1.5 font-medium">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    {validationError}
                  </p>
                )}
              </div>

              {zipCodeResult !== null && (
                <div
                  role="status"
                  aria-live="assertive"
                  className={`mt-4 p-4 rounded-md flex items-start gap-3 border ${
                    zipCodeResult
                      ? "bg-green-50 border-green-200 text-green-800"
                      : "bg-red-50 border-red-200 text-red-800"
                  }`}
                >
                  {zipCodeResult ? (
                    <CheckCircle2 className="h-5 w-5 mt-0.5 text-green-600 shrink-0" />
                  ) : (
                    <AlertCircle className="h-5 w-5 mt-0.5 text-red-600 shrink-0" />
                  )}
                  <div>
                    <p className="font-semibold">
                      {zipCodeResult ? "Área Atendida!" : "Fora da Área de Cobertura"}
                    </p>
                    <p className="text-sm mt-1 opacity-90">
                      {zipCodeResult
                        ? `Ótimas notícias! Atendemos a região do CEP ${zipCode}.`
                        : `Lamentamos, mas atualmente não atendemos o CEP ${zipCode}. Entre em contato conosco para arranjos especiais.`}
                    </p>
                  </div>
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
