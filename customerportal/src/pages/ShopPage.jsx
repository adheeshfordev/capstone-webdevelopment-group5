import React, { useState } from 'react';
import ProductList from '../components/ProductList';

const productsData = [
  { id: 1, name: 'Product 1', description: 'Description of Product 1', price: 10, image: 'https://via.placeholder.com/150' },
  { id: 2, name: 'Product 2', description: 'Description of Product 2', price: 20, image: 'https://via.placeholder.com/150' },
  { id: 3, name: 'Product 3', description: 'Description of Product 3', price: 30, image: 'https://via.placeholder.com/150' },
];

function ShopPage() {
  const [products] = useState(productsData);

  return (
    <div className="shop-page">
      <div class="hero">
				<div class="container">
					<div class="row justify-content-between">
						<div class="col-lg-5">
							<div class="intro-excerpt">
								<h1>Shop</h1>
							</div>
						</div>
						<div class="col-lg-7">
							
						</div>
			    </div>
		</div>
	</div>
    <div class="untree_co-section product-section before-footer-section">
		    <div class="container">

                <ProductList products={products} />
					
            </div>
    </div>
    </div>
  );
}

export default ShopPage;