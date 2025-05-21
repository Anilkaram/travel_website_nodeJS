import { Link } from "wouter";
import { Globe, MapPin, Mail, Phone, Clock, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center mb-4">
              <Globe className="text-white text-2xl mr-2" />
              <span className="font-poppins font-bold text-xl text-white">TravelEase</span>
            </div>
            <p className="mb-4">
              Book your travel appointments online without phone calls or emails. Find the best destinations and accommodations for your next trip.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-primary transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-primary transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-primary transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-primary transition-colors">
                <Linkedin size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><a href="#destinations" className="hover:text-white transition-colors">Destinations</a></li>
              <li><a href="#hotels" className="hover:text-white transition-colors">Hotels</a></li>
              <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><Link href="/" className="hover:text-white transition-colors">About Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg text-white mb-4">Popular Destinations</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">Bali, Indonesia</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Paris, France</a></li>
              <li><a href="#" className="hover:text-white transition-colors">New York, USA</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Santorini, Greece</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Tokyo, Japan</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Sydney, Australia</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg text-white mb-4">Contact Information</h4>
            <ul className="space-y-2">
              <li className="flex items-start">
                <MapPin className="mt-1 mr-3" size={18} />
                <span>123 Travel Street, Booking City, 10001</span>
              </li>
              <li className="flex items-start">
                <Mail className="mt-1 mr-3" size={18} />
                <span>contact@travelease.com</span>
              </li>
              <li className="flex items-start">
                <Phone className="mt-1 mr-3" size={18} />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start">
                <Clock className="mt-1 mr-3" size={18} />
                <span>Mon-Fri: 9AM - 6PM</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>&copy; {new Date().getFullYear()} TravelEase. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
