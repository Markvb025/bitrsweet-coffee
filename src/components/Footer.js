import React from "react";
import "./Footer.css";
import { FaFacebook, FaInstagram, FaTwitter, FaTiktok, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top container">
        <div className="footer-section">
          <h5 className="footer-brand">BitrSweet. Coffee</h5>
          <p>
            Serving the finest coffee with love since 2025.
            <br /> Come in, relax, and enjoy your perfect cup.
          </p>
        </div>

        <div className="footer-section">
          <h5>Contact Us</h5>
          <p><FaMapMarkerAlt /> Cabuyao, Laguna, Philippines</p>
          <p><FaPhoneAlt /> +63 912 345 6789</p>
          <p><FaEnvelope /> hello@coffee-delight.com</p>
        </div>

        <div className="footer-section">
          <h5>Quick Links</h5>
          <a href="/">Home</a>
          <a href="/menu">Menu</a>
          <a href="/about">About Us</a>
          <a href="/contact">Contact</a>
        </div>

        <div className="footer-section">
          <h5>Follow Us</h5>
          <div className="social-icons">
            <a href="#"><FaFacebook /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaTiktok /></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        © 2025 BitrSweet. Coffee | All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;
