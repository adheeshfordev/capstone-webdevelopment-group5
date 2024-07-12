import React from 'react';
import { useParams, Link } from 'react-router-dom';
// import './ProductDetail.css';

const productsData = [
  { id: 1, name: 'Product 1', description: 'Description of Product 1', price: 10, image: '/src/images/product-3.jfif' },
  { id: 2, name: 'Product 2', description: 'Description of Product 2', price: 20, image: '/src/images/product-3.jfif' },
  { id: 3, name: 'Product 3', description: 'Description of Product 3', price: 30, image: '/src/images/product-3.jfif' },
];

function ProductDetail() {
  const { id } = useParams();
  const product = productsData.find(p => p.id === parseInt(id));

  if (!product) return <div>Product not found</div>;

  return (
    <div className="product-detail">
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>${product.price}</p>
      <img src='/src/images/product-3.jfif' alt={product.name} />
      <Link to={`/checkout`} state={{ product }} className="checkout-button">Checkout</Link>
    </div>
    
  );
}

export default ProductDetail;