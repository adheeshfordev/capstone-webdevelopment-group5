import React from 'react';
import { Link } from 'react-router-dom';

function ProductItem({ product }) {
  return (
    <div className="col-12 col-md-4 col-lg-3 mb-5">
      <Link className="product-item" to={`/product/${product._id}`}>
        <img className="img-fluid product-thumbnail" src={product.imageUrl} alt={product.name} />
        <h3 className="product-title">{product.name}</h3>
        <strong className="product-price">${product.price}</strong>
        <span className="icon-cross">
          <img src="/src/images/cross.svg" className="img-fluid" />
        </span>
      </Link>
    </div>
  );
}

export default ProductItem;
