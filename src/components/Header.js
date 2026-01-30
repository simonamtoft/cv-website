import React, { useEffect, useCallback, useState, useRef } from 'react';
import '../styles/Header.css';
import config from '../config';

const Header = () => {
  const [isNavFixed, setIsNavFixed] = useState(false);
  const navRef = useRef(null);

  const smoothScroll = useCallback((event) => {
    event.preventDefault();
    const targetId = event.currentTarget.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth'
      });
    }
  }, []);

  useEffect(() => {
    const links = document.querySelectorAll('nav a');
    links.forEach(link => {
      link.addEventListener('click', smoothScroll);
    });

    return () => {
      links.forEach(link => {
        link.removeEventListener('click', smoothScroll);
      });
    };
  }, [smoothScroll]);

  useEffect(() => {
    // Debounce function for performance optimization
    const debounce = (func, wait) => {
      let timeout;
      return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
      };
    };

    const handleScroll = () => {
      if (navRef.current) {
        const offset = navRef.current.offsetTop;
        if (window.scrollY > offset) {
          setIsNavFixed(true);
        } else {
          setIsNavFixed(false);
        }
      }
    };

    const debouncedHandleScroll = debounce(handleScroll, 100);
    window.addEventListener('scroll', debouncedHandleScroll);

    return () => {
      window.removeEventListener('scroll', debouncedHandleScroll);
    };
  }, []);

  return (
    <header className="header">
      <a href="#about" className="skip-link">Skip to main content</a>
      <div className="header-content">
        <nav ref={navRef} className={isNavFixed ? 'fixed-nav' : ''}>
          <ul>
            {config.navigation.map((item) => (
              <li key={item.href}><a href={item.href}>{item.label}</a></li>
            ))}
          </ul>
        </nav>
        <h1>{config.personalInfo.name}</h1>
        <p>{config.personalInfo.subtitle}</p>
        <div className="social-links">
          <a href={config.personalInfo.linkedIn.url} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href={config.personalInfo.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile">
            <i className="fab fa-github"></i>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;