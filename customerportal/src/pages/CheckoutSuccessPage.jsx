import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

const CheckoutSuccess = () => {
  return (
    <div>
      <Header />
      <div className="container text-center mt-5">
        <h1 className="display-4 text-success">Thank You!</h1>
        <p className="lead">Your order has been successfully placed.</p>
        <p>We appreciate your business and hope you enjoy your purchase.</p>
        <Link to="/" className="btn btn-primary mt-3">
          Return to Home
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default CheckoutSuccess;
