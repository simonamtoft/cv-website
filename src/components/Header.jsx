import React from 'react';
import { Link } from 'react-router';
import '../styles/Header.css';
import config from '../config';
import useTypewriter from '../utils/useTypewriter';

const TAGLINE = 'I help organisations ship AI that actually works in production.';
const CHARS = TAGLINE.split('');

const Header = () => {
  const { revealed } = useTypewriter(TAGLINE);

  return (
    <header className="header">
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <div className="header-content">
        <h1>{config.personalInfo.name}</h1>
        <p className="header-subtitle">{config.personalInfo.subtitle}</p>
        <p className="header-tagline" aria-label={TAGLINE}>
          <span aria-hidden="true">
            {CHARS.map((char, i) => (
              <span key={i} className={i < revealed ? 'char char--visible' : 'char'}>
                {char}
              </span>
            ))}
          </span>
        </p>
        <Link to="/contact" className="header-cta">Let&rsquo;s Talk</Link>
        <div className="social-links">
          <a href={config.personalInfo.linkedIn.url} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href={config.personalInfo.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile">
            <i className="fab fa-github"></i>
          </a>
        </div>
      </div>
      <Link to="/about" className="hero-scroll-hint">
        About <i className="fas fa-arrow-right" aria-hidden="true" />
      </Link>
    </header>
  );
};

export default Header;
