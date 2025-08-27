import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import DotGrid from './DotGrid';

const HeroSection = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.inOut' } });

    tl.fromTo(heroRef.current.querySelector('h1'), { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1 });
    tl.fromTo(heroRef.current.querySelector('p'), { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, "-=0.8");
    tl.fromTo(heroRef.current.querySelector('.btn'), { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, "-=0.8");

  }, []);

  return (
    <div ref={heroRef} className="hero min-h-screen bg-base-200 relative overflow-hidden">
      <DotGrid />
      <div className="hero-content text-center relative z-10">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Your Green Paradise</h1>
          <p className="py-6">Find the perfect plants for your home and garden. We have a wide selection of indoor and outdoor plants, herbs, and flowers.</p>
          <Link to="/category" className="btn btn-primary">Shop Now</Link>
        </div>
      </div>
      {/* Placeholder for rotating featured plants carousel */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-base-300/50 backdrop-blur-sm">
        <div className="text-center p-4">
          <h3 className="text-2xl font-bold">Featured Plants</h3>
          <p>Rotating carousel coming soon...</p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
