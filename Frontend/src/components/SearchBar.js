import React from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {

  const handleInputChange = (y) => {
    const query = y.target.value;
    if (onSearch) {
      onSearch(query); // Trigger the search on every input change
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search..."
        onChange={handleInputChange} // Filter as user types
      />
    </div>
  );
};

export default SearchBar;
