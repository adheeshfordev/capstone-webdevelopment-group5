import React, { Component } from 'react';
import Header from '../components/Header';
import Cookies from 'js-cookie';

class CartPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: null,
      error: null,
    };
  }

  componentDidMount() {
    this.fetchCart();
  }

  fetchCart = async () => {
    try {
      const response = await fetch('http://localhost:3000/cart', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': Cookies.get('token'),
        },
      });

      const data = await response.json();
      if (response.ok) {
        this.setState({ cart: data });
      } else {
        this.setState({ error: data.message || 'Failed to fetch cart' });
      }
    } catch (error) {
      this.setState({ error: error.message || 'An error occurred while fetching the cart' });
    }
  };

  render() {
    const { cart, error } = this.state;

    return (
      <div className="cart-page">
        <Header />
        <div className="container">
          <h1>Cart</h1>
          {error ? (
            <p className="error-message">{error}</p>
          ) : cart ? (
            cart.items.length > 0 ? (
              <div>
                {cart.items.map(item => (
                  <div key={item.product._id} className="cart-item">
                    <h2>{item.product.name}</h2>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: ${item.price.toFixed(2)}</p>
                  </div>
                ))}
                <div className="cart-total">
                  <h3>Total: ${cart.items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</h3>
                </div>
                <form className="checkout-form">
                  <button type="submit">Go to Checkout</button>
                </form>
              </div>
            ) : (
              <div>No products to display</div>
            )
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    );
  }
}

export default CartPage;
