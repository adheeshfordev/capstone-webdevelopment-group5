import React from 'react';
import { useLocation } from 'react-router-dom';
// import './CheckoutPage.css';

function CheckoutPage() {
  const location = useLocation();
  const { product } = location.state;

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>
      <div className="product-summary">
        <img src={product.image} alt={product.name} />
        <div>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>${product.price}</p>
        </div>
      </div>
      <form className="checkout-form">
        <label>
          Name:
          <input type="text" name="name" required />
        </label>
        <label>
          Address:
          <input type="text" name="address" required />
        </label>
        <label>
          Credit Card:
          <input type="text" name="creditCard" required />
        </label>
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
}

export default CheckoutPage;