import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import useMobile from "@/hooks/use-mobile";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useMobile();
  const [location] = useLocation();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navItems = [
    { label: "Destinations", href: "#destinations" },
    { label: "Hotels", href: "#hotels" },
    { label: "How it Works", href: "#how-it-works" },
    { label: "About", href: "#" },
  ];

  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 flex justify-between items-center h-16 md:h-20">
        <Link href="/" className="flex items-center">
          <Globe className="text-primary text-2xl mr-2" />
          <span className="font-poppins font-bold text-xl text-primary">TravelEase</span>
        </Link>
        
        {/* Desktop Navigation */}
        {!isMobile && (
          <nav className="flex items-center space-x-8">
            {navItems.map((item) => (
              <a 
                key={item.label} 
                href={item.href} 
                className="font-medium hover:text-primary transition-colors"
              >
                {item.label}
              </a>
            ))}
            <Link href="#contact">
              <Button className="bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                Book Now
              </Button>
            </Link>
          </nav>
        )}
        
        {/* Mobile Menu Button */}
        {isMobile && (
          <button 
            className="text-gray-500 focus:outline-none" 
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <i className="fas fa-bars text-2xl"></i>
          </button>
        )}
      </div>
      
      {/* Mobile Navigation */}
      {isMobile && mobileMenuOpen && (
        <div className="bg-white">
          <div className="container mx-auto px-4 py-3 space-y-3">
            {navItems.map((item) => (
              <a 
                key={item.label} 
                href={item.href} 
                className="block font-medium hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <Link href="#contact" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary/90 transition-colors text-center mt-4">
                Book Now
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
