import React, { useState } from 'react';
import { Search, Book, Clock, Droplets, Sun, Thermometer, Bug, Calendar } from 'lucide-react';
import { careGuides } from '../data/plants';

export default function CareGuidePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Basic Care', 'Seasonal Tips', 'Troubleshooting', 'Advanced Care'];

  const filteredGuides = careGuides.filter(guide => {
    const matchesSearch = guide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         guide.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || guide.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const careTopics = [
    {
      icon: <Droplets className="w-8 h-8 text-blue-600" />,
      title: 'Watering Guide',
      description: 'Learn proper watering techniques for different plant types',
      tips: ['Check soil moisture regularly', 'Water deeply but less frequently', 'Use room temperature water']
    },
    {
      icon: <Sun className="w-8 h-8 text-yellow-600" />,
      title: 'Light Requirements',
      description: 'Understanding plant lighting needs',
      tips: ['Low light: North-facing windows', 'Medium light: East/West windows', 'High light: South-facing windows']
    },
    {
      icon: <Thermometer className="w-8 h-8 text-red-600" />,
      title: 'Temperature & Humidity',
      description: 'Creating the ideal environment',
      tips: ['Most houseplants prefer 65-75°F', 'Increase humidity with pebble trays', 'Avoid cold drafts']
    },
    {
      icon: <Bug className="w-8 h-8 text-green-600" />,
      title: 'Pest Control',
      description: 'Identify and treat common plant pests',
      tips: ['Inspect plants weekly', 'Isolate affected plants', 'Use neem oil for treatment']
    }
  ];

  const seasonalTips = [
    {
      season: 'Spring',
      icon: '🌱',
      tips: ['Resume regular watering', 'Start fertilizing', 'Repot if needed', 'Increase light exposure']
    },
    {
      season: 'Summer',
      icon: '☀️',
      tips: ['Water more frequently', 'Provide shade during peak hours', 'Monitor for pests', 'Increase humidity']
    },
    {
      season: 'Fall',
      icon: '🍂',
      tips: ['Reduce watering frequency', 'Stop fertilizing', 'Move plants indoors', 'Prepare for dormancy']
    },
    {
      season: 'Winter',
      icon: '❄️',
      tips: ['Water sparingly', 'Reduce fertilizer', 'Provide extra light', 'Watch for dry air']
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 animate-fade-in-up">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">Plant Care Guide</h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Everything you need to know to keep your plants healthy and thriving. 
            From basic care to advanced techniques, we've got you covered.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6 sm:mb-8 animate-slide-in-left">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search care guides..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Quick Care Topics */}
        <section className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 animate-fade-in">Essential Care Topics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {careTopics.map((topic, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg shadow-md p-4 sm:p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center mb-3 sm:mb-4">
                  {topic.icon}
                  <h3 className="text-base sm:text-lg font-semibold ml-3">{topic.title}</h3>
                </div>
                <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">{topic.description}</p>
                <ul className="space-y-2">
                  {topic.tips.map((tip, tipIndex) => (
                    <li key={tipIndex} className="text-xs sm:text-sm text-gray-700 flex items-start">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2 mt-2 flex-shrink-0"></span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Seasonal Care Calendar */}
        <section className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center animate-fade-in">
            <Calendar className="w-6 h-6 mr-2 text-green-600" />
            Seasonal Care Calendar
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {seasonalTips.map((season, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg shadow-md p-4 sm:p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-center mb-4">
                  <div className="text-3xl sm:text-4xl mb-2">{season.icon}</div>
                  <h3 className="text-base sm:text-lg font-semibold">{season.season}</h3>
                </div>
                <ul className="space-y-2">
                  {season.tips.map((tip, tipIndex) => (
                    <li key={tipIndex} className="text-xs sm:text-sm text-gray-700 flex items-start">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2 mt-2 flex-shrink-0"></span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Care Guide Articles */}
        <section>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 animate-fade-in">Detailed Care Guides</h2>
          {filteredGuides.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredGuides.map((guide, index) => (
                <article 
                  key={guide.id} 
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <img
                    src={guide.image}
                    alt={guide.title}
                    className="w-full h-40 sm:h-48 object-cover hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://images.pexels.com/photos/1400375/pexels-photo-1400375.jpeg?auto=compress&cs=tinysrgb&w=500';
                    }}
                  />
                  <div className="p-4 sm:p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs sm:text-sm text-green-600 font-medium">{guide.category}</span>
                      <div className="flex items-center text-xs sm:text-sm text-gray-500">
                        <Clock className="w-4 h-4 mr-1" />
                        {guide.readTime}
                      </div>
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{guide.title}</h3>
                    <p className="text-gray-600 text-xs sm:text-sm mb-4 line-clamp-2">{guide.excerpt}</p>
                    <button className="text-green-600 hover:text-green-700 font-medium text-xs sm:text-sm flex items-center transition-colors">
                      <Book className="w-4 h-4 mr-1" />
                      Read More
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 sm:py-12 animate-fade-in">
              <div className="text-gray-400 text-5xl sm:text-6xl mb-4">📚</div>
              <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">No guides found</h3>
              <p className="text-gray-600 text-sm sm:text-base">Try adjusting your search terms or category filter.</p>
            </div>
          )}
        </section>

        {/* Care Tips Highlight */}
        <section className="mt-8 sm:mt-12 bg-green-900 text-white rounded-lg p-6 sm:p-8 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <div className="text-center">
            <h2 className="text-xl sm:text-2xl font-bold mb-4">Pro Care Tip</h2>
            <p className="text-green-100 text-base sm:text-lg mb-4 sm:mb-6 px-4">
              "The best time to water most plants is early morning. This gives them time to absorb 
              the water before the heat of the day and reduces the risk of fungal diseases."
            </p>
            <div className="text-green-300 font-medium text-sm sm:text-base">- Plant Care Expert</div>
          </div>
        </section>
      </div>
    </div>
  );
}