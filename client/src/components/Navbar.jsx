import React from 'react';
import { NavLink } from 'react-router-dom'
import "../styles/nav-bar.scss"
import { ReactComponent as IconSM } from '../assets/img/icon-story-maker.svg'
const Navbar = () => {
    return (
        <div className="nav-bar">
            <NavLink to="/" activeClassName="active-link" className="home-icon">
                <IconSM activeClassName="home-icon"></IconSM>
            </NavLink>
            <NavLink to="/graphic-editor" activeClassName="active-link">
                Graphic Editor
            </NavLink>
            <NavLink to="/animation-editor" activeClassName="active-link">
                Animation Editor
            </NavLink>
            <NavLink to="/book-editor" activeClassName="active-link">
                Book Editor
            </NavLink>
        </div>
    );
};

export default Navbar;