import React from 'react'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import Banner from '../components/Banner.jsx'

export default function Home() {
  return (
    <div>
        <Header />
        <div className="hero">
				<div className="container">
					<div className="row justify-content-between">
						<div className="col-lg-5">
							<div className="intro-excerpt">
								<h1>Modern Game <span clsas="d-block">Zone Studio</span></h1>
								<p className="mb-4">Browse our wonderful array of games.</p>
								<p><a href="/shop" className="btn btn-secondary me-2">Shop Now</a></p>
							</div>
						</div>
						<div className="col-lg-7">
							<div className="hero-img-wrap">
								<img src="/src/images/banner.webp" className="img-fluid" />
							</div>
						</div>
					</div>
				</div>
			</div>

		
		<div className="product-section">
			<div className="container">
				<div className="row">

					
					<div className="col-md-12 col-lg-3 mb-5 mb-lg-0">
						<h2 className="mb-4 section-title">Excellent Gaming.</h2>
						<p className="mb-4">All your favourite games in one place.</p>
						<p><a href="/shop" className="btn">Explore</a></p>
					</div> 
					
					<div className="col-12 col-md-4 col-lg-3 mb-5 mb-md-0">
						<a className="product-item" href="/shop">
							<img src="/src/images/product-1.jpg" className="img-fluid product-thumbnail"/>
							<h3 className="product-title">Your favourite games</h3>
						</a>
					</div> 
					
					<div className="col-12 col-md-4 col-lg-3 mb-5 mb-md-0">
						<a className="product-item" href="/shop">
							<img src="/src/images/product-2.jfif" className="img-fluid product-thumbnail"/>
							<h3 className="product-title">The Best titles</h3>
						</a>
					</div>
					
					<div className="col-12 col-md-4 col-lg-3 mb-5 mb-md-0">
						<a className="product-item" href="/shop">
							<img src="/src/images/product-3.png" className="img-fluid product-thumbnail"/>
							<h3 className="product-title">All in our shop</h3>
						</a>
					</div>
					

				</div>
			</div>
		</div>
		
		<div className="why-choose-section">
			<div className="container">
				<div className="row justify-content-between">
					<div className="col-lg-6">
						<h2 className="section-title">Why Choose Us</h2>
						<div className="row my-5">
							<div className="col-6 col-md-6">
								<div className="feature">
									<div className="icon">
										<img src="/src/images/truck.svg" alt="Image" className="imf-fluid"/>
									</div>
									<h3>Fast &amp; Free Shipping</h3>
								</div>
							</div>

							<div className="col-6 col-md-6">
								<div className="feature">
									<div className="icon">
										<img src="/src/images/bag.svg" alt="Image" className="imf-fluid"/>
									</div>
									<h3>Easy to Shop</h3>
								</div>
							</div>

							<div className="col-6 col-md-6">
								<div className="feature">
									<div className="icon">
										<img src="/src/images/support.svg" alt="Image" className="imf-fluid"/>
									</div>
									<h3>24/7 Support</h3>
								</div>
							</div>

							<div className="col-6 col-md-6">
								<div className="feature">
									<div className="icon">
										<img src="/src/images/return.svg" alt="Image" className="imf-fluid"/>
									</div>
									<h3>Hassle Free Returns</h3>
								</div>
							</div>

						</div>
					</div>

					<div className="col-lg-5">
						<div className="img-wrap">
							<img src="/src/images/why-choose-us-img.png" alt="Image" className="img-fluid"/>
						</div>
					</div>

				</div>
			</div>
		</div>
		
		
		

        <Footer />
    </div>
  )
}
