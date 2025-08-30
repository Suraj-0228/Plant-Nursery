import React, { useState } from 'react';
import { Menu, X, ShoppingCart, User, Search, Leaf } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

interface HeaderProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export default function Header({ currentPage, onPageChange }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { totalItems } = useCart();

  const navigation = [
    { name: 'Home', href: 'home' },
    { name: 'Categories', href: 'categories' },
    { name: 'Plant Care Guide', href: 'care-guide' },
    { name: 'About', href: 'about' },
    { name: 'Contact', href: 'contact' },
  ];

  const handlePageChange = (page: string) => {
    onPageChange(page);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50 animate-slide-down">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer"
            onClick={() => handlePageChange('home')}
          >
            <Leaf className="h-6 w-6 sm:h-8 sm:w-8 text-green-600 mr-2" />
            <span className="text-lg sm:text-xl font-bold text-gray-900 hidden sm:inline">GreenThumb Nursery</span>
            <span className="text-lg font-bold text-gray-900 sm:hidden">GreenThumb</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-6 xl:space-x-8">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => handlePageChange(item.href)}
                className={`${
                  currentPage === item.href
                    ? 'text-green-600 border-b-2 border-green-600'
                    : 'text-gray-700 hover:text-green-600'
                } px-2 xl:px-3 py-2 text-sm font-medium transition-all duration-200 hover:scale-105`}
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Right side icons */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <Search className="h-5 w-5 text-gray-600 cursor-pointer hover:text-green-600 transition-all duration-200 transform hover:scale-110" />
            
            <div className="relative">
              <ShoppingCart 
                className="h-5 w-5 text-gray-600 cursor-pointer hover:text-green-600 transition-all duration-200 transform hover:scale-110"
                onClick={() => handlePageChange('cart')}
              />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 h-4 w-4 bg-green-600 text-white text-xs rounded-full flex items-center justify-center animate-bounce">
                  {totalItems}
                </span>
              )}
            </div>

            {user ? (
              <div className="relative group">
                <div className="flex items-center space-x-2 cursor-pointer">
                  <User className="h-5 w-5 text-gray-600 group-hover:text-green-600 transition-all duration-200 transform group-hover:scale-110" />
                  <span className="hidden md:block text-sm text-gray-700">
                    {user.fullName.split(' ')[0]}
                  </span>
                </div>
                <div className="absolute right-0 mt-2 w-44 sm:w-48 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform scale-95 group-hover:scale-100">
                  <button
                    onClick={() => handlePageChange('dashboard')}
                    className="block w-full px-4 py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-100 text-left transition-colors"
                  >
                    My Account
                  </button>
                  <button
                    onClick={() => handlePageChange('wishlist')}
                    className="block w-full px-4 py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-100 text-left transition-colors"
                  >
                    Wishlist
                  </button>
                  <button
                    onClick={logout}
                    className="block w-full px-4 py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-100 text-left transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-2 text-sm">
                <button
                  onClick={() => handlePageChange('login')}
                  className="text-gray-700 hover:text-green-600 transition-all duration-200 transform hover:scale-105"
                >
                  Sign In
                </button>
                <span className="text-gray-400">|</span>
                <button
                  onClick={() => handlePageChange('register')}
                  className="text-gray-700 hover:text-green-600 transition-all duration-200 transform hover:scale-105"
                >
                  Sign Up
                </button>
              </div>
            )}

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-600 hover:text-green-600 transition-all duration-200 transform hover:scale-110"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden animate-slide-down">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t shadow-lg">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => handlePageChange(item.href)}
                className={`${
                  currentPage === item.href
                    ? 'text-green-600 bg-green-50'
                    : 'text-gray-700 hover:text-green-600 hover:bg-gray-50'
                } block w-full text-left px-3 py-2 rounded-md text-sm sm:text-base font-medium transition-all duration-200`}
              >
                {item.name}
              </button>
            ))}
            {!user && (
              <div className="pt-3 border-t">
                <button
                  onClick={() => handlePageChange('login')}
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:text-green-600 hover:bg-gray-50 rounded-md text-sm sm:text-base font-medium transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={() => handlePageChange('register')}
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:text-green-600 hover:bg-gray-50 rounded-md text-sm sm:text-base font-medium transition-colors"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}