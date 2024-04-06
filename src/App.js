// App.js
import React from 'react';
import './App.css'; // If you're using Bootstrap, import Bootstrap CSS here
import ProductList from './components/ProductList';
import ShoppingCart from './components/ShoppingCart';
import SearchBar from './components/SearchBar';

function App() {
  return (
    <div className="App">
      <h1>E-commerce Platform</h1>
      <SearchBar />
      <ProductList />
      <ShoppingCart />
    </div>
  );
}

export default App;
