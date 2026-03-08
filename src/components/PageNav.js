import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/PageNav.css';

const PageNav = ({ next, prev }) => (
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

export default PageNav;
