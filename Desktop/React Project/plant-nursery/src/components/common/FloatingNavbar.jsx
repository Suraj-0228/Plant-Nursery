import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { gsap } from 'gsap';

const FloatingNavbar = () => {
  const navbarRef = useRef(null);

  useEffect(() => {
    const showAnim = gsap.from(navbarRef.current, {
      yPercent: -100,
      paused: true,
      duration: 0.2
    }).progress(1);

    ScrollTrigger.create({
      start: "top top",
      end: "max",
      onUpdate: (self) => {
        self.direction === -1 ? showAnim.play() : showAnim.reverse();
      }
    });
  }, []);

  return (
    <div ref={navbarRef} className="navbar bg-base-100 shadow-lg fixed top-0 left-0 right-0 z-50">
       <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/category">Category</Link></li>
            <li><Link to="/guide">Guide</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost normal-case text-xl">PlantNursery</Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/category">Category</Link></li>
            <li><Link to="/guide">Guide</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
        </ul>
      </div>
      <div className="navbar-end">
        <ThemeToggle />
      </div>
    </div>
  );
};

export default FloatingNavbar;
