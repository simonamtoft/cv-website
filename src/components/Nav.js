import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import '../styles/Nav.css';
import config from '../config';

const ROUTE_META = {
  '/': { icon: 'fa-house', mobileLabel: 'Home' },
  '/about': { icon: 'fa-user', mobileLabel: 'About' },
  '/background': { icon: 'fa-briefcase', mobileLabel: 'Background' },
  '/writing': { icon: 'fa-feather', mobileLabel: 'Writing' },
  '/contact': { icon: 'fa-envelope', mobileLabel: 'Contact' },
};

const MOBILE_ITEMS = [{ label: 'Home', href: '/' }, ...config.navigation];

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

  // Keep the fixed mobile tab bar pinned to the visual viewport bottom on
  // iOS Safari/Chrome. WebKit anchors `position: fixed` to the layout
  // viewport, so when the URL bar collapses the visual viewport extends
  // below it and the bar appears to "hover" above the actual screen edge.
  useEffect(() => {
    if (typeof window === 'undefined' || !window.visualViewport) return;

    const root = document.documentElement;
    const update = () => {
      const vv = window.visualViewport;
      const offset = window.innerHeight - vv.height - vv.offsetTop;
      root.style.setProperty('--visual-viewport-bottom-offset', `${offset}px`);
    };

    update();
    window.visualViewport.addEventListener('resize', update);
    window.visualViewport.addEventListener('scroll', update);
    return () => {
      window.visualViewport.removeEventListener('resize', update);
      window.visualViewport.removeEventListener('scroll', update);
    };
  }, []);

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
    <>
      <nav className={`nav-pill${isFixed ? ' nav-pill--fixed' : ''}`} aria-label="Primary">
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

      <nav className="nav-mobile" aria-label="Primary mobile">
        <ul>
          {MOBILE_ITEMS.map((item) => {
            const meta = ROUTE_META[item.href] || {};
            const label = meta.mobileLabel || item.label;
            return (
              <li key={item.href}>
                <NavLink
                  to={item.href}
                  end={item.href === '/'}
                  className={({ isActive }) =>
                    isActive ? 'nav-mobile-link nav-mobile-link--active' : 'nav-mobile-link'
                  }
                >
                  <i className={`fas ${meta.icon || 'fa-circle'}`} aria-hidden="true" />
                  <span className="nav-mobile-label">{label}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};

export default Nav;
