import React, { useEffect, useCallback, useState, useRef } from 'react';
import '../styles/Header.css';

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

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className="header">
      <div className="header-content">
        <nav ref={navRef} className={isNavFixed ? 'fixed-nav' : ''}>
          <ul>
            <li><a href="#about">About</a></li>
            <li><a href="#timeline">Resume</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
        <h1>Simon Amtoft Pedersen</h1>
        <p>MSc Engineering | Senior Data Scientist </p>
      </div>
    </header>
  );
};

export default Header;