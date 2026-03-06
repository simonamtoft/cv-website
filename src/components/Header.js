import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';
import config from '../config';

const Header = () => {
  return (
    <header className="header">
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <div className="header-content">
        <h1>{config.personalInfo.name}</h1>
        <p className="header-subtitle">{config.personalInfo.subtitle}</p>
        <p className="header-tagline">
          I help organisations move from &ldquo;we have data&rdquo; to AI that actually works in production.
        </p>
        <Link to="/contact" className="header-cta">Let&rsquo;s Talk</Link>
        <div className="social-links">
          <a href={config.personalInfo.linkedIn.url} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile">
            <i className="fab fa-linkedin"></i>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
