import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer p-10 bg-base-200 text-base-content">
      <div>
        <span className="footer-title">Services</span>
        <Link to="/" className="link link-hover">Branding</Link>
        <Link to="/" className="link link-hover">Design</Link>
        <Link to="/" className="link link-hover">Marketing</Link>
        <Link to="/" className="link link-hover">Advertisement</Link>
      </div>
      <div>
        <span className="footer-title">Company</span>
        <Link to="/about" className="link link-hover">About us</Link>
        <Link to="/contact" className="link link-hover">Contact</Link>
        <Link to="/" className="link link-hover">Jobs</Link>
        <Link to="/" className="link link-hover">Press kit</Link>
      </div>
      <div>
        <span className="footer-title">Legal</span>
        <Link to="/" className="link link-hover">Terms of use</Link>
        <Link to="/" className="link link-hover">Privacy policy</Link>
        <Link to="/" className="link link-hover">Cookie policy</Link>
      </div>
      <div>
        <span className="footer-title">Social</span>
        <div className="grid grid-flow-col gap-4">
          <a href="#" className="link link-hover"><Twitter /></a>
          <a href="#" className="link link-hover"><Instagram /></a>
          <a href="#" className="link link-hover"><Facebook /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
