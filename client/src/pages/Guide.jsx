import React from 'react';
import { FaSun, FaWater, FaLeaf, FaBug, FaQuestionCircle, FaCalendarAlt } from 'react-icons/fa';

const Guide = () => {
  return (
    <div className="bg-base-100 min-h-screen">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-base-content tracking-tight">Your Ultimate Plant Care Guide</h1>
          <p className="mt-4 text-lg text-base-content max-w-3xl mx-auto">
            Everything you need to know to help your green friends thrive, from watering schedules to seasonal tips.
          </p>
        </header>

        {/* Plant Care Guides */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-10 text-base-content">Comprehensive Care Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* General Watering Guide */}
            <div className="card bg-base-200 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <FaWater className="text-3xl text-blue-500 mr-4" />
                  <h3 className="text-xl font-semibold text-base-content">Watering Guide</h3>
                </div>
                <p className="text-base-content">Learn the right way to water your plants. Understand the signs of overwatering and underwatering to keep them healthy.</p>
              </div>
            </div>

            {/* Light Requirements */}
            <div className="card bg-base-200 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <FaSun className="text-3xl text-yellow-500 mr-4" />
                  <h3 className="text-xl font-semibold text-base-content">Light Requirements</h3>
                </div>
                <p className="text-base-content">Find the perfect spot for your indoor plants by understanding different light types like direct, indirect, and low light.</p>
              </div>
            </div>

            {/* Choosing the Right Soil */}
            <div className="card bg-base-200 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <FaLeaf className="text-3xl text-green-500 mr-4" />
                  <h3 className="text-xl font-semibold text-base-content">Choosing the Right Soil</h3>
                </div>
                <p className="text-base-content">Discover the importance of well-draining soil and how to create the perfect potting mix for your plants.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Seasonal Gardening Tips */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12 text-base-content">Seasonal Gardening Calendar</h2>
          <div className="relative">
            <div className="hidden md:block absolute border-l-2 border-base-300 h-full top-0 left-1/2 -translate-x-1/2"></div>
            <div className="space-y-12">
              {/* Spring */}
              <div className="md:flex items-center w-full">
                <div className="md:w-1/2 md:pr-8">
                  <div className="bg-base-200 p-6 shadow-md">
                    <time className="font-mono italic text-base-content">Spring</time>
                    <h4 className="text-lg font-bold text-base-content mt-1">Pruning & Repotting</h4>
                    <p className="text-base-content mt-2">As new growth begins, it's the perfect time to prune away any dead or leggy stems and repot plants that have outgrown their containers.</p>
                  </div>
                </div>
                <div className="md:w-1/2 md:pl-8 md:mt-0 mt-4 flex justify-center md:justify-start">
                  <div className="bg-green-500 text-white rounded-full h-12 w-12 flex items-center justify-center">
                    <FaCalendarAlt className="text-2xl" />
                  </div>
                </div>
              </div>
              {/* Summer */}
              <div className="md:flex flex-row-reverse items-center w-full">
                <div className="md:w-1/2 md:pl-8">
                  <div className="bg-base-200 p-6 shadow-md">
                    <time className="font-mono italic text-base-content">Summer</time>
                    <h4 className="text-lg font-bold text-base-content mt-1">Watering & Fertilizing</h4>
                    <p className="text-base-content mt-2">Plants are in their active growing season and may need more frequent watering and regular feeding to support their growth.</p>
                  </div>
                </div>
                <div className="md:w-1/2 md:pr-8 md:mt-0 mt-4 flex justify-center md:justify-end">
                  <div className="bg-yellow-500 text-white rounded-full h-12 w-12 flex items-center justify-center">
                    <FaCalendarAlt className="text-2xl" />
                  </div>
                </div>
              </div>
              {/* Autumn */}
              <div className="md:flex items-center w-full">
                <div className="md:w-1/2 md:pr-8">
                  <div className="bg-base-200 p-6 shadow-md">
                    <time className="font-mono italic text-base-content">Autumn</time>
                    <h4 className="text-lg font-bold text-base-content mt-1">Prepare for Winter</h4>
                    <p className="text-base-content mt-2">Bring sensitive plants indoors, reduce watering, and clean up your garden space.</p>
                  </div>
                </div>
                <div className="md:w-1/2 md:pl-8 md:mt-0 mt-4 flex justify-center md:justify-start">
                  <div className="bg-orange-500 text-white rounded-full h-12 w-12 flex items-center justify-center">
                    <FaCalendarAlt className="text-2xl" />
                  </div>
                </div>
              </div>
              {/* Winter */}
              <div className="md:flex flex-row-reverse items-center w-full">
                <div className="md:w-1/2 md:pl-8">
                  <div className="bg-base-200 p-6 shadow-md">
                    <time className="font-mono italic text-base-content">Winter</time>
                    <h4 className="text-lg font-bold text-base-content mt-1">Rest & Plan</h4>
                    <p className="text-base-content mt-2">Most plants are dormant. It's a good time to plan for the next growing season.</p>
                  </div>
                </div>
                <div className="md:w-1/2 md:pr-8 md:mt-0 mt-4 flex justify-center md:justify-end">
                  <div className="bg-blue-500 text-white rounded-full h-12 w-12 flex items-center justify-center">
                    <FaCalendarAlt className="text-2xl" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Problem Diagnosis Tool */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-10 text-base-content">Problem Diagnosis Tool</h2>
          <div className="max-w-2xl mx-auto bg-base-200 p-8 shadow-lg">
            <div className="flex items-center mb-4">
              <FaBug className="text-3xl text-red-500 mr-4" />
              <h3 className="text-xl font-semibold text-base-content">What's wrong with your plant?</h3>
            </div>
            <p className="text-base-content mb-6">Select a symptom from the list below to get a possible diagnosis and solution.</p>
            <div className="form-control w-full">
              <select className="select select-bordered rounded-xl w-full">
                <option disabled selected>Select a problem</option>
                <option>Yellowing Leaves</option>
                <option>Pests (e.g., spider mites, aphids)</option>
                <option>Drooping Leaves</option>
                <option>Brown Spots</option>
              </select>
              <button className="btn btn-primary mt-4 w-full">Get Solution</button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Guide;
