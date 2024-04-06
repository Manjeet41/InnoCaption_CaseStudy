// SearchBar.js
import React, { useState } from 'react';

function SearchBar({ products, setFilteredProducts }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = products.filter(product => product.name.toLowerCase().includes(query) || product.category.toLowerCase().includes(query));
    setFilteredProducts(filtered);
  }

  return (
    <div>
      <input type="text" placeholder="Search by name or category" value={searchQuery} onChange={handleSearch} />
    </div>
  );
}

export default SearchBar;
