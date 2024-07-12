import React, { Component } from 'react';
import Cookies from 'js-cookie';
import NavItems from './NavItems.jsx';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            navColor: "",
            navBorder: "",
            brandColor: "",
            isLoggedIn: false,
        };
    }

    componentDidMount() {
        const token = Cookies.get('token');
        if (token) {
            console.log(token);
            this.setState({ isLoggedIn: true });
        }
    }

    render() {
        const createLinkItem = (item, index) => {
            let linkColor = "";
            if (item.color) linkColor = item.color;
            return <NavItems key={item.title + index} title={item.title} href={item.href} color={linkColor} />;
        };

        const styles = {
            navStyle: {
                background: this.state.navColor,
                borderColor: this.state.navBorder,
            },
            brandStyle: {
                color: this.state.brandColor,
            },
        };

        const { isLoggedIn } = this.state;
        console.log(isLoggedIn);

        return (
            




            <nav className="custom-navbar navbar navbar navbar-expand-md navbar-dark bg-dark" arial-label="Furni navigation bar">

			<div className="container">
				<a className="navbar-brand" href="index.html">Pixel Paradise<span>.</span></a>

				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsFurni" aria-controls="navbarsFurni" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>

				<div className="collapse navbar-collapse" id="navbarsFurni">
					<ul className="custom-navbar-nav navbar-nav ms-auto mb-2 mb-md-0">
						{this.props.items.map(createLinkItem)}
					</ul>

					<ul className="custom-navbar-cta navbar-nav mb-2 mb-md-0 ms-5">
						<li><a className="nav-link" href="#"><img src="/src/images/user.svg" /></a></li>
						<li><a className="nav-link" href="cart.html"><img src="/src/images/cart.svg" /></a></li>
					</ul>
				</div> 
			</div>
				
		</nav>
        );
    }
}

export default Navbar;
