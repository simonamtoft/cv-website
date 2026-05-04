import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import config from '../config';
import '../styles/PageNav.css';

const PageNav = () => {
  const { pathname } = useLocation();
  const nav = config.navigation;
  const idx = nav.findIndex(item => item.href === pathname);
  const prev = idx > 0 ? { label: nav[idx - 1].label, path: nav[idx - 1].href } : null;
  const next = idx >= 0 && idx < nav.length - 1 ? { label: nav[idx + 1].label, path: nav[idx + 1].href } : null;

  return (
    <nav className="page-nav" aria-label="Page navigation">
      {prev && (
        <Link to={prev.path} className="page-nav-link page-nav-prev">
          <i className="fas fa-arrow-left"></i> {prev.label}
        </Link>
      )}
      {next && (
        <Link to={next.path} className="page-nav-link page-nav-next">
          {next.label} <i className="fas fa-arrow-right"></i>
        </Link>
      )}
    </nav>
  );
};

export default PageNav;
