import React from 'react';
import { Link } from 'react-router';
import '../styles/Header.css';
import config from '../config';

const Header = () => (
  <main className="home" id="main-content">
    <a href="#main-content" className="skip-link">Skip to main content</a>
    <h1 className="home-statement">
      I&rsquo;m Simon. I build ML and{' '}
      <Link to="/writing/agentic-engineering">agentic AI systems</Link> that hold up in production,
      help leadership teams decide where AI belongs in their business and{' '}
      <Link to="/about">in what order</Link>, and chair the{' '}
      <Link to="/talks">AI community</Link> of Denmark&rsquo;s largest engineering association. See my path in{' '}
      <Link to="/background">the background</Link>; if you have a problem worth solving,{' '}
      <Link to="/contact">say hello</Link>.
    </h1>
    <p className="home-meta">{config.personalInfo.title}</p>
  </main>
);

export default Header;
