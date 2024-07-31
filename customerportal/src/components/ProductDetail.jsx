import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:3000/products/${id}`);
        const data = await response.json();
        if (response.ok) {
          setProduct(data);
        } else {
          setError(data.message || 'Failed to fetch product');
        }
      } catch (error) {
        setError(error.message || 'An error occurred while fetching the product');
      }
    };

    fetchProduct();
  }, [id]);

  if (error) return <div className="error-message">{error}</div>;
  if (!product) return <div>Loading...</div>;

  return (
    <div className="product-detail">
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>${product.price}</p>
      <img src={product.imageUrl} alt={product.name} />
      <Link to={`/checkout`} state={{ product }} className="checkout-button">Checkout</Link>
    </div>
  );
}

export default ProductDetail;
