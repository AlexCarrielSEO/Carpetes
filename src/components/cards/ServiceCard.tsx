import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  imageUrl: string;
  detailsUrl: string;
}

const ServiceCard = ({
  title = "Custom Carpet Installation",
  description = "Professional installation of custom carpets for residential and commercial spaces with expert craftsmanship and attention to detail.",
  imageUrl = "https://images.unsplash.com/photo-1600607686527-6fb886090705?w=500&q=80",
  detailsUrl = "/services/carpet-installation",
}: ServiceCardProps) => {
  return (
    <Card className="w-full max-w-[350px] overflow-hidden h-[400px] flex flex-col bg-white">
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription className="text-sm text-gray-600">
          {description}
        </CardDescription>
      </CardContent>
      <CardFooter className="pt-0">
        <Button
          variant="outline"
          className="w-full justify-between group hover:bg-primary hover:text-white transition-colors"
          onClick={() => (window.location.href = detailsUrl)}
          aria-label={`Ver detalhes sobre o serviço de ${title}`}
        >
          Ver Detalhes
          <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;
