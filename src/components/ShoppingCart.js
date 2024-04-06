// ShoppingCart.js
import React, { useState, useEffect } from 'react';

function ShoppingCart() {
  const [cart, setCart] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://dummyjson.com/carts/1')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch cart');
        }
        return response.json();
      })
      .then(data => setCart(data.products))
      .catch(error => setError(error.message));
  }, []);

  // Function to add an item to the cart
  const addToCart = (productId, quantity) => {
    fetch('https://dummyjson.com/carts/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: 1,
        products: [{ id: productId, quantity }]
      })
    })
    .then(response => {
      console.log('Add to cart response:', response); // Log the response
      if (!response.ok) {
        throw new Error('Failed to add item to cart. HTTP status ' + response.status);
      }
      return response.json();
    })
    .then(data => {
      console.log('Add to cart data:', data); // Log the response data
      if (data.success) {
        setCart(prevCart => [...prevCart, { id: productId, quantity }]);
      } else {
        setError('Failed to add item to cart');
      }
    })
    .catch(error => {
      console.error('Error adding item to cart:', error); // Log fetch error
      setError(error.message);
    });
  };

  // Function to remove an item from the cart
  const removeFromCart = (productId) => {
    fetch(`https://dummyjson.com/carts/1/${productId}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to remove item from cart');
      }
      return response.json();
    })
    .then(data => {
      if (data.success) {
        setCart(prevCart => prevCart.filter(item => item.id !== productId));
      } else {
        setError('Failed to remove item from cart');
      }
    })
    .catch(error => setError(error.message));
  };

  // Function to edit the quantity of an item in the cart
  const editCartItem = (productId, newQuantity) => {
    fetch(`https://dummyjson.com/carts/1/${productId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quantity: newQuantity })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to edit item in cart');
      }
      return response.json();
    })
    .then(data => {
      if (data.success) {
        setCart(prevCart => prevCart.map(item => 
          item.id === productId ? { ...item, quantity: newQuantity } : item
        ));
      } else {
        setError('Failed to edit item in cart');
      }
    })
    .catch(error => setError(error.message));
  };

  return (
    <div style={{ marginBottom: '20px' }}> {/* Add margin bottom */}
      <h2>Shopping Cart</h2>
      {error && <p>{error}</p>}
      <ul className="list-group">
        {cart.map(item => (
          <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
            {item.name} - Quantity: 
            <input
              type="number"
              value={item.quantity}
              onChange={(e) => editCartItem(item.id, parseInt(e.target.value))}
              className="form-control mx-2 w-auto"
            />
            <button onClick={() => removeFromCart(item.id)} className="btn btn-danger mx-2">Remove</button>
            <button onClick={() => console.log("Modify button clicked for item", item.id)} className="btn btn-primary">Modify</button>
          </li>
        ))}
      </ul>
      {/* Input fields to add a custom product to the cart */}
      <div className="mt-3">
        <input type="text" placeholder="Product ID" id="productId" className="form-control mx-2 w-auto" />
        <input type="number" placeholder="Quantity" id="productQuantity" className="form-control mx-2 w-auto" />
        <button onClick={() => addToCart(document.getElementById("productId").value, parseInt(document.getElementById("productQuantity").value))} className="btn btn-primary">Add Product</button>
      </div>
    </div>
  );
}

export default ShoppingCart;
