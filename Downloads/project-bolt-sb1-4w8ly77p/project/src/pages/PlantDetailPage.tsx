import React, { useState } from 'react';
import { ArrowLeft, Heart, ShoppingCart, Star, Droplets, Sun, Thermometer, Calendar, Info, Shield, Truck } from 'lucide-react';
import { plants, Plant } from '../data/plants';
import { useCart } from '../contexts/CartContext';
import PlantCard from '../components/PlantCard';
import { formatPrice } from '../utils/currency';

interface PlantDetailPageProps {
  plantId: string;
  onPageChange: (page: string) => void;
  onPlantSelect: (plantId: string) => void;
}

export default function PlantDetailPage({ plantId, onPageChange, onPlantSelect }: PlantDetailPageProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('overview');
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  const { addToCart } = useCart();
  
  const plant = plants.find(p => p.id === plantId);
  
  if (!plant) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 animate-fade-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Plant Not Found</h1>
            <button
              onClick={() => onPageChange('categories')}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
            >
              Browse All Plants
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Mock additional images for gallery
  const plantImages = [
    plant.image,
    'https://images.pexels.com/photos/6208087/pexels-photo-6208087.jpeg?auto=compress&cs=tinysrgb&w=500',
    'https://images.pexels.com/photos/4505170/pexels-photo-4505170.jpeg?auto=compress&cs=tinysrgb&w=500',
    'https://images.pexels.com/photos/1400374/pexels-photo-1400374.jpeg?auto=compress&cs=tinysrgb&w=500'
  ];

  const relatedPlants = plants
    .filter(p => p.category === plant.category && p.id !== plant.id)
    .slice(0, 4);

  const getCareColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'text-green-600 bg-green-100';
      case 'Intermediate': return 'text-yellow-600 bg-yellow-100';
      case 'Advanced': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(plant);
    }
    alert(`Added ${quantity} ${plant.name}${quantity > 1 ? 's' : ''} to cart!`);
  };

  const careInstructions = {
    watering: {
      frequency: plant.waterFrequency,
      details: plant.waterFrequency === 'Daily' 
        ? 'Water when top inch of soil feels dry. Ensure good drainage to prevent root rot.'
        : plant.waterFrequency === 'Weekly'
        ? 'Water thoroughly once a week, allowing excess water to drain. Check soil moisture before watering.'
        : 'Water every 2 weeks or when soil is completely dry. These plants prefer to dry out between waterings.'
    },
    light: {
      requirement: plant.lightRequirement,
      details: plant.lightRequirement === 'High'
        ? 'Needs bright, direct sunlight for 6+ hours daily. Place near south-facing windows.'
        : plant.lightRequirement === 'Medium'
        ? 'Thrives in bright, indirect light. East or west-facing windows are ideal.'
        : 'Tolerates low light conditions. Perfect for north-facing windows or interior spaces.'
    },
    temperature: '65-75°F (18-24°C)',
    humidity: '40-60%',
    fertilizer: 'Monthly during growing season (spring/summer)',
    repotting: 'Every 2-3 years or when rootbound'
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'care', label: 'Care Instructions' },
    { id: 'specifications', label: 'Specifications' },
    { id: 'reviews', label: 'Reviews (24)' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6 animate-slide-in-left">
          <button
            onClick={() => onPageChange('home')}
            className="hover:text-green-600 transition-colors"
          >
            Home
          </button>
          <span>/</span>
          <button
            onClick={() => onPageChange('categories')}
            className="hover:text-green-600 transition-colors"
          >
            Categories
          </button>
          <span>/</span>
          <span className="text-gray-900 truncate">{plant.name}</span>
        </div>

        {/* Back Button */}
        <button
          onClick={() => onPageChange('categories')}
          className="flex items-center text-green-600 hover:text-green-700 mb-6 sm:mb-8 transition-all duration-200 transform hover:scale-105 animate-slide-in-left"
          style={{ animationDelay: '0.2s' }}
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Categories
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 mb-8 sm:mb-12">
          {/* Image Gallery */}
          <div className="animate-slide-in-left">
            <div className="mb-3 sm:mb-4">
              <img
                src={plantImages[selectedImage]}
                alt={plant.name}
                className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-lg shadow-lg transition-all duration-300"
                loading="lazy"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://images.pexels.com/photos/1400375/pexels-photo-1400375.jpeg?auto=compress&cs=tinysrgb&w=600';
                }}
              />
            </div>
            <div className="grid grid-cols-4 gap-2 sm:gap-3">
              {plantImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative rounded-md overflow-hidden transition-all duration-200 ${
                    selectedImage === index ? 'ring-2 ring-green-600' : ''
                  } hover:ring-2 hover:ring-green-400`}
                >
                  <img
                    src={image}
                    alt={`${plant.name} view ${index + 1}`}
                    className="w-full h-16 sm:h-20 object-cover hover:opacity-80 transition-opacity"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://images.pexels.com/photos/1400375/pexels-photo-1400375.jpeg?auto=compress&cs=tinysrgb&w=500';
                    }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Plant Information */}
          <div className="animate-slide-in-right">
            <div className="mb-4 sm:mb-6">
              <span className="text-sm text-green-600 font-medium">{plant.category}</span>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1 mb-2">{plant.name}</h1>
              <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                  <span className="ml-2 text-xs sm:text-sm text-gray-600">(4.8) • 24 reviews</span>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${getCareColor(plant.careLevel)}`}>
                  {plant.careLevel}
                </span>
              </div>
            </div>

            <p className="text-gray-700 text-sm sm:text-lg mb-4 sm:mb-6 leading-relaxed">
              {plant.description}
            </p>

            {/* Quick Care Info */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6 p-3 sm:p-4 bg-gray-100 rounded-lg">
              <div className="text-center">
                <Sun className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500 mx-auto mb-1" />
                <div className="text-xs text-gray-600">Light</div>
                <div className="text-xs sm:text-sm font-medium">{plant.lightRequirement}</div>
              </div>
              <div className="text-center">
                <Droplets className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500 mx-auto mb-1" />
                <div className="text-xs text-gray-600">Water</div>
                <div className="text-xs sm:text-sm font-medium">{plant.waterFrequency}</div>
              </div>
              <div className="text-center">
                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-500 rounded-full mx-auto mb-1"></div>
                <div className="text-xs text-gray-600">Size</div>
                <div className="text-xs sm:text-sm font-medium">{plant.size}</div>
              </div>
            </div>

            {/* Price and Actions */}
            <div className="border-t border-gray-200 pt-4 sm:pt-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-2">
                <div>
                  <span className="text-2xl sm:text-3xl font-bold text-green-600">{formatPrice(plant.price)}</span>
                  <span className="text-gray-500 text-xs sm:text-sm block sm:inline sm:ml-2">Free shipping on orders over ₹4000</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 mb-4 sm:mb-6">
                <div className="flex items-center border border-gray-300 rounded-lg bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 hover:bg-gray-100 transition-colors rounded-l-lg"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-x border-gray-300 min-w-[3rem] text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 hover:bg-gray-100 transition-colors rounded-r-lg"
                  >
                    +
                  </button>
                </div>
                <span className="text-xs sm:text-sm text-green-600 font-medium">✓ In stock</span>
              </div>

              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mb-4 sm:mb-6">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-green-600 text-white py-3 px-4 sm:px-6 rounded-lg hover:bg-green-700 transition-all duration-200 flex items-center justify-center transform hover:scale-105"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </button>
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`p-3 border rounded-lg transition-all duration-200 transform hover:scale-105 ${
                    isWishlisted 
                      ? 'border-red-500 text-red-500 bg-red-50' 
                      : 'border-gray-300 text-gray-600 hover:border-red-500 hover:text-red-500'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Trust Signals */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-xs sm:text-sm">
                <div className="flex items-center text-gray-600">
                  <Shield className="w-4 h-4 mr-2 text-green-600" />
                  30-day guarantee
                </div>
                <div className="flex items-center text-gray-600">
                  <Truck className="w-4 h-4 mr-2 text-green-600" />
                  Free delivery over ₹4000
                </div>
                <div className="flex items-center text-gray-600">
                  <Info className="w-4 h-4 mr-2 text-green-600" />
                  Expert care support
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Information Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-8 sm:mb-12 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <div className="border-b border-gray-200">
            <nav className="flex space-x-4 sm:space-x-8 px-4 sm:px-6 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-3 sm:py-4 px-1 border-b-2 font-medium text-xs sm:text-sm transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-green-600 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-4 sm:p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3">About This Plant</h3>
                  <p className="text-gray-700 leading-relaxed mb-4 text-sm sm:text-base">
                    {plant.description} This beautiful {plant.name.toLowerCase()} is perfect for 
                    {plant.careLevel === 'Beginner' ? ' beginners and experienced gardeners alike' : 
                     plant.careLevel === 'Intermediate' ? ' those with some gardening experience' : 
                     ' experienced plant enthusiasts'}. 
                    With proper care, this plant will thrive and bring natural beauty to your space.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 text-sm sm:text-base">Key Features</h4>
                    <ul className="space-y-2 text-gray-700 text-sm sm:text-base">
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2"></span>
                        {plant.careLevel} care level - perfect for your experience
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2"></span>
                        {plant.lightRequirement} light requirements
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2"></span>
                        {plant.size} size when mature
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2"></span>
                        Watering needed {plant.waterFrequency.toLowerCase()}
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 text-sm sm:text-base">Benefits</h4>
                    <ul className="space-y-2 text-gray-700 text-sm sm:text-base">
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2"></span>
                        Improves indoor air quality
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2"></span>
                        Reduces stress and anxiety
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2"></span>
                        Adds natural beauty to your space
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2"></span>
                        Low maintenance and long-lasting
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Care Instructions Tab */}
            {activeTab === 'care' && (
              <div className="space-y-6 sm:space-y-8">
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">Complete Care Guide</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-4 sm:space-y-6">
                      <div className="flex items-start space-x-3 sm:space-x-4 p-3 sm:p-4 bg-blue-50 rounded-lg">
                        <Droplets className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">Watering</h4>
                          <p className="text-xs sm:text-sm text-gray-700 mb-2">
                            <strong>Frequency:</strong> {careInstructions.watering.frequency}
                          </p>
                          <p className="text-xs sm:text-sm text-gray-600">
                            {careInstructions.watering.details}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3 sm:space-x-4 p-3 sm:p-4 bg-yellow-50 rounded-lg">
                        <Sun className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">Light Requirements</h4>
                          <p className="text-xs sm:text-sm text-gray-700 mb-2">
                            <strong>Level:</strong> {careInstructions.light.requirement}
                          </p>
                          <p className="text-xs sm:text-sm text-gray-600">
                            {careInstructions.light.details}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3 sm:space-x-4 p-3 sm:p-4 bg-red-50 rounded-lg">
                        <Thermometer className="w-5 h-5 sm:w-6 sm:h-6 text-red-600 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">Temperature & Humidity</h4>
                          <p className="text-xs sm:text-sm text-gray-700 mb-1">
                            <strong>Temperature:</strong> {careInstructions.temperature}
                          </p>
                          <p className="text-xs sm:text-sm text-gray-700">
                            <strong>Humidity:</strong> {careInstructions.humidity}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4 sm:space-y-6">
                      <div className="p-3 sm:p-4 bg-green-50 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center text-sm sm:text-base">
                          <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-green-600" />
                          Care Schedule
                        </h4>
                        <div className="space-y-2 text-xs sm:text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Watering:</span>
                            <span className="font-medium">{plant.waterFrequency}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Fertilizing:</span>
                            <span className="font-medium">{careInstructions.fertilizer}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Repotting:</span>
                            <span className="font-medium">{careInstructions.repotting}</span>
                          </div>
                        </div>
                      </div>

                      <div className="p-3 sm:p-4 bg-purple-50 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-3 text-sm sm:text-base">Pro Tips</h4>
                        <ul className="space-y-2 text-xs sm:text-sm text-gray-700">
                          <li className="flex items-start">
                            <span className="w-2 h-2 bg-purple-500 rounded-full mr-2 mt-2"></span>
                            Rotate weekly for even growth
                          </li>
                          <li className="flex items-start">
                            <span className="w-2 h-2 bg-purple-500 rounded-full mr-2 mt-2"></span>
                            Wipe leaves monthly to remove dust
                          </li>
                          <li className="flex items-start">
                            <span className="w-2 h-2 bg-purple-500 rounded-full mr-2 mt-2"></span>
                            Watch for yellowing leaves as overwatering sign
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Specifications Tab */}
            {activeTab === 'specifications' && (
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">Plant Specifications</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4 text-sm sm:text-base">General Information</h4>
                    <dl className="space-y-3 text-sm sm:text-base">
                      <div className="flex justify-between">
                        <dt className="text-gray-600">Scientific Name:</dt>
                        <dd className="font-medium text-gray-900 italic">
                          {plant.name === 'Monstera Deliciosa' ? 'Monstera deliciosa' :
                           plant.name === 'Snake Plant' ? 'Sansevieria trifasciata' :
                           plant.name === 'Fiddle Leaf Fig' ? 'Ficus lyrata' :
                           plant.name === 'Pothos' ? 'Epipremnum aureum' :
                           'Plantae species'}
                        </dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-600">Category:</dt>
                        <dd className="font-medium text-gray-900">{plant.category}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-600">Care Level:</dt>
                        <dd className="font-medium text-gray-900">{plant.careLevel}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-600">Mature Size:</dt>
                        <dd className="font-medium text-gray-900">{plant.size}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-600">Growth Rate:</dt>
                        <dd className="font-medium text-gray-900">Moderate</dd>
                      </div>
                    </dl>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4 text-sm sm:text-base">Care Requirements</h4>
                    <dl className="space-y-3 text-sm sm:text-base">
                      <div className="flex justify-between">
                        <dt className="text-gray-600">Light:</dt>
                        <dd className="font-medium text-gray-900">{plant.lightRequirement}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-600">Water:</dt>
                        <dd className="font-medium text-gray-900">{plant.waterFrequency}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-600">Temperature:</dt>
                        <dd className="font-medium text-gray-900">{careInstructions.temperature}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-600">Humidity:</dt>
                        <dd className="font-medium text-gray-900">{careInstructions.humidity}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-600">Soil Type:</dt>
                        <dd className="font-medium text-gray-900">Well-draining potting mix</dd>
                      </div>
                    </dl>
                  </div>
                </div>

                <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <h4 className="font-semibold text-amber-800 mb-2 text-sm sm:text-base">Important Notes</h4>
                  <ul className="text-xs sm:text-sm text-amber-700 space-y-1">
                    <li>• Keep away from pets and children if toxic</li>
                    <li>• Allow soil to dry between waterings to prevent root rot</li>
                    <li>• Gradually acclimate to new environments</li>
                    <li>• Monitor for common pests like spider mites and aphids</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900">Customer Reviews</h3>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                    Write a Review
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
                  <div className="text-center">
                    <div className="text-3xl sm:text-4xl font-bold text-gray-900 mb-1">4.8</div>
                    <div className="flex justify-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600">Based on 24 reviews</div>
                  </div>

                  <div className="md:col-span-2">
                    <div className="space-y-2">
                      {[5, 4, 3, 2, 1].map((rating) => (
                        <div key={rating} className="flex items-center">
                          <span className="text-xs sm:text-sm text-gray-600 w-6 sm:w-8">{rating}</span>
                          <Star className="w-4 h-4 text-yellow-400 fill-current mr-2" />
                          <div className="flex-1 bg-gray-200 rounded-full h-2 mr-4">
                            <div 
                              className="bg-yellow-400 h-2 rounded-full"
                              style={{ width: `${rating === 5 ? 75 : rating === 4 ? 20 : 5}%` }}
                            ></div>
                          </div>
                          <span className="text-xs sm:text-sm text-gray-600 w-6 sm:w-8">
                            {rating === 5 ? '18' : rating === 4 ? '5' : '1'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4 sm:space-y-6">
                  {[
                    {
                      name: 'Sarah M.',
                      rating: 5,
                      date: '2 weeks ago',
                      review: 'Beautiful, healthy plant that arrived perfectly packaged. The care instructions were very helpful!',
                      verified: true
                    },
                    {
                      name: 'Mike R.',
                      rating: 5,
                      date: '1 month ago',
                      review: 'Excellent quality and fast shipping. The plant is thriving in my living room.',
                      verified: true
                    },
                    {
                      name: 'Jennifer L.',
                      rating: 4,
                      date: '2 months ago',
                      review: 'Great plant, though it took a few days to adjust to my home. Now it\'s doing wonderfully!',
                      verified: true
                    }
                  ].map((review, index) => (
                    <div key={index} className="border-b border-gray-200 pb-4 sm:pb-6">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <span className="font-medium text-gray-900 mr-2 text-sm sm:text-base">{review.name}</span>
                          {review.verified && (
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                              Verified Purchase
                            </span>
                          )}
                        </div>
                        <span className="text-xs sm:text-sm text-gray-500">{review.date}</span>
                      </div>
                      <div className="flex items-center mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                      <p className="text-gray-700 text-sm sm:text-base">{review.review}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Plants */}
        {relatedPlants.length > 0 && (
          <section className="animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {relatedPlants.map((relatedPlant, index) => (
                <div
                  key={relatedPlant.id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <PlantCard plant={relatedPlant} onPlantSelect={onPlantSelect} />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}