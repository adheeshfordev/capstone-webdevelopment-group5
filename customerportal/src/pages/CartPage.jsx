import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const [cart, setCart] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await fetch('https://capstone-webdevelopment-group5-api.onrender.com/cart', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': Cookies.get('token'),
        },
      });
      if (response.status === 403) {
        console.log(response.status);
        navigate('/signin');
        return;
      }
      const data = await response.json();

      if (response.ok) {
        setCart(data);
      } else {
        setError(data.message || 'Failed to fetch cart');
      }
    } catch (error) {
      setError(error.message || 'An error occurred while fetching the cart');
    }
  };

  const handleQuantityChange = async (productId, change) => {
    try {
      const currentQuantity = cart.items.find(item => item.product._id === productId).quantity;
      const newQuantity = currentQuantity + change;

      if (newQuantity <= 0) {
        return handleRemoveItem(productId); // If quantity is less than or equal to 0, remove the item
      }

      const response = await fetch('https://capstone-webdevelopment-group5-api.onrender.com/cart', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': Cookies.get('token'),
        },
        body: JSON.stringify({
          customerId: cart.customer,
          productId,
          quantity: newQuantity,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setCart(data);
      } else {
        setError(data.message || 'Failed to update cart item');
      }
    } catch (error) {
      setError(error.message || 'An error occurred while updating the cart item');
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      const response = await fetch('https://capstone-webdevelopment-group5-api.onrender.com/cart/item', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': Cookies.get('token'),
        },
        body: JSON.stringify({ productId }),
      });

      const data = await response.json();
      if (response.ok) {
        setCart(data);
      } else {
        setError(data.message || 'Failed to remove cart item');
      }
    } catch (error) {
      setError(error.message || 'An error occurred while removing the cart item');
    }
  };

  const handleClearCart = async () => {
    try {
      const response = await fetch('https://capstone-webdevelopment-group5-api.onrender.com/cart', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': Cookies.get('token'),
        },
      });

      const data = await response.json();
      if (response.ok) {
        setCart(data);
      } else {
        setError(data.message || 'Failed to clear cart');
      }
    } catch (error) {
      setError(error.message || 'An error occurred while clearing the cart');
    }
  };

  return (
    <div className="cart-page">
      <Header />
      <div className="container mb-5">
        <h1>Cart</h1>
        {error ? (
          <p className="error-message">{error}</p>
        ) : cart ? (
          cart.items.length > 0 ? (
            <div>
              {cart.items.map(item => (
                <div key={item.product._id} className="row cart-item mb-4">
                  <div className="col-md-2">
                    <img src={item.imageUrl} alt={item.product.name} className="img-fluid" />
                  </div>
                  <h2 className="col-md-5">{item.product.name}</h2>
                  <p className="col-md-2">Price: ${item.price.toFixed(2)}</p>
                  <div className="col-md-2 d-flex align-items-center">
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() => handleQuantityChange(item.product._id, -1)}
                      disabled={item.quantity <= 1}
                    >-</button>
                    <p className="m-0 mx-2">{item.quantity}</p>
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() => handleQuantityChange(item.product._id, 1)}
                    >+</button>
                  </div>
                  <i
                    className="fa fa-trash px-1 col-md-1"
                    onClick={() => handleRemoveItem(item.product._id)}
                  />
                </div>
              ))}

              <div className="cart-total">
                <h3>Total: ${cart.items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</h3>
              </div>
              <button className="btn btn-danger" onClick={handleClearCart}>Clear Cart</button>
              <a className="btn btn-primary ml-2" href="/checkout">Checkout</a>
            </div>
          ) : (
            <div>No products to display</div>
          )
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;
