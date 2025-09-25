import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-base-200">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className='ms-10'>
            <Link to="/" className="block text-primary">
              <span className="text-2xl font-bold">GreenThumb Nursery</span>
            </Link>
            <p className="mt-4 max-w-xs text-base-content">
              Your one-stop shop for all things green and beautiful. Find the perfect plants for your home and garden.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-3">
            <div>
              <p className="font-medium text-base-content text-2xl">Quick Links</p>
              <ul className="mt-6 space-y-4">
                <li><Link to="/about" className="text-base-content transition hover:text-primary">About</Link></li>
                <li><Link to="/contact" className="text-base-content transition hover:text-primary">Contact</Link></li>
                <li><a href="#" className="text-base-content transition hover:text-primary">FAQ</a></li>
              </ul>
            </div>

            <div>
              <p className="font-medium text-base-content text-2xl">Plant Categories</p>
              <ul className="mt-6 space-y-4">
                <li><Link to="/category" className="text-base-content transition hover:text-primary">Indoor Plants</Link></li>
                <li><Link to="/category" className="text-base-content transition hover:text-primary">Outdoor Plants</Link></li>
                <li><Link to="/category" className="text-base-content transition hover:text-primary">Herbs & Vegetables</Link></li>
                <li><Link to="/category" className="text-base-content transition hover:text-primary">Flowers</Link></li>
              </ul>
            </div>

            <div>
              <p className="font-medium text-base-content text-2xl">Care Resources</p>
              <ul className="mt-6 space-y-4">
                <li><Link to="/guide" className="text-base-content transition hover:text-primary">Plant Care Guides</Link></li>
                <li><Link to="/guide" className="text-base-content transition hover:text-primary">Seasonal Tips</Link></li>
                <li><Link to="/guide" className="text-base-content transition hover:text-primary">Common Problems</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-base-300 pt-8">
          <div className="text-center">
            <p className="text-lg text-base-content">&copy; 2025 Plant Nursery. All rights reserved.</p>
            {/* Social media links can be added here */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
