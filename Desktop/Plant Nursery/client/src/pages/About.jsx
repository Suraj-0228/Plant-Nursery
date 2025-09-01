import React from 'react';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="hero min-h-[400px]" style={{backgroundImage: 'url(https://i.pinimg.com/1200x/0c/ad/12/0cad129d9c0d34eaac50302009a2360c.jpg)'}}>
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Our Story</h1>
            <p className="mb-5">From a small backyard hobby to a flourishing nursery, our love for plants has grown into a passion for sharing the joy of gardening with our community. We believe in sustainable practices and providing the healthiest, happiest plants.</p>
          </div>
        </div>
      </div>

      {/* Meet the Team */}
      <section className="py-16">
        <h2 className="text-4xl font-bold text-center mb-5">Meet Our Plant Experts</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="card bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
              <img src="https://i.pinimg.com/736x/db/f8/24/dbf8248fc1d263f15184c2c5510d3256.jpg" alt="Jane Doe" className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">Jane Doe</h2>
              <p>Founder & Head Horticulturist</p>
            </div>
          </div>
          <div className="card bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
              <img src="https://i.pinimg.com/736x/00/3e/de/003ede0c10fd58e0e285f21ab84963e4.jpg" alt="John Smith" className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">John Smith</h2>
              <p>Indoor Plant Specialist</p>
            </div>
          </div>
          <div className="card bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
              <img src="https://i.pinimg.com/736x/c6/99/c2/c699c22b7721bc635bc36c30816e740f.jpg" alt="Emily White" className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">Emily White</h2>
              <p>Customer Happiness Manager</p>
            </div>
          </div>
        </div>
      </section>

      {/* Location and Hours */}
      <section className="py-16 bg-base-200 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="px-20">
            <h2 className="text-3xl font-bold mb-4">Visit Our Nursery</h2>
            <p className="mb-4">123 Green St, Plantville, PL 45678</p>
            <h3 className="text-xl font-bold mb-2">Hours of Operation</h3>
            <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
            <p>Saturday - Sunday: 10:00 AM - 4:00 PM</p>
          </div>
          <div>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.225833978235!2d144.9631!3d-37.814!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0x5045675218ce7e0!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sus!4v1620229653955!5m2!1sen!2sus" 
              width="90%" 
              height="300" 
              style={{border:0}} 
              allowFullScreen="" 
              loading="lazy">
            </iframe>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
