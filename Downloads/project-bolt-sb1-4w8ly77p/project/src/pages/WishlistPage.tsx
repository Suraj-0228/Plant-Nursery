import React, { useState } from 'react';
import { Heart, ShoppingCart, ArrowLeft, Trash2 } from 'lucide-react';
import { plants } from '../data/plants';
import { useCart } from '../contexts/CartContext';
import PlantCard from '../components/PlantCard';
import { formatPrice } from '../utils/currency';

interface WishlistPageProps {
  onPageChange: (page: string) => void;
  onPlantSelect?: (plantId: string) => void;
}

export default function WishlistPage({ onPageChange, onPlantSelect }: WishlistPageProps) {
  // Mock wishlist - in real app, this would come from context/database
  const [wishlistItems, setWishlistItems] = useState([
    plants[0], // Monstera Deliciosa
    plants[2], // Fiddle Leaf Fig
    plants[6], // Lavender
  ]);

  const { addToCart } = useCart();

  const removeFromWishlist = (plantId: string) => {
    setWishlistItems(items => items.filter(item => item.id !== plantId));
  };

  const addAllToCart = () => {
    wishlistItems.forEach(plant => addToCart(plant));
    alert('All items added to cart!');
  };

  const clearWishlist = () => {
    if (window.confirm('Are you sure you want to clear your entire wishlist?')) {
      setWishlistItems([]);
    }
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-4 sm:py-8 animate-fade-in">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6 sm:mb-8 gap-4">
            <button
              onClick={() => onPageChange('categories')}
              className="flex items-center text-green-600 hover:text-green-700 mr-4"
            >
              <ArrowLeft className="w-5 h-5 mr-1" />
              Continue Shopping
            </button>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Wishlist</h1>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 sm:p-8 text-center animate-scale-in">
            <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-6 text-sm sm:text-base">
              Start browsing and add plants to your wishlist to save them for later. 
              Click the heart icon on any plant card to add it to your favorites.
            </p>
            <button
              onClick={() => onPageChange('categories')}
              className="bg-green-600 text-white px-6 sm:px-8 py-3 rounded-lg hover:bg-green-700 transition-all duration-200 inline-flex items-center transform hover:scale-105"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Start Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-6 sm:mb-8 gap-4 animate-slide-in-left">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <button
              onClick={() => onPageChange('categories')}
              className="flex items-center text-green-600 hover:text-green-700 mr-4"
            >
              <ArrowLeft className="w-5 h-5 mr-1" />
              Continue Shopping
            </button>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Wishlist</h1>
              <p className="text-gray-600 mt-1 text-sm sm:text-base">{wishlistItems.length} saved plants</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 w-full lg:w-auto">
            <button
              onClick={addAllToCart}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all duration-200 flex items-center justify-center transform hover:scale-105 text-sm sm:text-base"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add All to Cart
            </button>
            <button
              onClick={clearWishlist}
              className="border border-red-600 text-red-600 px-4 py-2 rounded-lg hover:bg-red-50 transition-all duration-200 transform hover:scale-105 text-sm sm:text-base"
            >
              Clear All
            </button>
          </div>
        </div>

        {/* Wishlist Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {wishlistItems.map((plant, index) => (
            <div 
              key={plant.id} 
              className="relative animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <PlantCard plant={plant} onPlantSelect={onPlantSelect} />
              <button
                onClick={() => removeFromWishlist(plant.id)}
                className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-all duration-200 z-10 transform hover:scale-110"
                title="Remove from wishlist"
              >
                <Trash2 className="w-4 h-4 text-red-500" />
              </button>
            </div>
          ))}
        </div>

        {/* Wishlist Actions */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Wishlist Actions</h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={addAllToCart}
              className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-all duration-200 flex items-center justify-center transform hover:scale-105 text-sm sm:text-base"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Add All to Cart ({formatPrice(wishlistItems.reduce((total, plant) => total + plant.price, 0))})
            </button>
            
            <button className="flex-1 border border-green-600 text-green-600 py-3 px-4 rounded-lg hover:bg-green-50 transition-all duration-200 transform hover:scale-105 text-sm sm:text-base">
              Share Wishlist
            </button>
            
            <button className="flex-1 border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-all duration-200 transform hover:scale-105 text-sm sm:text-base">
              Save for Later
            </button>
          </div>
        </div>

        {/* Recommendations */}
        <div className="mt-8 sm:mt-12">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 animate-fade-in">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {plants.slice(4, 8).map((plant, index) => (
              <div
                key={plant.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <PlantCard plant={plant} onPlantSelect={onPlantSelect} />
              </div>
            ))}
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-8 sm:mt-12 bg-green-900 text-white rounded-lg p-6 sm:p-8 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-xl sm:text-2xl font-bold mb-4">💡 Wishlist Tips</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 text-green-100">
              <div>
                <h3 className="font-semibold mb-2 text-sm sm:text-base">Save for Seasons</h3>
                <p className="text-xs sm:text-sm">Add plants to your wishlist and wait for the right planting season.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-sm sm:text-base">Track Prices</h3>
                <p className="text-xs sm:text-sm">We'll notify you when items in your wishlist go on sale.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-sm sm:text-base">Plan Your Garden</h3>
                <p className="text-xs sm:text-sm">Use your wishlist to plan and budget for your dream garden.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}