import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MagicBento = () => {
  const bentoRef = useRef(null);

  useEffect(() => {
    const items = bentoRef.current.querySelectorAll('.bento-item');
    items.forEach(item => {
      gsap.fromTo(item, 
        { y: 50, opacity: 0 }, 
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          scrollTrigger: { trigger: item, start: 'top 80%' } 
        }
      );

      item.addEventListener('mouseenter', () => {
        gsap.to(item, { scale: 1.05, duration: 0.3 });
      });

      item.addEventListener('mouseleave', () => {
        gsap.to(item, { scale: 1, duration: 0.3 });
      });
    });
  }, []);

  return (
    <div ref={bentoRef} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      <div className="bento-item col-span-1 md:col-span-2 row-span-2 card bg-base-300 shadow-xl image-full">
        <figure><img src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=1974&auto=format&fit=crop" alt="Plants" /></figure>
        <div className="card-body">
          <h2 className="card-title">Plant Care Tips</h2>
          <p>Learn how to care for your plants with our expert guides.</p>
        </div>
      </div>
      <div className="bento-item card bg-primary text-primary-content">
        <div className="card-body">
          <h2 className="card-title">Seasonal Recommendations</h2>
          <p>Find the best plants for the current season.</p>
        </div>
      </div>
      <div className="bento-item card bg-secondary text-secondary-content">
        <div className="card-body">
          <h2 className="card-title">Community Features</h2>
          <p>Connect with other plant lovers in our community.</p>
        </div>
      </div>
      <div className="bento-item col-span-1 md:col-span-3 card bg-accent text-accent-content">
        <div className="card-body">
          <h2 className="card-title">Care Difficulty Indicators</h2>
          <p>Easily find plants that match your skill level.</p>
        </div>
      </div>
    </div>
  );
};

export default MagicBento;
