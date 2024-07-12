import React from 'react';
import Header from '../components/Header';
// import './CheckoutPage.css';

function CartPage() {
  
  return (
   
    <div className="cart-page">
       <Header></Header>
      <h1>Cart</h1>
      <div>No products to display</div>
      <form className="checkout-form">
        <button type="submit">Go to Checkout</button>
      </form>
    </div>
  );
}

export default CartPage;
