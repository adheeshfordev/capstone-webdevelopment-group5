import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Header from '../components/Header';

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

  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!product) return <div>Loading...</div>;

  return (
<div>
        <Header />
    
    <Container className="product-detail mt-5">
      <Row>
        <Col md={6} className="text-center">
          <img src={product.imageUrl} alt={product.name} className="img-fluid rounded" />
        </Col>
        <Col md={6}>
          <h1 className="display-4">{product.name}</h1>
          <p className="lead">{product.description}</p>
          <h3 className="text-success">${product.price}</h3>
          <Link to={`/checkout`} state={{ product }}>
            <Button variant="primary" className="mt-3">Checkout</Button>
          </Link>
        </Col>
      </Row>
    </Container>
    </div>
  );
}

export default ProductDetail;
