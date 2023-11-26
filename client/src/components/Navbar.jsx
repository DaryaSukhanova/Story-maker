import React from 'react';
import {Link} from "react-router-dom";

const Navbar = () => {
    return (
        <div className="nav-bar">
            <Link to="/graphic-editor">Graphic Editor</Link>
            <Link to="/animation-editor">Animation Editor</Link>
        </div>
    );
};

export default Navbar;