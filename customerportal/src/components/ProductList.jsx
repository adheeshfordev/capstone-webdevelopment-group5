import React from 'react';
import ProductItem from './ProductItem';
// import './ProductList.css';

function ProductList({ products }) {
  return (
    <div class="row">
      {products.map(product => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductList;