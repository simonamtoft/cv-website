import React from 'react';
import '../styles/Footer.css';
import config from '../config';

const Footer = () => {
  return (
    <footer className='footer'>
      <p>&copy; {new Date().getFullYear()} {config.personalInfo.name}. All rights reserved.</p>
    </footer>
  );
};

export default Footer;