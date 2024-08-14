import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Alert, Form, InputGroup } from 'react-bootstrap';
import Header from '../components/Header';
import Cookies from 'js-cookie';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [confirmation, setConfirmation] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://capstone-webdevelopment-group5-api.onrender.com/products/${id}`);
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

  const handleQuantityChange = (operation) => {
    setQuantity((prevQuantity) => {
      if (operation === 'increment') {
        return prevQuantity + 1;
      } else if (operation === 'decrement' && prevQuantity > 1) {
        return prevQuantity - 1;
      } else {
        return prevQuantity;
      }
    });
  };

  const handleAddToCart = async () => {
    try {
      const response = await fetch('https://capstone-webdevelopment-group5-api.onrender.com/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': Cookies.get('token'),
        },
        body: JSON.stringify({ productId: product._id, quantity }),
      });
      if (response.status === 403) {
        navigate('/signin');
        return;
      }
      if (response.ok) {
        setConfirmation(true);
        setTimeout(() => setConfirmation(false), 3000);
      } else {
        const data = await response.json();
        
        setError(data.message || 'Failed to add to cart');
      }
    } catch (error) {
      setError(error.message || 'An error occurred while adding to the cart');
    }
  };

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
            <Form.Group className="mt-2">
              <InputGroup>
                <Button variant="outline-secondary" onClick={() => handleQuantityChange('decrement')}>-</Button>
                <Form.Control type="text" value={quantity} readOnly />
                <Button variant="outline-secondary" onClick={() => handleQuantityChange('increment')}>+</Button>
              </InputGroup>
            </Form.Group>
            <Button variant="primary" className="mt-3" onClick={handleAddToCart}>Add to Cart</Button>
            {confirmation && <Alert variant="success" className="mt-3">Item added to cart!</Alert>}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ProductDetail;
