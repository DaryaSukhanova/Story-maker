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
                            Creating your own comics.
                            The embodiment of children's ideas and the development of creativity.
                        </div>
                        <div className="home-workspace__info__buttons">

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