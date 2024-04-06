// ProductList.js
import React, { useState, useEffect } from 'react';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://dummyapi.com/products')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Failed to fetch products:', error);
        setLoading(false);
      });
  }, []);

  // Dummy product data
  const dummyProducts = [
    { id: 10, name: "Dummy Product 1", price: 10, quantity: 5 },
    { id: 15, name: "Dummy Product 2", price: 20, quantity: 25 }
  ];

  return (
    <div>
      <h2>Product List</h2>
      <div className="row">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {dummyProducts.map(product => (
              <div key={product.id} className="col-md-4 mb-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">Price: ${product.price}</p>
                    <p>Product ID: {product.id}, Quantity: {product.quantity}</p>
                  </div>
                </div>
              </div>
            ))}
            {products.map(product => (
              <div key={product.id} className="col-md-4 mb-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">Price: ${product.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default ProductList;
