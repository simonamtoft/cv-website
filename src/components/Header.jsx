import React from 'react';
import { Link } from 'react-router';
import '../styles/Header.css';
import config from '../config';

const Header = () => (
  <main className="home" id="main-content">
    <a href="#main-content" className="skip-link">Skip to main content</a>
    <h1 className="home-statement">
      I&rsquo;m Simon. I build machine learning systems that{' '}
      <Link to="/writing">survive production</Link>, advise teams on where AI{' '}
      <Link to="/about">actually fits</Link>, and help run an engineering community for{' '}
      <Link to="/talks">AI</Link>. See my path in{' '}
      <Link to="/background">the background</Link>; if you have a problem worth solving,{' '}
      <Link to="/contact">say hello</Link>.
    </h1>
    <p className="home-meta">{config.personalInfo.title}</p>
  </main>
);

export default Header;
