import React from 'react';
import ProductItem from './ProductItem';
// import './ProductList.css';

function ProductList({ products }) {
  return (
    <div className="row">
      {products.map(product => (
        <ProductItem key={product._id} product={product} />
      ))}
    </div>
  );
}

export default ProductList;