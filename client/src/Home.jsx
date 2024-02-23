import React from 'react';
import "./styles/home.scss"
import Registration from "./components/Registration";
const Home = () => {
    return (
        <div className="home">
            <div className="home-navbar">
                <div className="home-navbar__login">Log In</div>
                <div className="home-navbar__registration">Sign In</div>
            </div>
            <Registration></Registration>
            <div className=""></div>
        </div>
    );
};

export default Home;