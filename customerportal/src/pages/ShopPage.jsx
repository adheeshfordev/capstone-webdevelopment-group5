import React, { Component } from 'react';
import ProductList from '../components/ProductList';
import Header from '../components/Header';

class ShopPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      error: null,
    };
  }

  componentDidMount() {
    this.fetchProducts();
  }

  fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:3000/products', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (response.ok) {
        this.setState({ products: data });
      } else {
        this.setState({ error: data.message || 'Failed to fetch products' });
      }
    } catch (error) {
      this.setState({ error: error.message || 'An error occurred while fetching products' });
    }
  };

  render() {
    const { products, error } = this.state;

    return (
      <div className="shop-page">
        <Header />
        <div className="untree_co-section product-section before-footer-section">
          <div className="container">
            {error ? (
              <p className="error-message">{error}</p>
            ) : (
              <ProductList products={products} />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default ShopPage;
