import React from "react";
import "./Footer.css"; // Import the CSS file
import { FaFacebook, FaInstagram, FaPinterest, FaTiktok } from 'react-icons/fa'; // Import icons

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-subscribe">
        <h3>Subscribe</h3>
        <div className="subscribe-input">
          <input type="email" placeholder="Email" />
          <button>→</button>
        </div>
        <div className="social-icons">
          <a href="#"><FaFacebook size={24} /></a>
          <a href="#"><FaInstagram size={24} /></a>
          <a href="#"><FaPinterest size={24} /></a>
          <a href="#"><FaTiktok size={24} /></a>
        </div>
        <p>Explore our sister site:</p>
        <a href="#" className="sister-site">Daitool</a>
      </div>

      <div className="footer-links">
        <div className="footer-column">
          <h3>Shop</h3>
          <ul>
            <li><a href="#">Groceries</a></li>
            <li><a href="#">Snacks</a></li>
            <li><a href="#">Beauty</a></li>
            <li><a href="#">Health</a></li>
            <li><a href="#">Home</a></li>
            <li><a href="#">Office</a></li>
            <li><a href="#">Gifts</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>My Account</h3>
          <ul>
            <li><a href="#">Sign In</a></li>
            <li><a href="#">Register</a></li>
            <li><a href="#">My Wishlist</a></li>
            <li><a href="#">Order Status</a></li>
            <li><a href="#">Purchase History</a></li>
            <li><a href="#">Request a Product</a></li>
            <li><a href="#">My Rewards</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>About</h3>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Our Brands</a></li>
            <li><a href="#">Japanese Taste Blog</a></li>
            <li><a href="#">Japanese Recipes</a></li>
            <li><a href="#">JT Rewards</a></li>
            <li><a href="#">Reviews</a></li>
            <li><a href="#">Wholesale</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Help</h3>
          <ul>
            <li><a href="#">Help Centre</a></li>
            <li><a href="#">Shipping</a></li>
            <li><a href="#">Returns & Exchanges</a></li>
            <li><a href="#">Email Us</a></li>
            <li><a href="#">Chat With Us</a></li>
            <li><a href="#">WhatsApp</a></li>
            <li><a href="#">¿Ayuda en español?</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>Copyright © 2024, Expandy Co. Ltd. or its affiliates. All rights reserved.</p>
        <div className="payment-methods">
          <img src="amex-icon.png" alt="Amex" />
          <img src="apple-pay-icon.png" alt="Apple Pay" />
          <img src="google-pay-icon.png" alt="Google Pay" />
          <img src="visa-icon.png" alt="Visa" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
