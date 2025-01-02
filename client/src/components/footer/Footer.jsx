import React from 'react';
import './footer.css';
import logo from '../../assets/logo.jfif';

// Import the necessary icons from react-icons
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} DMU Dormitory. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
