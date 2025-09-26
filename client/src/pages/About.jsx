import React from 'react';
import { MapPin, Clock, Users } from 'lucide-react';

const About = () => {
  return (
    <div className="bg-base-100">
      {/* Hero Section */}
      <div className="hero min-h-[400px]" style={{backgroundImage: 'url(https://i.pinimg.com/1200x/0c/ad/12/0cad129d9c0d34eaac50302009a2360c.jpg)'}}>
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Our Story</h1>
            <p className="mb-5">From a small backyard hobby to a flourishing nursery, our love for plants has grown into a passion for sharing the joy of gardening with our community. We believe in sustainable practices and providing the healthiest, happiest plants.</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-24 sm:px-6 lg:px-8">
        {/* Our Mission Section */}
        <section className="text-center max-w-3xl mx-auto mb-24">
          <h2 className="text-4xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg text-base-content/80">
            To inspire a love for nature and gardening by providing high-quality plants, expert knowledge, and a supportive community for plant lovers of all levels. We aim to make the world a greener, more beautiful place, one plant at a time.
          </p>
        </section>

        {/* Meet the Team Section */}
        <section className="mb-24">
          <h2 className="text-4xl font-bold text-center mb-12">Meet Our Plant Experts</h2>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
            <div className="card items-center text-center group">
              <figure className="relative w-48 h-48">
                <img src="https://i.pinimg.com/736x/db/f8/24/dbf8248fc1d263f15184c2c5510d3256.jpg" alt="Jane Doe" className="rounded-full w-full h-full object-cover shadow-lg" />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-2xl font-bold">Jane Doe</h2>
                <p className="text-base-content/70">Founder & Head Horticulturist</p>
              </div>
            </div>
            <div className="card items-center text-center group">
              <figure className="relative w-48 h-48">
                <img src="https://i.pinimg.com/736x/00/3e/de/003ede0c10fd58e0e285f21ab84963e4.jpg" alt="John Smith" className="rounded-full w-full h-full object-cover shadow-lg" />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-2xl font-bold">John Smith</h2>
                <p className="text-base-content/70">Indoor Plant Specialist</p>
              </div>
            </div>
            <div className="card items-center text-center group">
              <figure className="relative w-48 h-48">
                <img src="https://i.pinimg.com/736x/c6/99/c2/c699c22b7721bc635bc36c30816e740f.jpg" alt="Emily White" className="rounded-full w-full h-full object-cover shadow-lg" />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-2xl font-bold">Emily White</h2>
                <p className="text-base-content/70">Customer Happiness Manager</p>
              </div>
            </div>
          </div>
        </section>

        {/* Location and Hours Section */}
        <section className="bg-base-200 p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Visit Our Nursery</h2>
              <div className="flex items-center mb-4">
                <MapPin className="text-primary mr-3" size={20} />
                <span>1427 Willowfen, Court Cedarridge, OR 97405 United States — Fictiona.</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 mt-8">Hours of Operation</h3>
              <div className="flex items-center">
                <Clock className="text-primary mr-3" size={20} />
                <div>
                  <p><b>Monday - Friday:</b> 9:00 AM - 6:00 PM</p>
                  <p><b>Saturday - Sunday:</b> 10:00 AM - 4:00 PM</p>
                </div>
              </div>
            </div>
            <div className="h-80 md:h-full w-full">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.225833978235!2d144.9631!3d-37.814!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0x5045675218ce7e0!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sus!4v1620229653955!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{border:0}} 
                allowFullScreen="" 
                loading="lazy"
                className="shadow-lg">
              </iframe>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;