import Header from "./layout/Header";
import HeroSection from "./sections/HeroSection";
import ServicesSection from "./sections/ServicesSection";
import AboutSection from "./sections/AboutSection";
import TestimonialsSection from "./sections/TestimonialsSection";
import FaqSection from "./sections/FaqSection";
import ServiceAreaSection from "./sections/ServiceAreaSection";
import Footer from "./layout/Footer";

function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <TestimonialsSection />
        <FaqSection />
        <ServiceAreaSection />
      </main>
      <Footer />
    </div>
  );
}

export default Home;
