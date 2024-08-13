import React, { Component } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer.jsx'
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
      const response = await fetch('https://capstone-webdevelopment-group5-api.onrender.com/cart', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': Cookies.get('token'),
        },
      });

      const data = await response.json();

      if (response.status === 403) {
        this.props.history.push('/signin');
        return;
      }


      if (response.ok) {
        this.setState({ cart: data });
      } else {
        this.setState({ error: data.message || 'Failed to fetch cart' });
      }
    } catch (error) {
      this.setState({ error: error.message || 'An error occurred while fetching the cart' });
    }
  };

  handleQuantityChange = async (productId, change) => {
    console.log(productId);
    try {
      const currentQuantity = this.state.cart.items.find(item => item.product._id === productId).quantity;
      const newQuantity = currentQuantity + change;

      if (newQuantity <= 0) {
        return this.handleRemoveItem(productId); // If quantity is less than or equal to 0, remove the item
      }

      const response = await fetch('https://capstone-webdevelopment-group5-api.onrender.com/cart', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': Cookies.get('token'),
        },
        body: JSON.stringify({
          customerId: this.state.cart.customer,
          productId,
          quantity: newQuantity,
        }),
      });

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        this.setState({ cart: data });
      } else {
        this.setState({ error: data.message || 'Failed to update cart item' });
      }
    } catch (error) {
      this.setState({ error: error.message || 'An error occurred while updating the cart item' });
    }
  };


  handleRemoveItem = async (productId) => {
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
        this.setState({ cart: data });
      } else {
        this.setState({ error: data.message || 'Failed to remove cart item' });
      }
    } catch (error) {
      this.setState({ error: error.message || 'An error occurred while removing the cart item' });
    }
  };

  handleClearCart = async () => {
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
        this.setState({ cart: data });
      } else {
        this.setState({ error: data.message || 'Failed to clear cart' });
      }
    } catch (error) {
      this.setState({ error: error.message || 'An error occurred while clearing the cart' });
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
                  <div key={item.product._id} className="row cart-item">
                    <h2 className="col-md-7">{item.product.name}</h2>
                    <p className="col-md-2">Price: ${item.price.toFixed(2)}</p>
                    <div className="col-md-2 d-flex align-items-center">
                      <button
                        className="btn btn-outline-secondary"
                        onClick={() => this.handleQuantityChange(item.product._id, -1)}
                        disabled={item.quantity <= 1}
                      >-</button>
                      <p className="m-0 mx-2">{item.quantity}</p>
                      <button
                        className="btn btn-outline-secondary"
                        onClick={() => this.handleQuantityChange(item.product._id, 1)}
                      >+</button>
                    </div>
                    <button
                      className="btn btn-danger px-1 col-md-1"
                      onClick={() => this.handleRemoveItem(item.product._id)}
                    >
                      Remove
                    </button>
                  </div>
                ))}

                <div className="cart-total">
                  <h3>Total: ${cart.items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</h3>
                </div>
                <button className="btn btn-danger" onClick={this.handleClearCart}>Clear Cart</button>
                <a className="btn" href="/checkout">Checkout</a>
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
  }
}

export default CartPage;
