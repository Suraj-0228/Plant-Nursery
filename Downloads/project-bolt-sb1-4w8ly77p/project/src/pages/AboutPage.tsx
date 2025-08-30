import React from 'react';
import { Users, Award, Heart, Leaf, MapPin, Clock } from 'lucide-react';

interface AboutPageProps {
  onPageChange: (page: string) => void;
}

export default function AboutPage({ onPageChange }: AboutPageProps) {
  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'Founder & Head Horticulturist',
      image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=300',
      bio: '25+ years experience in plant cultivation and sustainable gardening practices.',
      expertise: ['Tropical Plants', 'Organic Gardening', 'Plant Propagation']
    },
    {
      name: 'Michael Chen',
      role: 'Plant Care Specialist',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300',
      bio: 'Expert in plant diseases and treatment with a background in botanical science.',
      expertise: ['Plant Health', 'Pest Management', 'Indoor Plants']
    },
    {
      name: 'Emily Rodriguez',
      role: 'Landscape Designer',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300',
      bio: 'Creates beautiful outdoor spaces that harmonize with natural ecosystems.',
      expertise: ['Landscape Design', 'Native Plants', 'Xeriscaping']
    },
    {
      name: 'David Thompson',
      role: 'Customer Experience Manager',
      image: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=300',
      bio: 'Dedicated to ensuring every customer finds the perfect plants for their space.',
      expertise: ['Customer Service', 'Plant Selection', 'Garden Planning']
    }
  ];

  const values = [
    {
      icon: <Leaf className="w-8 h-8 text-green-600" />,
      title: 'Sustainability',
      description: 'We practice eco-friendly growing methods and promote sustainable gardening practices.'
    },
    {
      icon: <Heart className="w-8 h-8 text-green-600" />,
      title: 'Passion',
      description: 'Our love for plants drives everything we do, from cultivation to customer service.'
    },
    {
      icon: <Award className="w-8 h-8 text-green-600" />,
      title: 'Quality',
      description: 'We maintain the highest standards in plant health and customer satisfaction.'
    },
    {
      icon: <Users className="w-8 h-8 text-green-600" />,
      title: 'Community',
      description: 'Building a community of plant lovers and supporting local gardening initiatives.'
    }
  ];

  const milestones = [
    { year: '1985', event: 'GreenThumb Nursery founded by Sarah Johnson' },
    { year: '1992', event: 'Expanded to include organic gardening supplies' },
    { year: '2001', event: 'Launched plant care education programs' },
    { year: '2010', event: 'Opened second location in Green Valley' },
    { year: '2018', event: 'Introduced online plant delivery service' },
    { year: '2024', event: 'Celebrating 39 years of growing green dreams' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 animate-fade-in">
      {/* Hero Section */}
      <section className="relative bg-green-900 text-white py-12 sm:py-20">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/1400374/pexels-photo-1400374.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt="Our nursery"
            className="w-full h-full object-cover opacity-30"
            loading="eager"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://images.pexels.com/photos/1400375/pexels-photo-1400375.jpeg?auto=compress&cs=tinysrgb&w=1200';
            }}
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6 animate-slide-in-left">About GreenThumb Nursery</h1>
          <p className="text-lg sm:text-xl text-green-100 max-w-3xl mx-auto px-4 animate-slide-in-right" style={{ animationDelay: '0.2s' }}>
            For nearly four decades, we've been cultivating more than just plants—we've been growing 
            dreams, nurturing communities, and fostering a deeper connection with nature.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="animate-slide-in-left">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">Our Story</h2>
              <div className="prose prose-lg text-gray-600 text-sm sm:text-base">
                <p className="mb-3 sm:mb-4">
                  Founded in 1985 by passionate horticulturist Sarah Johnson, GreenThumb Nursery 
                  began as a small family operation with a simple mission: to share the joy and 
                  benefits of gardening with our community.
                </p>
                <p className="mb-3 sm:mb-4">
                  What started as a humble greenhouse has grown into a premier destination for 
                  plant enthusiasts, offering everything from common houseplants to rare exotic 
                  species. Our commitment to quality, sustainability, and customer education has 
                  made us a trusted partner for both novice and experienced gardeners.
                </p>
                <p>
                  Today, we're proud to serve thousands of customers annually, helping them create 
                  beautiful, healthy, and sustainable green spaces in their homes and gardens.
                </p>
              </div>
            </div>
            <div className="relative animate-slide-in-right">
              <img
                src="https://images.pexels.com/photos/1400375/pexels-photo-1400375.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Our greenhouse"
                className="rounded-lg shadow-xl w-full"
                loading="lazy"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://images.pexels.com/photos/1400374/pexels-photo-1400374.jpeg?auto=compress&cs=tinysrgb&w=600';
                }}
              />
              <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 bg-green-600 text-white p-4 sm:p-6 rounded-lg animate-scale-in" style={{ animationDelay: '0.8s' }}>
                <div className="text-2xl sm:text-3xl font-bold">39</div>
                <div className="text-xs sm:text-sm">Years of Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 animate-fade-in">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">Our Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base px-4">
              These core values guide everything we do and reflect our commitment to our customers, 
              community, and the environment.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
            {values.map((value, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg p-4 sm:p-6 text-center shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex justify-center mb-3 sm:mb-4 transform hover:scale-110 transition-transform duration-200">
                  {value.icon}
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">{value.title}</h3>
                <p className="text-gray-600 text-sm sm:text-base">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 animate-fade-in">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">Meet Our Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base px-4">
              Our passionate team of plant experts is here to help you succeed in your gardening journey.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {teamMembers.map((member, index) => (
              <div 
                key={index} 
                className="bg-gray-50 rounded-lg p-4 sm:p-6 text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full mx-auto mb-3 sm:mb-4 object-cover hover:scale-110 transition-transform duration-200"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=300';
                  }}
                />
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-green-600 font-medium mb-2 sm:mb-3 text-sm sm:text-base">{member.role}</p>
                <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4">{member.bio}</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {member.expertise.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 animate-fade-in">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">Our Journey</h2>
            <p className="text-gray-600 text-sm sm:text-base">Key milestones in our growth and development</p>
          </div>
          <div className="space-y-6 sm:space-y-8">
            {milestones.map((milestone, index) => (
              <div 
                key={index} 
                className="flex items-center animate-slide-in-left"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex-shrink-0 w-16 sm:w-20 text-right">
                  <span className="text-base sm:text-lg font-bold text-green-600">{milestone.year}</span>
                </div>
                <div className="flex-shrink-0 w-3 h-3 sm:w-4 sm:h-4 bg-green-600 rounded-full mx-3 sm:mx-4 animate-pulse"></div>
                <div className="flex-1">
                  <p className="text-gray-700 text-sm sm:text-base">{milestone.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location & Hours */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
            <div className="animate-slide-in-left">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">Visit Our Nursery</h2>
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-green-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">Main Location</h3>
                    <p className="text-gray-600 text-sm sm:text-base">123 Garden Lane<br />Green Valley, Mumbai 400001</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Clock className="w-6 h-6 text-green-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">Hours of Operation</h3>
                    <div className="text-gray-600 space-y-1 text-sm sm:text-base">
                      <p>Monday - Friday: 8:00 AM - 7:00 PM</p>
                      <p>Saturday: 8:00 AM - 8:00 PM</p>
                      <p>Sunday: 9:00 AM - 6:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 sm:mt-8">
                <button
                  onClick={() => onPageChange('contact')}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-all duration-200 transform hover:scale-105"
                >
                  Get Directions
                </button>
              </div>
            </div>
            <div className="animate-slide-in-right">
              <div className="bg-gray-200 rounded-lg h-48 sm:h-64 flex items-center justify-center">
                <p className="text-gray-600">Interactive Map Placeholder</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 sm:py-16 bg-green-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 animate-fade-in">Ready to Start Your Garden Journey?</h2>
          <p className="text-green-100 text-base sm:text-lg mb-6 sm:mb-8 px-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Visit us today and let our expert team help you find the perfect plants for your space.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <button
              onClick={() => onPageChange('categories')}
              className="bg-white text-green-900 px-6 sm:px-8 py-3 rounded-lg hover:bg-gray-100 transition-all duration-200 font-medium transform hover:scale-105"
            >
              Browse Plants
            </button>
            <button
              onClick={() => onPageChange('contact')}
              className="border border-white text-white px-6 sm:px-8 py-3 rounded-lg hover:bg-white hover:text-green-900 transition-all duration-200 font-medium transform hover:scale-105"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}