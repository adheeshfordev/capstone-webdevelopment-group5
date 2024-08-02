import React from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

function ProductItem({ product }) {
  const addToCart = async (productId) => {
    try {
      const response = await fetch('http://localhost:3000/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': Cookies.get('token'),
        },
        body: JSON.stringify({ productId: product._id, quantity: 1 }),
      });

      if (response.ok) {
        alert('Product added to cart successfully!');
      } else {
        alert('Failed to add product to cart.');
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
      alert('Failed to add product to cart.');
    }
  };

  return (
    <div className="col-12 col-md-4 col-lg-3 mb-5">
      <div className="product-item">
        <Link to={`/product/${product._id}`}>
          <img className="img-fluid product-thumbnail" src={product.imageUrl} alt={product.name} />
        </Link>
        <h3 className="product-title">{product.name}</h3>
        <strong className="product-price">${product.price}</strong>
        <Link 
          className="add-cart" 
          onClick={() => addToCart(product._id)}
        >
          <span className="icon-cross">
            <img src="/src/images/cross.svg" className="img-fluid" alt="Add to cart" />
          </span>
        </Link>
      </div>
    </div>
  );
}

export default ProductItem;
