import React from 'react';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Plant } from '../data/plants';
import { useCart } from '../contexts/CartContext';
import { formatPrice } from '../utils/currency';

interface PlantCardProps {
  plant: Plant;
  onPlantSelect?: (plantId: string) => void;
}

export default function PlantCard({ plant, onPlantSelect }: PlantCardProps) {
  const { addToCart } = useCart();

  const getCareColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'text-green-600 bg-green-100';
      case 'Intermediate': return 'text-yellow-600 bg-yellow-100';
      case 'Advanced': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getLightIcon = (requirement: string) => {
    const baseClass = "w-2 h-2 rounded-full";
    switch (requirement) {
      case 'Low': return <div className={`${baseClass} bg-yellow-300`}></div>;
      case 'Medium': return (
        <div className="flex space-x-1">
          <div className={`${baseClass} bg-yellow-400`}></div>
          <div className={`${baseClass} bg-yellow-400`}></div>
        </div>
      );
      case 'High': return (
        <div className="flex space-x-1">
          <div className={`${baseClass} bg-yellow-500`}></div>
          <div className={`${baseClass} bg-yellow-500`}></div>
          <div className={`${baseClass} bg-yellow-500`}></div>
        </div>
      );
      default: return null;
    }
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer transform hover:-translate-y-1 animate-fade-in"
      onClick={() => onPlantSelect?.(plant.id)}
    >
      <div className="relative">
        <img
          src={plant.image}
          alt={plant.name}
          className="w-full h-48 sm:h-56 md:h-48 object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://images.pexels.com/photos/1400375/pexels-photo-1400375.jpeg?auto=compress&cs=tinysrgb&w=500';
          }}
        />
        <button 
          onClick={(e) => e.stopPropagation()}
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-gray-50 hover:scale-110"
        >
          <Heart className="w-4 h-4 text-gray-600 hover:text-red-500 transition-colors" />
        </button>
        <div className="absolute top-2 left-2">
          <span className={`px-2 py-1 text-xs rounded-full ${getCareColor(plant.careLevel)}`}>
            {plant.careLevel}
          </span>
        </div>
      </div>

      <div className="p-3 sm:p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 group-hover:text-green-600 transition-colors line-clamp-1">
            {plant.name}
          </h3>
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600 ml-1">4.5</span>
          </div>
        </div>

        <p className="text-gray-600 text-xs sm:text-sm mb-3 line-clamp-2">
          {plant.description}
        </p>

        <div className="flex items-center justify-between mb-3 text-xs text-gray-500 flex-wrap gap-1">
          <div className="flex items-center space-x-2">
            <span>Light:</span>
            {getLightIcon(plant.lightRequirement)}
          </div>
          <span className="hidden sm:inline">Water: {plant.waterFrequency}</span>
          <span className="capitalize text-xs">{plant.size}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-lg sm:text-xl font-bold text-green-600">
            {formatPrice(plant.price)}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(plant);
            }}
            className="flex items-center space-x-1 bg-green-600 text-white px-2 sm:px-3 py-2 rounded-md hover:bg-green-700 transition-all duration-200 hover:scale-105 text-sm"
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="hidden sm:inline">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}