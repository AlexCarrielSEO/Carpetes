import React from "react";
import { Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface TestimonialProps {
  name: string;
  role: string;
  content: string;
  rating: number;
  avatarUrl?: string;
}

interface TestimonialsSectionProps {
  title?: string;
  subtitle?: string;
  testimonials?: TestimonialProps[];
}

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  title = "O Que Nossos Clientes Dizem",
  subtitle = "Ouça de nossos clientes satisfeitos sobre sua experiência com nossas soluções de carpetes personalizados.",
  testimonials = [
    {
      name: "Sarah Johnson",
      role: "Proprietária",
      content:
        "O carpete personalizado que encomendamos superou nossas expectativas. A qualidade é excepcional e a equipe de instalação foi profissional e eficiente. Nossa sala de estar foi completamente transformada!",
      rating: 5,
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    },
    {
      name: "Michael Thompson",
      role: "Empresário",
      content:
        "Precisávamos de carpetes duráveis e elegantes para nosso escritório, e esta empresa entregou perfeitamente. O processo de seleção foi fácil, e o produto final recebeu muitos elogios de clientes e funcionários.",
      rating: 5,
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
    },
    {
      name: "Jennifer Davis",
      role: "Designer de Interiores",
      content:
        "Como designer de interiores, tenho altos padrões para os materiais que recomendo aos clientes. Esta empresa de carpetes fornece consistentemente qualidade excepcional e designs únicos que ajudam meus projetos a se destacarem.",
      rating: 4,
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=jennifer",
    },
    {
      name: "Robert Wilson",
      role: "Gerente de Propriedades",
      content:
        "Gerenciar múltiplas propriedades significa que preciso de fornecedores confiáveis. Esta empresa de carpetes tem sido minha escolha por anos devido à sua qualidade consistente, preços justos e excelente atendimento ao cliente.",
      rating: 5,
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=robert",
    },
    {
      name: "Emily Parker",
      role: "Proprietária",
      content:
        "O padrão personalizado que projetamos com a equipe deles ficou lindo. É exatamente o que imaginamos para nossa casa, e a qualidade é excepcional. Vale cada centavo!",
      rating: 5,
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily",
    },
  ],
}) => {
  return (
    <section className="py-16 px-4 md:px-8 lg:px-12 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
        </div>

        <div className="relative px-12">
          <Carousel
            opts={{
              align: "center",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem
                  key={index}
                  className="md:basis-1/2 lg:basis-1/3 pl-4 pr-4"
                >
                  <div className="bg-white p-6 rounded-lg shadow-md h-full flex flex-col">
                    <div className="flex items-center mb-4">
                      <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                        <img
                          src={
                            testimonial.avatarUrl ||
                            `https://api.dicebear.com/7.x/avataaars/svg?seed=${index}`
                          }
                          alt={`${testimonial.name}'s avatar`}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {testimonial.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>

                    <div className="flex mb-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>

                    <p className="text-gray-700 flex-grow">
                      {testimonial.content}
                    </p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:block">
              <CarouselPrevious className="-left-6" />
              <CarouselNext className="-right-6" />
            </div>
          </Carousel>
        </div>

        <div className="mt-10 text-center">
          <p className="text-gray-600 italic">
            Junte-se à nossa crescente lista de clientes satisfeitos!
          </p>
          <button className="mt-4 px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors">
            Solicitar Orçamento
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
