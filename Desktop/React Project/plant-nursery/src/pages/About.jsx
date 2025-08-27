import React from 'react';

const About = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-center mb-8">About Us</h1>

      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Our Story</h2>
        <p className="mb-8">Founded in 2023, PlantNursery was born out of a passion for all things green. We started as a small local nursery and have grown into a beloved destination for plant enthusiasts of all levels. Our mission is to bring the joy of gardening to every home.</p>
      </div>

      <div className="p-8 bg-base-200">
        <h2 className="text-3xl font-bold text-center mb-8">Meet the Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Team Member Cards - Placeholder */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
              <div className="avatar">
                <div className="w-24 rounded-full">
                  <img src="https://i.pravatar.cc/150?u=jane" />
                </div>
              </div>
              <h2 className="card-title">Jane Doe</h2>
              <p>Founder & Chief Botanist</p>
            </div>
          </div>
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
              <div className="avatar">
                <div className="w-24 rounded-full">
                  <img src="https://i.pravatar.cc/150?u=john" />
                </div>
              </div>
              <h2 className="card-title">John Smith</h2>
              <p>Horticulturist</p>
            </div>
          </div>
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
              <div className="avatar">
                <div className="w-24 rounded-full">
                  <img src="https://i.pravatar.cc/150?u=sara" />
                </div>
              </div>
              <h2 className="card-title">Sara Lee</h2>
              <p>Customer Happiness</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8">
        <h2 className="text-3xl font-bold text-center mb-8">Location & Hours</h2>
        <div className="text-center max-w-2xl mx-auto">
            <p>123 Green St, Plantville, USA</p>
            <p>Mon - Fri: 9am - 6pm</p>
            <p>Sat - Sun: 10am - 4pm</p>
        </div>
      </div>

    </div>
  );
};

export default About;
