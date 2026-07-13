import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

// Import all section components
import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import AboutSection from "@/components/sections/AboutSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import FaqSection from "@/components/sections/FaqSection";
import ServiceAreaSection from "@/components/sections/ServiceAreaSection";
import ContactForm from "@/components/forms/ContactForm";
import NewsletterSignup from "@/components/forms/NewsletterSignup";

// Header Component
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All Carpets");

  const categories = [
    "Todos os Carpetes",
    "Residencial",
    "Comercial",
    "Design Personalizado",
    "Ecológico",
  ];

  const navLinks = [
    { name: "Início", href: "#" },
    { name: "Serviços", href: "#services" },
    { name: "Sobre", href: "#about" },
    { name: "Depoimentos", href: "#testimonials" },
    { name: "FAQ", href: "#faq" },
    { name: "Contato", href: "#contact" },
  ];

  return (
    <header className="w-full h-20 bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto h-full px-4 flex items-center justify-between">
        <div className="flex items-center">
          <a href="#" className="text-2xl font-bold text-primary mr-8">
            Carpetes Personalizados
          </a>
          <div className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-700 hover:text-primary transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>

        <div className="hidden md:block relative">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            aria-label="Selecionar categoria de carpete"
            className="appearance-none bg-gray-100 border border-gray-300 rounded-md py-2 pl-4 pr-10 text-gray-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        <button
          className="md:hidden text-gray-700 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm transition-all"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md absolute w-full">
          <div className="container mx-auto px-4 py-3">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-700 hover:text-primary transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-2">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  aria-label="Selecionar categoria de carpete"
                  className="w-full appearance-none bg-gray-100 border border-gray-300 rounded-md py-2 pl-4 pr-10 text-gray-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

// Footer Component
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Carpetes Personalizados</h3>
            <p className="text-gray-400 mb-4">
              Fornecendo soluções de carpetes personalizados de qualidade por
              mais de 25 anos. Temos orgulho de nosso artesanato e satisfação do
              cliente.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Início
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Serviços
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Sobre Nós
                </a>
              </li>
              <li>
                <a
                  href="#testimonials"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Depoimentos
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Informações de Contato</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-start">
                <svg
                  className="h-6 w-6 mr-2 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>123 Carpet Lane, Textile City, TC 12345</span>
              </li>
              <li className="flex items-start">
                <svg
                  className="h-6 w-6 mr-2 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-start">
                <svg
                  className="h-6 w-6 mr-2 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span>info@customcarpets.com</span>
              </li>
              <li className="flex items-start">
                <svg
                  className="h-6 w-6 mr-2 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>
                  Mon-Fri: 9AM-6PM
                  <br />
                  Sat: 10AM-4PM
                  <br />
                  Sun: Closed
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Entre em Contato</h3>
            <p className="text-gray-400 mb-4">
              Tem perguntas? Entre em contato diretamente ou use nosso
              formulário.
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full">Contate-nos</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px] p-0">
                <ContactForm />
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>
            &copy; {currentYear} Carpetes Personalizados. Todos os direitos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

// Function to download the complete layout as a zip file
const downloadLayout = async () => {
  // Import the createZipFile function
  const { createZipFile } = await import("@/lib/utils");

  // Get all the component code
  const cssContent =
    document.querySelector("style#layout-css")?.textContent || "";

  // Create a zip file with all layout components
  const zipBlob = await createZipFile([
    { name: "css/carpet-layout.css", content: cssContent },
    {
      name: "README.txt",
      content:
        "Layout completo do site de Carpetes Personalizados. Extraia o conteúdo e use conforme necessário.",
    },
    {
      name: "index.html",
      content: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Carpetes Personalizados</title>
  <link rel="stylesheet" href="css/carpet-layout.css">
</head>
<body>
  <header>
    <!-- Cabeçalho do site -->
  </header>
  <main>
    <!-- Conteúdo principal -->
  </main>
  <footer>
    <!-- Rodapé do site -->
  </footer>
</body>
</html>`,
    },
    {
      name: "components/Header.jsx",
      content: `import React from "react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <div className="flex items-center">
          <a href="/" className="flex items-center">
            <img src="/logo.svg" alt="Carpetes Personalizados Logo" className="h-10 w-auto" />
            <span className="ml-2 text-xl font-bold text-gray-800">Carpetes Personalizados</span>
          </a>
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          {/* Links de navegação */}
        </nav>
        <div className="hidden md:flex items-center space-x-4">
          <button className="bg-primary text-white px-4 py-2 rounded-md">Solicitar Orçamento</button>
        </div>
      </div>
    </header>
  );
}`,
    },
    {
      name: "components/HeroSection.jsx",
      content: `import React from "react";

export default function HeroSection() {
  return (
    <section className="w-full bg-gradient-to-r from-gray-100 to-gray-200 py-16 md:py-24">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-primary">
            Transforme Seu Espaço com Carpetes Personalizados
          </h1>
          <p className="text-lg text-gray-700 max-w-md">
            Carpetes de qualidade artesanal projetados para combinar perfeitamente com seu estilo e requisitos de espaço.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-primary text-white px-6 py-3 rounded-md font-medium">
              Obter Orçamento Grátis
            </button>
            <button className="border border-gray-300 px-6 py-3 rounded-md font-medium">
              Ver Nossa Coleção
            </button>
          </div>
        </div>
        <div className="rounded-lg overflow-hidden shadow-xl">
          <img src="/hero-image.jpg" alt="Carpete personalizado" className="w-full h-full object-cover" />
        </div>
      </div>
    </section>
  );
}`,
    },
    {
      name: "components/ServicesSection.jsx",
      content: `import React from "react";

export default function ServicesSection() {
  return (
    <section className="w-full py-16 px-4 md:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Nossos Serviços de Carpetes
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Descubra nossa ampla gama de soluções de carpetes personalizados para sua casa ou empresa
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Cards de serviços */}
        </div>
      </div>
    </section>
  );
}`,
    },
    {
      name: "components/Footer.jsx",
      content: `import React from "react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-12 w-full">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Informações da empresa */}
          {/* Links rápidos */}
          {/* Formulário de contato */}
        </div>
        <div className="mt-12 pt-8 border-t border-slate-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-4 mb-4 md:mb-0">
              {/* Ícones de redes sociais */}
            </div>
            <div className="text-slate-400 text-sm text-center md:text-right">
              <p>&copy; 2023 Carpetes Personalizados. Todos os direitos reservados.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}`,
    },
  ]);

  // Create a download link for the zip file
  const url = URL.createObjectURL(zipBlob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "carpetes-personalizados-layout-completo.zip";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export default function CarpetLandingPage() {
  const [contactDialogOpen, setContactDialogOpen] = useState(false);

  const handleGetQuoteClick = () => {
    setContactDialogOpen(true);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Embed the CSS for download */}
      <style
        id="layout-css"
        dangerouslySetInnerHTML={{
          __html: `/* Layout CSS for Custom Carpet Landing Page */

