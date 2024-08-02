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
								<p className="mb-4">Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique.</p>
								<p><a href="" className="btn btn-secondary me-2">Shop Now</a><a href="#" className="btn btn-white-outline">Explore</a></p>
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
						<p className="mb-4">Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique. </p>
						<p><a href="/shop" className="btn">Explore</a></p>
					</div> 
					
					<div className="col-12 col-md-4 col-lg-3 mb-5 mb-md-0">
						<a className="product-item" href="/cart">
							<img src="/src/images/product-1.jpg" className="img-fluid product-thumbnail"/>
							<h3 className="product-title">Spider-Man Miles Morales</h3>
							<strong className="product-price">$50.00</strong>

							<span className="icon-cross">
								<img src="/src/images/cross.svg" className="img-fluid"/>
							</span>
						</a>
					</div> 
					
					<div className="col-12 col-md-4 col-lg-3 mb-5 mb-md-0">
						<a className="product-item" href="/cart">
							<img src="/src/images/product-2.jfif" className="img-fluid product-thumbnail"/>
							<h3 className="product-title">NBA 2K</h3>
							<strong className="product-price">$78.00</strong>

							<span className="icon-cross">
								<img src="/src/images/cross.svg" className="img-fluid"/>
							</span>
						</a>
					</div>
					
					<div className="col-12 col-md-4 col-lg-3 mb-5 mb-md-0">
						<a className="product-item" href="/cart">
							<img src="/src/images/product-3.png" className="img-fluid product-thumbnail"/>
							<h3 className="product-title">GOD Fall</h3>
							<strong className="product-price">$43.00</strong>

							<span className="icon-cross">
								<img src="/src/images/cross.svg" className="img-fluid"/>
							</span>
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
						<p>Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique.</p>

						<div className="row my-5">
							<div className="col-6 col-md-6">
								<div className="feature">
									<div className="icon">
										<img src="/src/images/truck.svg" alt="Image" className="imf-fluid"/>
									</div>
									<h3>Fast &amp; Free Shipping</h3>
									<p>Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate.</p>
								</div>
							</div>

							<div className="col-6 col-md-6">
								<div className="feature">
									<div className="icon">
										<img src="/src/images/bag.svg" alt="Image" className="imf-fluid"/>
									</div>
									<h3>Easy to Shop</h3>
									<p>Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate.</p>
								</div>
							</div>

							<div className="col-6 col-md-6">
								<div className="feature">
									<div className="icon">
										<img src="/src/images/support.svg" alt="Image" className="imf-fluid"/>
									</div>
									<h3>24/7 Support</h3>
									<p>Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate.</p>
								</div>
							</div>

							<div className="col-6 col-md-6">
								<div className="feature">
									<div className="icon">
										<img src="/src/images/return.svg" alt="Image" className="imf-fluid"/>
									</div>
									<h3>Hassle Free Returns</h3>
									<p>Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate.</p>
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
