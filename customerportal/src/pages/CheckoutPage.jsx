import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Row } from 'react-bootstrap';

const CheckoutPage = () => {
  const [cart, setCart] = useState(null);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    creditCard: '',
    expiry: '',
    cvv: '',
  });
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://capstone-webdevelopment-group5-api.onrender.com/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': Cookies.get('token'),
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        navigate('/success'); // Redirect to a success page
      } else {
        setError(data.message || 'Failed to place order');
      }
    } catch (error) {
      setError(error.message || 'An error occurred while placing the order');
    }
  };

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  if (!cart) {
    return <p>Loading...</p>;
  }

  return (
    <div className="checkout-page">
      <Header />
      <div className="container">
        <h1 className="my-4">Checkout</h1>
        <div className="row mb-4">
          <div className="col-md-8">
            <div className="product-summary">
              {cart.items.map((item) => (
                <div key={item.product._id} className="card mb-3">
                  <div className="row no-gutters">
                    <div className="col-md-4">
                      <img src={item.imageUrl} className="card-img" alt={item.product.name} />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">{item.product.name}</h5>
                        <p className="card-text">{item.product.description}</p>
                        <p className="card-text">
                          <small className="text-muted">Price: ${item.price.toFixed(2)}</small>
                        </p>
                        <p className="card-text">
                          <small className="text-muted">Quantity: {item.quantity}</small>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="cart-total">
              <h3 className="my-4">
                Total: $
                {cart.items.reduce(
                  (total, item) => total + item.price * item.quantity,
                  0
                ).toFixed(2)}
              </h3>
            </div>
          </div>
          <div className="col-md-4">
            <form className="checkout-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="address">Shipping Address:</label>
                <textarea
                  rows="3"
                  className="form-control"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="creditCard">Credit Card:</label>
                <input
                  type="text"
                  className="form-control"
                  id="creditCard"
                  name="creditCard"
                  value={formData.creditCard}
                  onChange={handleChange}
                  required
                  pattern="\d{16}|\d{4}\s\d{4}\s\d{4}\s\d{4}"
                  maxLength="19"
                  placeholder="1234567812345678 or 1234 5678 1234 5678"
                />
              </div>
              <div className="form-row">
                <div className="form-group col-xs-6">
                  <label htmlFor="expiry">Expiry:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="expiry"
                    name="expiry"
                    value={formData.expiry}
                    onChange={handleChange}
                    required
                    pattern="\d{2}/\d{2}"
                    placeholder="MM/YY"
                  />
                </div>
                <div className="form-group col-xs-6">
                  <label htmlFor="cvv">CVV:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="cvv"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleChange}
                    required
                    pattern="\d{3}"
                    maxLength="3"
                    placeholder="123"
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-primary mt-3">Place Order</button>
            </form>
          </div>
        </div>
        <Row className="mb-5"/>
      </div>
      <Footer />
    </div>
  );
};

export default CheckoutPage;