/* Global Styles */
body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  color: #333;
  line-height: 1.5;
}

/* Header Styles */
header {
  position: sticky;
  top: 0;
  z-index: 50;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

/* Hero Section */
.hero-section {
  background: linear-gradient(to right, #f3f4f6, #e5e7eb);
  padding: 4rem 0;
}

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1rem;
}

.hero-description {
  font-size: 1.125rem;
  margin-bottom: 2rem;
}

.hero-image {
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Services Section */
.services-section {
  background-color: #f9fafb;
  padding: 4rem 0;
}

.service-card {
  background-color: white;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.service-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

/* About Section */
.about-section {
  background-color: #f3f4f6;
  padding: 4rem 0;
}

.about-image-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.about-image {
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

/* Testimonials Section */
.testimonials-section {
  background-color: #f9fafb;
  padding: 4rem 0;
}

.testimonial-card {
  background-color: white;
  border-radius: 0.5rem;
  padding: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

/* FAQ Section */
.faq-section {
  background-color: #f3f4f6;
  padding: 4rem 0;
}

.faq-card {
  background-color: white;
  border-radius: 0.5rem;
  overflow: hidden;
}

/* Service Area Section */
.service-area-section {
  background-color: #f9fafb;
  padding: 4rem 0;
}

.map-container {
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

/* Footer */
.footer {
  background-color: #1f2937;
  color: white;
  padding: 3rem 0 1.5rem;
}

.footer-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.footer-link {
  color: #9ca3af;
  transition: color 0.2s ease;
}

.footer-link:hover {
  color: white;
}

.social-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 9999px;
  background-color: #374151;
  color: white;
  transition: background-color 0.2s ease;
}

.social-icon:hover {
  background-color: #4b5563;
}

/* Contact Form */
.contact-form {
  background-color: white;
  border-radius: 0.5rem;
  overflow: hidden;
}

.form-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
}

.form-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  background-color: #2563eb;
  color: white;
  font-weight: 500;
  border-radius: 0.375rem;
  transition: background-color 0.2s ease;
}

.form-button:hover {
  background-color: #1d4ed8;
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.25rem;
  }
  
  .about-image-grid {
    grid-template-columns: 1fr;
  }
}`,
        }}
      />

      {/* Download Button */}
      <div className="fixed bottom-4 right-4 z-50">
        <a
          onClick={downloadLayout}
          className="cursor-pointer inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-orange-400 hover:from-purple-700 hover:to-orange-500 text-white font-medium py-3 px-8 rounded-full shadow-lg"
          style={{
            boxShadow: "0 4px 14px rgba(0, 0, 0, 0.25)",
            transition: "all 0.3s ease",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          <span className="font-semibold">BAIXAR VERSÃO HTML5</span>
        </a>
      </div>
      {/* Header */}
      <Header />

      {/* Main Content with top padding to account for fixed header */}
      <main className="pt-20">
        {/* Hero Section */}
        <HeroSection
          onPrimaryButtonClick={handleGetQuoteClick}
          onSecondaryButtonClick={() =>
            document
              .getElementById("services")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        />

        {/* Services Section */}
        <div id="services">
          <ServicesSection />
        </div>

        {/* About Section */}
        <div id="about">
          <AboutSection />
        </div>

        {/* Testimonials Section */}
        <div id="testimonials">
          <TestimonialsSection />
        </div>

        {/* FAQ Section */}
        <div id="faq">
          <FaqSection />
        </div>

        {/* Service Area Section */}
        <div id="service-area">
          <ServiceAreaSection />
        </div>
      </main>

      {/* Footer */}
      <div id="contact">
        <Footer />
      </div>

      {/* Contact Dialog */}
      <Dialog open={contactDialogOpen} onOpenChange={setContactDialogOpen}>
        <DialogContent className="sm:max-w-[500px] p-0">
          <ContactForm onSubmitSuccess={() => setContactDialogOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
