import React from 'react';
import "./styles/home.scss"
import Registration from "./components/Registration";
import {NavLink} from "react-router-dom";
import Login from "./components/Login";
const Home = () => {
    return (
        <div className="home">
            {/*<div className="home-navbar">*/}
            {/*    <div className="navbar__login"><NavLink to="/login">Log In</NavLink></div>*/}
            {/*    <div className="navbar__login"><NavLink to="/registration">Sign In</NavLink></div>*/}
            {/*</div>*/}
            {/*<Login></Login>*/}
            {/*<Registration></Registration>*/}
        </div>
    );
};

export default Home;