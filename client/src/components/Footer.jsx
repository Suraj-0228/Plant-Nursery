import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-base-300 text-base-content pt-16 pb-8 shadow-inner">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <Leaf className='text-primary h-10 w-10'/>
              <span className="text-4xl font-bold text-primary">GreenThumb</span>
            </Link>
            <p className="mt-4 text-base-content/80 leading-relaxed">
              Your one-stop shop for all things green and beautiful. Find the perfect plants for your home and garden.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <p className="font-bold text-xl mb-6 text-base-content">Quick Links</p>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-base-content/80 hover:text-primary transition-colors duration-200">About Us</Link></li>
              <li><Link to="/contact" className="text-base-content/80 hover:text-primary transition-colors duration-200">Contact</Link></li>
              <li><Link to="/guide" className="text-base-content/80 hover:text-primary transition-colors duration-200">Plant Care Guide</Link></li>
              <li><a href="#" className="text-base-content/80 hover:text-primary transition-colors duration-200">FAQ</a></li>
            </ul>
          </div>

          {/* Plant Categories */}
          <div>
            <p className="font-bold text-xl mb-6 text-base-content">Categories</p>
            <ul className="space-y-3">
              <li><Link to="/category" className="text-base-content/80 hover:text-primary transition-colors duration-200">Indoor Plants</Link></li>
              <li><Link to="/category" className="text-base-content/80 hover:text-primary transition-colors duration-200">Outdoor Plants</Link></li>
              <li><Link to="/category" className="text-base-content/80 hover:text-primary transition-colors duration-200">Herbs & Veggies</Link></li>
              <li><Link to="/category" className="text-base-content/80 hover:text-primary transition-colors duration-200">Flowering Plants</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <p className="font-bold text-xl mb-6 text-base-content">Get in Touch</p>
            <ul className="space-y-3 text-base-content/80">
              <li>1427 Willowfen, Court Cedarridge, OR 97405 United States — Fictiona.</li>
              <li>(+91) 74651 46654</li>
              <li>greenthumb@plantnursery.com</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-base-400 mt-12 pt-8 text-center">
          <p className="text-base-content/70 text-sm">&copy; {new Date().getFullYear()} GreenThumb Nursery. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;