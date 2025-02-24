import React, { useEffect, useCallback } from 'react';
import '../styles/Header.css';

const Header = () => {
  const smoothScroll = useCallback((event) => {
    event.preventDefault();
    const targetId = event.currentTarget.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    const headerOffset = 0;
    const elementPosition = targetElement.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    scrollTo(offsetPosition, 800); // Adjust the duration (in milliseconds) as needed
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

  const scrollTo = (targetPosition, duration) => {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    const animation = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = ease(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    };

    const ease = (t, b, c, d) => {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    };

    requestAnimationFrame(animation);
  };

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
        <p>Mathematical Engineer | Data Scientist | Wine Enthusiast</p>
      </div>
    </header>
  );
};

export default Header;