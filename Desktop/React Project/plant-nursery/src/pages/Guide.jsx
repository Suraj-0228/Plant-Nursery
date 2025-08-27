import React from 'react';
import { guides } from '../data/guides';

const Guide = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Plant Care Guides</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {guides.map(guide => (
          <div key={guide.id} className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">{guide.title}</h2>
              <p>{guide.content}</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Read More</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-8 mt-8 bg-base-200">
        <h2 className="text-3xl font-bold text-center mb-8">Interactive Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div>
            <h3 className="text-xl font-bold">Seasonal Calendar</h3>
            <p>Coming soon...</p>
          </div>
          <div>
            <h3 className="text-xl font-bold">Problem Diagnosis</h3>
            <p>Coming soon...</p>
          </div>
          <div>
            <h3 className="text-xl font-bold">Watering Schedule</h3>
            <p>Coming soon...</p>
          </div>
          <div>
            <h3 className="text-xl font-bold">Light Matcher</h3>
            <p>Coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Guide;
