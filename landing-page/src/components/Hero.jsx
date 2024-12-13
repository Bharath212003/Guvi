// src/components/Hero.jsx
import React from 'react';

const Hero = () => (
  <header className="bg-primary text-white text-center py-5">
    <div className="container">
      <h1>Welcome to Our Landing Page</h1>
      <p className="lead">A simple landing page built with React and Bootstrap.</p>
      <a href="#about" className="btn btn-light btn-lg">Learn More</a>
    </div>
  </header>
);

export default Hero;
