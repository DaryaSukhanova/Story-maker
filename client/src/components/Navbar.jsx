import React from 'react';
import {Link} from "react-router-dom";

const Navbar = () => {
    return (
        <div className="nav-bar">
            <Link to="/graphic-editor">Графический редактор</Link>
            <Link to="/animation-editor">Анимационный редактор</Link>
        </div>
    );
};

export default Navbar;