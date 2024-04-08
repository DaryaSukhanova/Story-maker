import React from 'react';
import "./styles/home.scss"
import Registration from "./components/Registration";
import {NavLink} from "react-router-dom";
import Login from "./components/Login";
import Disk from './components/Disk';
const Home = () => {
    return (
        <div className="home">

            {/*<Disk/>*/}
            <div className="home">
                <div className="home-workspace">
                    <div className="home-workspace__info">
                        <div className="home-workspace__info__title">
                            StoryMaker for kids
                        </div>
                        <div className="home-workspace__info__description">
                            Создание собственных комиксов.
                            Воплощение детских идей и развитие творческих способностей.

                        </div>
                        <div className="home-workspace__info__buttons">
                            <div className="action-button"><NavLink to="/login">Войти</NavLink></div>
                            <div className="action-button"><NavLink to="/registration">Регистрация</NavLink></div>
                        </div>
                    </div>
                    <div className="home-workspace__image">
                        <div className="home-workspace__image__item"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;