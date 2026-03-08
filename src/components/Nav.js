import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import '../styles/Nav.css';
import config from '../config';

const Nav = () => {
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const [isFixed, setIsFixed] = useState(!isHome);

  useEffect(() => {
    if (!isHome) {
      setIsFixed(true);
      return;
    }

    setIsFixed(false);

    const debounce = (func, wait) => {
      let timeout;
      return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
      };
    };

    const handleScroll = () => {
      // Fix nav after scrolling past ~60px (clears the hero top area)
      setIsFixed(window.scrollY > 60);
    };

    const debouncedHandleScroll = debounce(handleScroll, 50);
    window.addEventListener('scroll', debouncedHandleScroll);
    return () => window.removeEventListener('scroll', debouncedHandleScroll);
  }, [isHome]);

  const navLinks = config.navigation.map((item) => (
    <li key={item.href}>
      <NavLink
        to={item.href}
        className={({ isActive }) => isActive ? 'nav-link nav-link--active' : 'nav-link'}
        end={item.href === '/'}
      >
        {item.label}
      </NavLink>
    </li>
  ));

  return (
    <nav className={`nav-pill${isFixed ? ' nav-pill--fixed' : ''}`}>
      <ul>
        {!isHome && (
          <li className="nav-home-item">
            <NavLink to="/" className="nav-link nav-home-link" title="Home">
              <i className="fas fa-house" aria-hidden="true" />
            </NavLink>
          </li>
        )}
        {navLinks}
      </ul>
    </nav>
  );
};

export default Nav;
