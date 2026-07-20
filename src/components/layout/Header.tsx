import React from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Menu, Search, ShoppingCart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  logo?: string;
  navigationItems?: Array<{ label: string; href: string }>;
  carpetCategories?: Array<{ label: string; href: string }>;
}

const Header = ({
  logo = "/vite.svg",
  navigationItems = [
    { label: "Início", href: "/" },
    { label: "Produtos", href: "/products" },
    { label: "Serviços", href: "/services" },
    { label: "Galeria", href: "/gallery" },
    { label: "Sobre", href: "/about" },
    { label: "Contato", href: "/contact" },
  ],
  carpetCategories = [
    { label: "Residencial", href: "/category/residential" },
    { label: "Comercial", href: "/category/commercial" },
    { label: "Design Personalizado", href: "/category/custom-design" },
    { label: "Ecológico", href: "/category/eco-friendly" },
    { label: "Luxo", href: "/category/luxury" },
  ],
}: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Custom Carpets Logo" className="h-10 w-auto" />
            <span className="ml-2 text-xl font-bold text-gray-800">
              Carpetes Personalizados
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navigationItems.map((item, index) => (
            <Link
              key={index}
              to={item.href}
              className="text-gray-600 hover:text-primary transition-colors"
            >
              {item.label}
            </Link>
          ))}

          {/* Category Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-1">
                Categorias <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {carpetCategories.map((category, index) => (
                <DropdownMenuItem key={index} asChild>
                  <Link to={category.href} className="w-full">
                    {category.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" size="icon" aria-label="Pesquisar">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Perfil do usuário">
            <User className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Carrinho de compras">
            <ShoppingCart className="h-5 w-5" />
          </Button>
          <Button variant="default" className="ml-2">
            Solicitar Orçamento
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button variant="ghost" size="icon" className="md:hidden" aria-label="Menu principal">
          <Menu className="h-6 w-6" />
        </Button>
      </div>
    </header>
  );
};

export default Header;
