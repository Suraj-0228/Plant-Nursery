import React, { useState } from 'react';
import { ArrowRight, Star, Users, Award, Truck, Shield } from 'lucide-react';
import { plants } from '../data/plants';
import PlantCard from '../components/PlantCard';
import { formatPrice } from '../utils/currency';

interface HomePageProps {
  onPageChange: (page: string) => void;
  onPlantSelect?: (plantId: string) => void;
}

export default function HomePage({ onPageChange, onPlantSelect }: HomePageProps) {
  const [email, setEmail] = useState('');

  const featuredPlants = plants.slice(0, 4);
  const herbalPlants = plants.filter(plant => plant.category === 'Herbs & Vegetables');

  const categories = [
    {
      name: 'Indoor Plants',
      image: 'https://images.pexels.com/photos/6208086/pexels-photo-6208086.jpeg?auto=compress&cs=tinysrgb&w=500',
      count: plants.filter(p => p.category === 'Indoor Plants').length
    },
    {
      name: 'Outdoor Plants',
      image: 'https://images.pexels.com/photos/1212487/pexels-photo-1212487.jpeg?auto=compress&cs=tinysrgb&w=500',
      count: plants.filter(p => p.category === 'Outdoor Plants').length
    },
    {
      name: 'Herbs & Vegetables',
      image: 'https://images.pexels.com/photos/4505171/pexels-photo-4505171.jpeg?auto=compress&cs=tinysrgb&w=500',
      count: plants.filter(p => p.category === 'Herbs & Vegetables').length
    },
    {
      name: 'Flowers',
      image: 'https://images.pexels.com/photos/1212489/pexels-photo-1212489.jpeg?auto=compress&cs=tinysrgb&w=500',
      count: plants.filter(p => p.category === 'Flowers').length
    }
  ];

  const features = [
    {
      icon: <Truck className="w-8 h-8 text-green-600" />,
      title: 'Free Delivery',
      description: 'Free delivery on orders over ₹4000'
    },
    {
      icon: <Shield className="w-8 h-8 text-green-600" />,
      title: 'Plant Guarantee',
      description: '30-day health guarantee on all plants'
    },
    {
      icon: <Users className="w-8 h-8 text-green-600" />,
      title: 'Expert Support',
      description: 'Get advice from our plant specialists'
    },
    {
      icon: <Award className="w-8 h-8 text-green-600" />,
      title: 'Premium Quality',
      description: 'Hand-selected, healthy plants'
    }
  ];

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
    alert('Thank you for subscribing!');
    setEmail('');
  };

  return (
    <div className="min-h-screen animate-fade-in">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-900 via-green-800 to-green-700 text-white">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/1400375/pexels-photo-1400375.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt="Beautiful plants"
            className="w-full h-full object-cover opacity-20"
            loading="eager"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://images.pexels.com/photos/1400374/pexels-photo-1400374.jpeg?auto=compress&cs=tinysrgb&w=1200';
            }}
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6 leading-tight animate-slide-in-left">
              Bring Nature <span className="text-green-300">Home</span>
            </h1>
            <p className="text-lg sm:text-xl mb-6 sm:mb-8 text-green-100 animate-slide-in-left" style={{ animationDelay: '0.2s' }}>
              Discover our premium collection of plants, from easy-care houseplants to exotic varieties. 
              Transform your space into a green paradise.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 animate-slide-in-left" style={{ animationDelay: '0.4s' }}>
              <button
                onClick={() => onPageChange('categories')}
                className="bg-green-600 text-white px-6 sm:px-8 py-3 rounded-lg hover:bg-green-500 transition-all duration-200 flex items-center justify-center transform hover:scale-105"
              >
                Shop Plants
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
              <button
                onClick={() => onPageChange('care-guide')}
                className="border border-white text-white px-6 sm:px-8 py-3 rounded-lg hover:bg-white hover:text-green-800 transition-all duration-200 transform hover:scale-105"
              >
                Care Guides
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="text-center animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex justify-center mb-3 sm:mb-4 transform hover:scale-110 transition-transform duration-200">
                  {feature.icon}
                </div>
                <h3 className="text-base sm:text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm sm:text-base px-2">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 animate-fade-in">
              Shop by Category
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base px-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Browse our carefully curated collection of plants organized by category
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {categories.map((category, index) => (
              <div
                key={index}
                onClick={() => onPageChange('categories')}
                className="relative group cursor-pointer rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-32 sm:h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://images.pexels.com/photos/1400375/pexels-photo-1400375.jpeg?auto=compress&cs=tinysrgb&w=500';
                  }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300" />
                <div className="absolute inset-0 flex flex-col justify-end p-3 sm:p-6">
                  <h3 className="text-white text-sm sm:text-lg font-semibold mb-1 leading-tight">
                    {category.name}
                  </h3>
                  <p className="text-green-200 text-xs sm:text-sm">
                    {category.count} plants available
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Plants Section */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 sm:mb-8 gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-4 animate-fade-in">
                Featured Plants
              </h2>
              <p className="text-gray-600 text-sm sm:text-base animate-fade-in" style={{ animationDelay: '0.2s' }}>
                Our most popular and recommended plants
              </p>
            </div>
            <button
              onClick={() => onPageChange('categories')}
              className="text-green-600 hover:text-green-500 font-medium flex items-center text-sm sm:text-base transition-colors animate-fade-in"
              style={{ animationDelay: '0.4s' }}
            >
              View All
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {featuredPlants.map((plant, index) => (
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
      </section>

      {/* Herbal Plants Section */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 animate-fade-in">
              Fresh Herbs & Vegetables
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base px-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Grow your own fresh ingredients with our selection of culinary herbs and vegetables
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {herbalPlants.map((plant, index) => (
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
      </section>

      {/* About Us Preview */}
      <section className="py-12 sm:py-16 bg-green-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="animate-slide-in-left">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
                Growing Green Since 1985
              </h2>
              <p className="text-green-100 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                For nearly four decades, GreenThumb Nursery has been your trusted partner 
                in creating beautiful, sustainable gardens. Our passion for plants and 
                commitment to excellence has made us a leader in the nursery industry.
              </p>
              <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-green-300">50K+</div>
                  <div className="text-green-100 text-sm sm:text-base">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-green-300">500+</div>
                  <div className="text-green-100 text-sm sm:text-base">Plant Varieties</div>
                </div>
              </div>
              <button
                onClick={() => onPageChange('about')}
                className="bg-green-600 text-white px-4 sm:px-6 py-3 rounded-lg hover:bg-green-500 transition-all duration-200 transform hover:scale-105 text-sm sm:text-base"
              >
                Learn More About Us
              </button>
            </div>
            <div className="relative animate-slide-in-right">
              <img
                src="https://images.pexels.com/photos/1400374/pexels-photo-1400374.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Our nursery"
                className="rounded-lg shadow-xl w-full"
                loading="lazy"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://images.pexels.com/photos/1400375/pexels-photo-1400375.jpeg?auto=compress&cs=tinysrgb&w=600';
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 animate-fade-in">
            Stay Updated with Plant Care Tips
          </h2>
          <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base px-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Get weekly plant care advice, seasonal tips, and exclusive offers delivered to your inbox
          </p>
          
          <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                required
              />
              <button
                type="submit"
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-all duration-200 transform hover:scale-105"
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 animate-fade-in">
              What Our Customers Say
            </h2>
            <div className="flex justify-center items-center space-x-1 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
              <span className="ml-2 text-gray-600 text-sm sm:text-base">4.9 out of 5 stars</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8">
            {[
              {
                name: "Sarah Johnson",
                review: "Amazing quality plants and excellent customer service. My order arrived perfectly packaged!",
                rating: 5
              },
              {
                name: "Mike Chen",
                review: "The plant care guides are so helpful. My plants have never looked better!",
                rating: 5
              },
              {
                name: "Emily Davis",
                review: "Fast shipping and healthy plants. I'll definitely order again!",
                rating: 5
              }
            ].map((review, index) => (
              <div 
                key={index} 
                className="bg-white p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 text-sm sm:text-base">"{review.review}"</p>
                <div className="font-semibold text-gray-900 text-sm sm:text-base">{review.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}