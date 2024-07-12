import React, { useState } from 'react';

const NavItems = (props) => {
    const [hover, setHover] = useState(false);

    const mouseOver = () => {
        setHover(true);
    };

    const mouseOut = () => {
        setHover(false);
    };

    let color = "";
    if (props.color) {
        color = props.color;
    }

    const styles = {
        color: color
    };

    return (
        <li><a className="nav-link" href={props.href}>{props.title}</a></li>
    );
};

export default NavItems;
