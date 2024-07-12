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
            <nav className="navbar navbar-inverse" style={styles.navStyle}>
                <div className="navbar-header">
                    <button className="navbar-toggle collapsed" data-toggle="collapse" data-target="#nav-collapse">
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <div className="navbar-brand" style={styles.brandStyle}>Pixel Paradise</div>
                </div>
                <div className="collapse navbar-collapse" id="nav-collapse">
                    <ul className="nav navbar-nav">
                        {this.props.items.map(createLinkItem)}
                    </ul>
                    <ul className="nav navbar-nav navbar-right">
                        {console.log(isLoggedIn)}
                        { isLoggedIn ? (
                            <li><a href="/logout">Logout</a></li>
                        ) : (
                            <>
                                <li><a href="/signin">Sign-In</a></li>
                                <li><a href="/signup">Sign-Up</a></li>
                            </>
                        )}
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Navbar;
