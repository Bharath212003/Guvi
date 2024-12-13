// src/components/Features.jsx
import React from 'react';

const Feature = ({ icon, title, description }) => (
  <div className="col-md-4 text-center">
    <div className="mb-4">
      <i className={`fa ${icon} fa-3x`}></i>
    </div>
    <h4>{title}</h4>
    <p>{description}</p>
  </div>
);

const Features = () => (
  <section id="features" className="py-5">
    <div className="container">
      <div className="row">
        <Feature icon="fa-cogs" title="Customizable" description="Easily customize your landing page." />
        <Feature icon="fa-mobile" title="Responsive" description="Looks great on any device." />
        <Feature icon="fa-heart" title="User Friendly" description="Simple and intuitive design." />
      </div>
    </div>
  </section>
);

export default Features;
