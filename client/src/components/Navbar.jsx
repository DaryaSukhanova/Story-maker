import React from 'react';
import { NavLink } from 'react-router-dom'
import "../styles/nav-bar.scss"
import { ReactComponent as IconSM } from '../assets/img/home.svg'
import { ReactComponent as IconGE } from '../assets/img/graphic-editor-icon.svg'
import { ReactComponent as IconAE } from '../assets/img/animation-editor-icon.svg'
import { ReactComponent as IconBE } from '../assets/img/book-editor-icon.svg'
const Navbar = () => {
    return (
        <div className="nav-bar">
            <NavLink to="/" className="home-icon">
                <IconSM className="home-icon"></IconSM>
                <div className="home-title">StoryMaker</div>
            </NavLink>
            <NavLink to="/graphic-editor" className="editor-link">
                <IconGE className="editor-icon"></IconGE>
                <div className="editor-icon__title">
                    Графический редактор
                </div>

            </NavLink>
            <NavLink to="/animation-editor" className="editor-link">
                <IconAE className="editor-icon"></IconAE>
                <div className="editor-icon__title">
                    Анимационный редактор
                </div>
            </NavLink>
            <NavLink to="/book-editor" className="editor-link">
                <IconBE className="editor-icon"></IconBE>
                <div className="editor-icon__title">
                    Редактор книги
                </div>
            </NavLink>
        </div>
    );
};

export default Navbar;