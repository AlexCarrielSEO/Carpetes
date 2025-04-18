import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Separator } from "@/components/ui/separator";

interface AboutSectionProps {
  title?: string;
  description?: string[];
  stats?: Array<{
    value: string;
    label: string;
  }>;
  images?: Array<{
    src: string;
    alt: string;
    ratio?: number;
  }>;
}

export default function AboutSection({
  title = "Nossa História",
  description = [
    "Por mais de 25 anos, a Carpetes Personalizados tem transformado espaços com qualidade excepcional e artesanato. O que começou como um pequeno negócio familiar cresceu e se tornou um nome confiável em soluções de carpetes personalizados.",
    "Temos orgulho de nossa atenção aos detalhes, compromisso com a qualidade e dedicação à satisfação do cliente. Cada carpete que criamos é um testemunho de nossa paixão pela excelência e nosso desejo de superar expectativas.",
  ],
  stats = [
    { value: "25+", label: "Anos de Experiência" },
    { value: "5000+", label: "Projetos Concluídos" },
    { value: "98%", label: "Satisfação do Cliente" },
  ],
  images = [
    {
      src: "https://images.unsplash.com/photo-1600607686527-6fb886090705?w=500&q=80",
      alt: "Carpet workshop",
      ratio: 4 / 5,
    },
    {
      src: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=500&q=80",
      alt: "Carpet design process",
      ratio: 1,
    },
    {
      src: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=500&q=80",
      alt: "Carpet installation",
      ratio: 1,
    },
    {
      src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&q=80",
      alt: "Finished carpet in home",
      ratio: 4 / 5,
    },
  ],
}: AboutSectionProps) {
  return (
    <section id="about" className="w-full py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">{title}</h2>
            <Separator className="my-2" />
            {description.map((paragraph, index) => (
              <p key={index} className="text-lg text-gray-700">
                {paragraph}
              </p>
            ))}
            <div className="grid grid-cols-3 gap-4 pt-4">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <p className="text-3xl font-bold text-primary">
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              {images.slice(0, 2).map((image, index) => (
                <div
                  key={index}
                  className="rounded-lg overflow-hidden shadow-md"
                >
                  <AspectRatio ratio={image.ratio || 1}>
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                    />
                  </AspectRatio>
                </div>
              ))}
            </div>
            <div className="space-y-4 mt-8">
              {images.slice(2, 4).map((image, index) => (
                <div
                  key={index}
                  className="rounded-lg overflow-hidden shadow-md"
                >
                  <AspectRatio ratio={image.ratio || 1}>
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                    />
                  </AspectRatio>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
