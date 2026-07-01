import React from 'react';
import { MapPin, Clock, Award, ShieldCheck, Sprout, HeartHandshake } from 'lucide-react';

const About = () => {
  return (
    <div className="bg-base-100 min-h-screen transition-colors duration-300">
      
      {/* Hero Section */}
      <div className="hero min-h-[450px] relative overflow-hidden" style={{backgroundImage: 'url(https://i.pinimg.com/1200x/0c/ad/12/0cad129d9c0d34eaac50302009a2360c.jpg)'}}>
        <div className="hero-overlay bg-black/65"></div>
        <div className="hero-content text-center text-neutral-content relative z-10">
          <div className="max-w-xl space-y-6">
            <span className="text-accent font-bold text-sm tracking-widest uppercase">Our Heritage</span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight font-heading text-white">The GreenThumb Story</h1>
            <p className="text-white/90 text-sm sm:text-base leading-relaxed">
              From a small backyard greenhouse to a premium botanical boutique, our love for natural aesthetics has grown into a lifetime commitment to sharing the beauty and air-purifying qualities of plants with our community.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 space-y-32">
        
        {/* Our Mission Section */}
        <section className="text-center max-w-3xl mx-auto space-y-5">
          <span className="text-primary font-bold text-sm tracking-wider uppercase font-heading">Core Philosophy</span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-base-content font-heading">Cultivating Nature's Art</h2>
          <p className="text-base-content/80 text-sm sm:text-base leading-relaxed">
            To inspire a deeper connection with nature by offering premium, horticulturist-raised plants, expert botanical knowledge, and elegant design guides. We believe every space should have a touch of living art, purifying the air and calming the mind.
          </p>
        </section>

        {/* Quality Pillars */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl border border-base-300/40 bg-base-200/50 flex flex-col gap-4 text-center items-center hover:border-primary/20 transition-all duration-300">
            <div className="bg-primary/10 p-3.5 rounded-2xl text-primary">
              <Award className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-base-content font-heading">Exquisite Selection</h3>
            <p className="text-base-content/75 text-sm leading-relaxed">We source rare and architecturally unique foliage plants that elevate high-end interior aesthetics.</p>
          </div>

          <div className="p-8 rounded-3xl border border-base-300/40 bg-base-200/50 flex flex-col gap-4 text-center items-center hover:border-primary/20 transition-all duration-300">
            <div className="bg-primary/10 p-3.5 rounded-2xl text-primary">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-base-content font-heading">Horticultural Integrity</h3>
            <p className="text-base-content/75 text-sm leading-relaxed">All plants are grown in organic, nutrient-dense soil mixes under optimal temperature parameters.</p>
          </div>

          <div className="p-8 rounded-3xl border border-base-300/40 bg-base-200/50 flex flex-col gap-4 text-center items-center hover:border-primary/20 transition-all duration-300">
            <div className="bg-primary/10 p-3.5 rounded-2xl text-primary">
              <HeartHandshake className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-base-content font-heading">Expert Support</h3>
            <p className="text-base-content/75 text-sm leading-relaxed">Get lifetime support, watering advice, and care diagnostics from our qualified greenhouse staff.</p>
          </div>
        </section>

        {/* Meet the Team Section */}
        <section className="space-y-16">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-primary font-bold text-sm tracking-wider uppercase font-heading">Greenhouse Leaders</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-base-content font-heading">Meet Our Botanical Experts</h2>
          </div>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            <div className="premium-card p-6 flex flex-col items-center text-center gap-4 shadow-md">
              <div className="w-36 h-36 rounded-full overflow-hidden border-2 border-accent shadow-md">
                <img src="https://i.pinimg.com/736x/db/f8/24/dbf8248fc1d263f15184c2c5510d3256.jpg" alt="Jane Doe" className="w-full h-full object-cover" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-base-content font-heading">Jane Doe</h3>
                <p className="text-primary text-sm font-semibold uppercase tracking-wider">Founder & Head Horticulturist</p>
              </div>
            </div>

            <div className="premium-card p-6 flex flex-col items-center text-center gap-4 shadow-md">
              <div className="w-36 h-36 rounded-full overflow-hidden border-2 border-accent shadow-md">
                <img src="https://i.pinimg.com/736x/00/3e/de/003ede0c10fd58e0e285f21ab84963e4.jpg" alt="John Smith" className="w-full h-full object-cover" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-base-content font-heading">John Smith</h3>
                <p className="text-primary text-sm font-semibold uppercase tracking-wider">Indoor Plant Architect</p>
              </div>
            </div>

            <div className="premium-card p-6 flex flex-col items-center text-center gap-4 shadow-md">
              <div className="w-36 h-36 rounded-full overflow-hidden border-2 border-accent shadow-md">
                <img src="https://i.pinimg.com/736x/c6/99/c2/c699c22b7721bc635bc36c30816e740f.jpg" alt="Emily White" className="w-full h-full object-cover" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-base-content font-heading">Emily White</h3>
                <p className="text-primary text-sm font-semibold uppercase tracking-wider">Customer Experience Lead</p>
              </div>
            </div>
          </div>
        </section>

        {/* Location and Hours Section */}
        <section className="p-8 sm:p-12 rounded-[32px] border border-base-300/40 bg-base-200/50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-base-content font-heading">Visit Our Boutique Greenhouse</h2>
              
              <div className="space-y-4 text-base-content/85 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="text-primary mt-0.5 shrink-0" size={20} />
                  <span>1427 Willowfen Court, Cedarridge, OR 97405, United States</span>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="text-primary mt-0.5 shrink-0" size={20} />
                  <div>
                    <p className="font-bold text-base-content font-heading mb-1">Hours of Operation</p>
                    <p><b>Monday - Friday:</b> 9:00 AM - 6:00 PM</p>
                    <p><b>Saturday - Sunday:</b> 10:00 AM - 4:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="h-64 sm:h-80 w-full overflow-hidden rounded-2xl border border-base-300/40 shadow-inner">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.225833978235!2d144.9631!3d-37.814!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0x5045675218ce7e0!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sus!4v1620229653955!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{border:0}} 
                allowFullScreen="" 
                loading="lazy"
                title="Greenhouse location map"
              >
              </iframe>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default About;