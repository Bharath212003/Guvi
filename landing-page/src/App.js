// src/App.jsx
import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import CTA from './components/CTA';
import Footer from './components/Footer';

const App = () => (
  <>
    <Navbar />
    <Hero />
    <Features />
    <CTA />
    <Footer />
  </>
);

export default App;
