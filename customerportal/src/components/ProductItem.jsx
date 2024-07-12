import React from 'react';
import { Link } from 'react-router-dom';
// import './ProductItem.css';

function ProductItem({ product }) {
  return (
    <div class="col-12 col-md-4 col-lg-3 mb-5">
        <Link class="product-item" to={`/product/${product.id}`}>
            <img class="img-fluid product-thumbnail" src='/src/images/product-3.jfif' alt={product.name} />
            <h3 class="product-title">{product.name}</h3>
            <strong class="product-price">${product.price}</strong>

            <span class="icon-cross">
                <img src="/src/images/cross.svg" class="img-fluid" />
            </span>
        </Link>
</div> 
  );
}

export default ProductItem;