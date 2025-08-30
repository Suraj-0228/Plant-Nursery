import React, { useState, useMemo } from 'react';
import { Search, Filter, SortAsc, X, ChevronDown } from 'lucide-react';
import { plants, Plant } from '../data/plants';
import PlantCard from '../components/PlantCard';
import { formatPrice } from '../utils/currency';

interface CategoriesPageProps {
  onPlantSelect: (plantId: string) => void;
}

export default function CategoriesPage({ onPlantSelect }: CategoriesPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCareLevel, setSelectedCareLevel] = useState('All');
  const [selectedSize, setSelectedSize] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const [priceRange, setPriceRange] = useState([0, 8000]);
  const [showFilters, setShowFilters] = useState(false);

  const categories = ['All', 'Indoor Plants', 'Outdoor Plants', 'Herbs & Vegetables', 'Flowers'];
  const careLevels = ['All', 'Beginner', 'Intermediate', 'Advanced'];
  const sizes = ['All', 'Small', 'Medium', 'Large'];
  const sortOptions = [
    { value: 'name', label: 'Name A-Z' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'popularity', label: 'Most Popular' },
  ];

  const filteredAndSortedPlants = useMemo(() => {
    let filtered = plants.filter((plant) => {
      const matchesSearch = plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           plant.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || plant.category === selectedCategory;
      const matchesCareLevel = selectedCareLevel === 'All' || plant.careLevel === selectedCareLevel;
      const matchesSize = selectedSize === 'All' || plant.size === selectedSize;
      const matchesPrice = plant.price >= priceRange[0] && plant.price <= priceRange[1];

      return matchesSearch && matchesCategory && matchesCareLevel && matchesSize && matchesPrice;
    });

    // Sort the filtered results
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'popularity':
          return b.popularity - a.popularity;
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, selectedCategory, selectedCareLevel, selectedSize, sortBy, priceRange]);

  const handleReset = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedCareLevel('All');
    setSelectedSize('All');
    setSortBy('name');
    setPriceRange([0, 8000]);
  };

  const activeFiltersCount = [
    selectedCategory !== 'All',
    selectedCareLevel !== 'All', 
    selectedSize !== 'All',
    priceRange[0] !== 0 || priceRange[1] !== 8000
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-4">Plant Categories</h1>
          <p className="text-sm sm:text-base text-gray-600">
            Discover our complete collection of plants. Use the filters below to find exactly what you're looking for.
          </p>
        </div>

        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full bg-white border border-gray-300 rounded-lg p-3 flex items-center justify-between shadow-sm"
          >
            <div className="flex items-center">
              <Filter className="w-5 h-5 text-gray-600 mr-2" />
              <span className="font-medium text-gray-900">Filters</span>
              {activeFiltersCount > 0 && (
                <span className="ml-2 bg-green-600 text-white text-xs px-2 py-1 rounded-full">
                  {activeFiltersCount}
                </span>
              )}
            </div>
            <ChevronDown className={`w-5 h-5 text-gray-600 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Search and Filters */}
        <div className={`bg-white rounded-lg shadow-md mb-6 sm:mb-8 transition-all duration-300 ${
          showFilters || window.innerWidth >= 1024 ? 'block' : 'hidden lg:block'
        }`}>
          {/* Search Bar */}
          <div className="p-4 sm:p-6 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search plants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
              />
            </div>
          </div>

          {/* Filter Controls */}
          <div className="p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
              {activeFiltersCount > 0 && (
                <button
                  onClick={handleReset}
                  className="text-sm text-red-600 hover:text-red-700 flex items-center"
                >
                  <X className="w-4 h-4 mr-1" />
                  Clear All ({activeFiltersCount})
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {/* Category Filter */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white transition-colors"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Care Level Filter */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Care Level</label>
                <select
                  value={selectedCareLevel}
                  onChange={(e) => setSelectedCareLevel(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white transition-colors"
                >
                  {careLevels.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>

              {/* Size Filter */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Size</label>
                <select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white transition-colors"
                >
                  {sizes.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div className="space-y-2 sm:col-span-2 lg:col-span-1">
                <label className="block text-sm font-medium text-gray-700">
                  Price Range: {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                </label>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="8000"
                    step="100"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <input
                    type="range"
                    min="0"
                    max="8000"
                    step="100"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>
              </div>

              {/* Sort Options */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white transition-colors"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Active Filters Display */}
        {activeFiltersCount > 0 && (
          <div className="mb-6 flex flex-wrap gap-2">
            {selectedCategory !== 'All' && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                {selectedCategory}
                <button
                  onClick={() => setSelectedCategory('All')}
                  className="ml-2 hover:text-green-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {selectedCareLevel !== 'All' && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                {selectedCareLevel}
                <button
                  onClick={() => setSelectedCareLevel('All')}
                  className="ml-2 hover:text-blue-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {selectedSize !== 'All' && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800">
                {selectedSize}
                <button
                  onClick={() => setSelectedSize('All')}
                  className="ml-2 hover:text-purple-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
        )}

        {/* Results Summary */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-2">
          <div className="text-gray-600 text-sm sm:text-base">
            Showing <span className="font-semibold">{filteredAndSortedPlants.length}</span> of <span className="font-semibold">{plants.length}</span> plants
          </div>
          <div className="lg:hidden">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 text-sm text-gray-600 hover:text-green-600"
            >
              <Filter className="w-4 h-4" />
              <span>
                {showFilters ? 'Hide Filters' : 'Show Filters'}
                {activeFiltersCount > 0 && ` (${activeFiltersCount})`}
              </span>
            </button>
          </div>
        </div>

        {/* Plants Grid */}
        {filteredAndSortedPlants.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredAndSortedPlants.map((plant, index) => (
              <div
                key={plant.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <PlantCard plant={plant} onPlantSelect={onPlantSelect} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 animate-fade-in">
            <div className="text-6xl sm:text-8xl mb-4">🌱</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No plants found</h3>
            <p className="text-gray-600 mb-4 text-sm sm:text-base">
              Try adjusting your filters or search term to find what you're looking for.
            </p>
            <button
              onClick={handleReset}
              className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Category Highlights */}
        <div className="mt-12 sm:mt-16">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8">Browse by Category</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {categories.slice(1).map((category, index) => {
              const categoryPlants = plants.filter(plant => plant.category === category);
              const categoryImage = categoryPlants[0]?.image || 'https://images.pexels.com/photos/1400375/pexels-photo-1400375.jpeg?auto=compress&cs=tinysrgb&w=500';
              
              return (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="relative group rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <img
                    src={categoryImage}
                    alt={category}
                    className="w-full h-24 sm:h-32 object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://images.pexels.com/photos/1400375/pexels-photo-1400375.jpeg?auto=compress&cs=tinysrgb&w=500';
                    }}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300" />
                  <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-2">
                    <h3 className="font-semibold text-sm sm:text-lg mb-1 text-center leading-tight">{category}</h3>
                    <p className="text-xs sm:text-sm text-green-200">
                      {categoryPlants.length} plants
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}