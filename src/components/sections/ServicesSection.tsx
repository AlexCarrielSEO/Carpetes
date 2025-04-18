import React from "react";
import { motion } from "framer-motion";
import ServiceCard from "../cards/ServiceCard";
import { Button } from "../ui/button";

interface Service {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  detailsUrl: string;
}

interface ServicesSectionProps {
  title?: string;
  subtitle?: string;
  services?: Service[];
  showViewAllButton?: boolean;
}

const ServicesSection = ({
  title = "Nossos Serviços de Carpetes",
  subtitle = "Descubra nossa ampla gama de soluções de carpetes personalizados para sua casa ou empresa",
  services = [
    {
      id: "1",
      title: "Instalação de Carpetes Personalizados",
      description:
        "Instalação profissional de carpetes personalizados para espaços residenciais e comerciais com artesanato especializado.",
      imageUrl:
        "https://images.unsplash.com/photo-1600607686527-6fb886090705?w=500&q=80",
      detailsUrl: "/services/carpet-installation",
    },
    {
      id: "2",
      title: "Limpeza de Carpetes",
      description:
        "Serviços de limpeza profunda para manter a beleza e prolongar a vida útil dos seus carpetes usando soluções ecológicas.",
      imageUrl:
        "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=500&q=80",
      detailsUrl: "/services/carpet-cleaning",
    },
    {
      id: "3",
      title: "Reparo de Carpetes",
      description:
        "Serviços especializados de reparo para carpetes danificados, incluindo remendos, esticamento e reparo de costuras.",
      imageUrl:
        "https://images.unsplash.com/photo-1617104678098-de229db51175?w=500&q=80",
      detailsUrl: "/services/carpet-repair",
    },
    {
      id: "4",
      title: "Design Personalizado",
      description:
        "Crie designs únicos de carpetes adaptados às suas preferências estéticas específicas e requisitos funcionais.",
      imageUrl:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&q=80",
      detailsUrl: "/services/custom-design",
    },
  ],
  showViewAllButton = true,
}: ServicesSectionProps) => {
  return (
    <section className="w-full py-16 px-4 md:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ServiceCard
                title={service.title}
                description={service.description}
                imageUrl={service.imageUrl}
                detailsUrl={service.detailsUrl}
              />
            </motion.div>
          ))}
        </div>

        {showViewAllButton && (
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white px-8"
              onClick={() => (window.location.href = "/services")}
            >
              Ver Todos os Serviços
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ServicesSection;
