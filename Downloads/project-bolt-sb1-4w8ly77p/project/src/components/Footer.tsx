import React from 'react';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';

interface FooterProps {
  onPageChange: (page: string) => void;
}

export default function Footer({ onPageChange }: FooterProps) {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-green-400">GreenThumb Nursery</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Your trusted partner in creating beautiful, sustainable gardens. 
              We've been nurturing plants and communities since 1995.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-5 h-5 text-gray-400 hover:text-green-400 cursor-pointer transition-colors" />
              <Instagram className="w-5 h-5 text-gray-400 hover:text-green-400 cursor-pointer transition-colors" />
              <Twitter className="w-5 h-5 text-gray-400 hover:text-green-400 cursor-pointer transition-colors" />
              <Youtube className="w-5 h-5 text-gray-400 hover:text-green-400 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => onPageChange('home')}
                  className="text-gray-300 hover:text-green-400 transition-colors text-sm"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onPageChange('categories')}
                  className="text-gray-300 hover:text-green-400 transition-colors text-sm"
                >
                  Categories
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onPageChange('care-guide')}
                  className="text-gray-300 hover:text-green-400 transition-colors text-sm"
                >
                  Plant Care Guide
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onPageChange('about')}
                  className="text-gray-300 hover:text-green-400 transition-colors text-sm"
                >
                  About Us
                </button>
              </li>
            </ul>
          </div>

          {/* Plant Categories */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Plant Categories</h4>
            <ul className="space-y-2">
              <li>
                <span className="text-gray-300 text-sm cursor-pointer hover:text-green-400 transition-colors">
                  Indoor Plants
                </span>
              </li>
              <li>
                <span className="text-gray-300 text-sm cursor-pointer hover:text-green-400 transition-colors">
                  Outdoor Plants
                </span>
              </li>
              <li>
                <span className="text-gray-300 text-sm cursor-pointer hover:text-green-400 transition-colors">
                  Herbs & Vegetables
                </span>
              </li>
              <li>
                <span className="text-gray-300 text-sm cursor-pointer hover:text-green-400 transition-colors">
                  Flowers
                </span>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-green-400" />
                <span className="text-gray-300 text-sm">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-green-400" />
                <span className="text-gray-300 text-sm">info@greenthumb.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-green-400 mt-0.5" />
                <span className="text-gray-300 text-sm">
                  123 Garden Street<br />
                  Mumbai, Maharashtra 400001
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="max-w-md mx-auto text-center">
            <h4 className="text-lg font-semibold mb-2">Stay Updated</h4>
            <p className="text-gray-300 text-sm mb-4">
              Get the latest plant care tips and exclusive offers delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 GreenThumb Nursery. All rights reserved. | Privacy Policy | Terms of Service
          </p>
        </div>
      </div>
    </footer>
  );
}