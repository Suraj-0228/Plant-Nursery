import React from 'react';
import HeroSection from '../components/ui/HeroSection';
import MagicBento from '../components/ui/MagicBento';
import CategoryCard from '../components/ui/CategoryCard';
import PlantCard from '../components/ui/PlantCard';

import { categories } from '../data/categories';
import { plants } from '../data/plants';

const Home = () => {
  return (
    <div>
      <HeroSection />
      
      <div className="p-8">
        <h2 className="text-3xl font-bold text-center mb-8">Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {mockCategories.map(category => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>

      <div className="p-8 bg-base-200">
        <h2 className="text-3xl font-bold text-center mb-8">Featured Plants</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {plants.slice(0, 3).map(plant => (
                <PlantCard key={plant.id} plant={plant} />
            ))}
        </div>
      </div>

      <div className="p-8">
        <h2 className="text-3xl font-bold text-center mb-8">Why Choose Us?</h2>
        <MagicBento />
      </div>

      <div className="p-8 bg-base-200">
        <h2 className="text-3xl font-bold text-center mb-8">About Us</h2>
        <div className="text-center max-w-2xl mx-auto">
            <p className="mb-4">We are a passionate team of plant lovers dedicated to bringing the beauty of nature into your home. We believe that everyone can have a green thumb, and we are here to help you on your journey.</p>
            <button className="btn btn-primary">Learn More</button>
        </div>
      </div>

      <div className="p-8">
        <h2 className="text-3xl font-bold text-center mb-8">Sign up for our newsletter</h2>
        <div className="form-control max-w-sm mx-auto">
            <div className="input-group">
                <input type="text" placeholder="Search…" className="input input-bordered w-full" />
                <button className="btn btn-square">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </button>
            </div>
        </div>
      </div>

    </div>
  );
};

export default Home;
