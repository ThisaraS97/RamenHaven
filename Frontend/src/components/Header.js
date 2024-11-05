import React from 'react';
import './Header.css';
import { FaUserAlt, FaHeart, FaShoppingCart, FaSearch } from 'react-icons/fa'; // FontAwesome icons
import logo from './logo.png'; // Update the path to your logo
import SearchBar from './SearchBar';
import { Link } from 'react-router-dom'; // Import the Link component
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import the Router, Route, and Routes components
import MainPage from '../pages/MainPage'; // Import the MainPage component
const Header = () => {

  return (
    <header className="header">
      <Link to="/main-page">
      <div className="header__logo">
        <img src={logo} alt="Store Logo" /> {/* Update the path to your logo */}
      </div>
      </Link>

      <div className="header__search">
        <input type="text" placeholder="Search all things at Japanese Taste" />
        <FaSearch className="search-icon" />
      </div>

      <div className="header__icons">
        <FaUserAlt className="icon" />
        <FaHeart className="icon" />
        <FaShoppingCart className="icon" />
      </div>
    </header>
  );
};

export default Header;
