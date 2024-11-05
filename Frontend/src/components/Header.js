import React from 'react';
import './Header.css';
import { FaUserAlt, FaHeart, FaShoppingCart, FaSearch } from 'react-icons/fa'; // FontAwesome icons
import logo from './logo.png'; // Update the path to your logo
import SearchBar from './SearchBar';
const Header = () => {

  return (
    <header className="header">
      <div className="header__logo">
        <img src={logo} alt="Store Logo" /> {/* Update the path to your logo */}
      </div>

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
