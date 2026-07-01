import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-base-200 border-t border-base-300 pt-20 pb-10 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand Info */}
          <div className="flex flex-col gap-6">
            <Link to="/" className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-xl text-primary">
                <Leaf className="h-6 w-6" />
              </div>
              <span className="text-3xl font-bold tracking-tight text-primary font-heading">
                Green<span className="text-accent">Thumb</span>
              </span>
            </Link>
            <p className="text-base-content/85 text-sm leading-relaxed max-w-xs">
              Curating unique, healthy plants to bring natural refinement and tranquil energy to your modern living spaces.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-4 mt-2">
              <a href="#" className="p-2.5 rounded-xl bg-base-300 hover:bg-primary hover:text-white transition-all duration-300 text-base-content/85" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="p-2.5 rounded-xl bg-base-300 hover:bg-primary hover:text-white transition-all duration-300 text-base-content/85" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="p-2.5 rounded-xl bg-base-300 hover:bg-primary hover:text-white transition-all duration-300 text-base-content/85" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="flex flex-col gap-5">
            <p className="font-bold text-lg text-primary tracking-wide font-heading">Quick Links</p>
            <ul className="space-y-3.5">
              <li>
                <Link to="/about" className="text-base-content/85 hover:text-primary text-sm transition-colors duration-200">
                  Our Story
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-base-content/85 hover:text-primary text-sm transition-colors duration-200">
                  Get in Touch
                </Link>
              </li>
              <li>
                <Link to="/guide" className="text-base-content/85 hover:text-primary text-sm transition-colors duration-200">
                  Plant Care Guide
                </Link>
              </li>
              <li>
                <a href="#" className="text-base-content/85 hover:text-primary text-sm transition-colors duration-200">
                  FAQ & Support
                </a>
              </li>
            </ul>
          </div>

          {/* Categories Quick Links */}
          <div className="flex flex-col gap-5">
            <p className="font-bold text-lg text-primary tracking-wide font-heading">Categories</p>
            <ul className="space-y-3.5">
              <li>
                <Link to="/category" className="text-base-content/85 hover:text-primary text-sm transition-colors duration-200">
                  Indoor Plants
                </Link>
              </li>
              <li>
                <Link to="/category" className="text-base-content/85 hover:text-primary text-sm transition-colors duration-200">
                  Outdoor Plants
                </Link>
              </li>
              <li>
                <Link to="/category" className="text-base-content/85 hover:text-primary text-sm transition-colors duration-200">
                  Herbs & Veggies
                </Link>
              </li>
              <li>
                <Link to="/category" className="text-base-content/85 hover:text-primary text-sm transition-colors duration-200">
                  Flowering Beauties
                </Link>
              </li>
            </ul>
          </div>

          {/* Direct Contacts */}
          <div className="flex flex-col gap-5">
            <p className="font-bold text-lg text-primary tracking-wide font-heading">Contact Us</p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-base-content/85 text-sm leading-relaxed">
                  1427 Willowfen Court, Cedarridge, OR 97405, United States
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-accent flex-shrink-0" />
                <span className="text-base-content/85 text-sm">(+91) 74651 46654</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-accent flex-shrink-0" />
                <span className="text-base-content/85 text-sm">support@greenthumb.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer Base bar */}
        <div className="border-t border-base-300 mt-16 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-base-content/70 text-sm text-center sm:text-left">
            &copy; {new Date().getFullYear()} GreenThumb Nursery. Crafted for modern sanctuaries.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-base-content/60 hover:text-primary text-sm transition-colors duration-200">Privacy Policy</a>
            <a href="#" className="text-base-content/60 hover:text-primary text-sm transition-colors duration-200">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;