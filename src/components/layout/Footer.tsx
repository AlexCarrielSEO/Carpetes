import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Clock,
} from "lucide-react";

interface FooterProps {
  companyName?: string;
  address?: string;
  phone?: string;
  email?: string;
  businessHours?: string[];
  socialLinks?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
}

const Footer = ({
  companyName = "Custom Carpet Solutions",
  address = "123 Flooring Avenue, Carpet City, CC 12345",
  phone = "(555) 123-4567",
  email = "info@customcarpetsolutions.com",
  businessHours = [
    "Monday - Friday: 9:00 AM - 6:00 PM",
    "Saturday: 10:00 AM - 4:00 PM",
    "Sunday: Closed",
  ],
  socialLinks = {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    twitter: "https://twitter.com",
    linkedin: "https://linkedin.com",
  },
}: FooterProps) => {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleContactFormSubmit = () => {
    setFormSubmitted(true);
    // In a real implementation, this would handle the form submission
  };

  return (
    <footer className="bg-slate-900 text-white py-12 w-full">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Information */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">{companyName}</h3>
            <div className="flex items-start space-x-2">
              <MapPin className="h-5 w-5 mt-0.5 text-primary" />
              <span>{address}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="h-5 w-5 text-primary" />
              <a
                href={`tel:${phone.replace(/[^0-9]/g, "")}`}
                className="hover:text-primary transition-colors"
              >
                {phone}
              </a>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="h-5 w-5 text-primary" />
              <a
                href={`mailto:${email}`}
                className="hover:text-primary transition-colors"
              >
                {email}
              </a>
            </div>
            <div className="flex items-start space-x-2">
              <Clock className="h-5 w-5 mt-0.5 text-primary" />
              <div>
                {businessHours.map((hours, index) => (
                  <p key={index}>{hours}</p>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Início
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="hover:text-primary transition-colors"
                >
                  Serviços
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="hover:text-primary transition-colors"
                >
                  Sobre Nós
                </a>
              </li>
              <li>
                <a
                  href="#testimonials"
                  className="hover:text-primary transition-colors"
                >
                  Depoimentos
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-primary transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-primary transition-colors"
                >
                  Contato
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Form */}
          <div className="space-y-4 lg:col-span-2">
            <h3 className="text-xl font-bold">Entre em Contato</h3>
            {formSubmitted ? (
              <div className="bg-green-800/20 p-6 rounded-lg">
                <h4 className="text-lg font-semibold text-green-400">
                  Obrigado pela sua mensagem!
                </h4>
                <p className="mt-2">Retornaremos o mais breve possível.</p>
                <Button
                  onClick={() => setFormSubmitted(false)}
                  className="mt-4"
                  variant="outline"
                >
                  Enviar Outra Mensagem
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <form
                  className="space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleContactFormSubmit();
                  }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Input
                        type="text"
                        placeholder="Seu Nome"
                        aria-label="Seu Nome"
                        required
                        className="bg-slate-800 border-slate-700"
                      />
                    </div>
                    <div>
                      <Input
                        type="email"
                        placeholder="Seu Email"
                        aria-label="Seu Email"
                        required
                        className="bg-slate-800 border-slate-700"
                      />
                    </div>
                  </div>
                  <div>
                    <Input
                      type="text"
                      placeholder="Assunto"
                      aria-label="Assunto da mensagem"
                      required
                      className="bg-slate-800 border-slate-700"
                    />
                  </div>
                  <div>
                    <Textarea
                      placeholder="Sua Mensagem"
                      aria-label="Sua Mensagem"
                      rows={4}
                      required
                      className="bg-slate-800 border-slate-700"
                    />
                  </div>
                  <Button type="submit" className="w-full md:w-auto">
                    Enviar Mensagem
                  </Button>
                </form>
              </div>
            )}
          </div>
        </div>

        {/* Social Links & Copyright */}
        <div className="mt-12 pt-8 border-t border-slate-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-4 mb-4 md:mb-0">
              <a
                href={socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-800 p-2 rounded-full hover:bg-primary transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-800 p-2 rounded-full hover:bg-primary transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href={socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-800 p-2 rounded-full hover:bg-primary transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-800 p-2 rounded-full hover:bg-primary transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
            <div className="text-slate-400 text-sm text-center md:text-right">
              <p>
                &copy; {new Date().getFullYear()} {companyName}. All rights
                reserved.
              </p>
              <p className="mt-1">
                <a href="#" className="hover:text-primary transition-colors">
                  Política de Privacidade
                </a>{" "}
                |
                <a
                  href="#"
                  className="hover:text-primary transition-colors ml-2"
                >
                  Termos de Serviço
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
