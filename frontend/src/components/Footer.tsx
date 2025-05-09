
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center space-x-2 text-xl font-medium mb-6">
              <span className="flex items-center">
                <span className="text-primary font-bold">Clear</span>
                <span className="font-semibold">Call</span>
                <Phone className="inline-block ml-1.5 h-4 w-4 text-primary" />
              </span>
            </Link>
            
            <p className="text-gray-600 mb-6">
              Transforming customer support with AI-powered voice solutions for businesses of all sizes.
            </p>
            
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-base font-semibold mb-6">Company</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-primary transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-600 hover:text-primary transition-colors">Careers</Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-600 hover:text-primary transition-colors">Blog</Link>
              </li>
              <li>
                <Link to="/press" className="text-gray-600 hover:text-primary transition-colors">Press</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-base font-semibold mb-6">Resources</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/documentation" className="text-gray-600 hover:text-primary transition-colors">Documentation</Link>
              </li>
              <li>
                <Link to="/pricing" className="text-gray-600 hover:text-primary transition-colors">Pricing</Link>
              </li>
              <li>
                <Link to="/support" className="text-gray-600 hover:text-primary transition-colors">Support</Link>
              </li>
              <li>
                <Link to="/learn" className="text-gray-600 hover:text-primary transition-colors">Learn</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-base font-semibold mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={20} className="text-primary shrink-0 mr-3 mt-0.5" />
                <span className="text-gray-600">
                  123 AI Avenue, Tech Park<br />
                  San Francisco, CA 94103
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="text-primary shrink-0 mr-3" />
                <a href="tel:+1234567890" className="text-gray-600 hover:text-primary transition-colors">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="text-primary shrink-0 mr-3" />
                <a href="mailto:info@clearcall.com" className="text-gray-600 hover:text-primary transition-colors">
                  info@clearcall.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-100 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} ClearCall. All rights reserved.
          </p>
          
          <div className="flex space-x-6">
            <Link to="/terms" className="text-gray-500 hover:text-primary text-sm transition-colors">
              Terms of Service
            </Link>
            <Link to="/privacy" className="text-gray-500 hover:text-primary text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="/cookies" className="text-gray-500 hover:text-primary text-sm transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
