import React, { useEffect, useCallback } from 'react';
import '../styles/Header.css';

const Header = () => {
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

  return (
    <header className="header">
      <div className="header-content">
        <nav>
          <ul>
            <li><a href="#about">About</a></li>
            <li><a href="#timeline">Resume</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
        <h1>Simon Amtoft Pedersen</h1>
        <p>MSc Engineering | Data Scientist </p>
      </div>
    </header>
  );
};

export default Header;