import React, {useEffect, useState} from 'react'
import "./styles/app.scss"
import Toolbar from "./components/graphic-components/Toolbar";
import SettingBar from "./components/graphic-components/SettingBar";
import Canvas from "./components/graphic-components/Canvas";
import GraphicEditor from "./GraphicEditor";
import {BrowserRouter, Link, Navigate, NavLink, Route, Routes} from "react-router-dom";
import AnimationEditor from "./AnimationEditor";
import Navbar from "./components/Navbar";
import BookEditor from "./BookEditor";
import Home from "./Home";
import Registration from "./components/Registration";

import Login from './components/Login';
import userState from "./store/userState";
import {observer} from "mobx-react-lite";
import { auth } from './actions/user';
import Disk from "./components/Disk";
import { ReactComponent as IconSM } from '../src/assets/img/icon-story-maker.svg'
const App =  observer(() => {

	useEffect(() => {
		auth()
	}, [])


    return (
        <div className="app">
            <BrowserRouter>
                {userState.isAuth &&
                    <Navbar/>
                }

                {!userState.isAuth &&
                    <div className="home-navbar">
                        <NavLink to="/" activeClassName="active-link" className="home-icon">
                            <IconSM activeClassName="home-icon"></IconSM>
                        </NavLink>
                        <div className="navbar__login"><NavLink to="/login">Log In</NavLink></div>
                        <div className="navbar__registration"><NavLink to="/registration">Sign In</NavLink></div>
                    </div>
                }
                {userState.isAuth &&

                    <div>
                        <div className="home-navbar">
                            <div className="navbar__logout" onClick={()=>userState.logout()}>Log Out</div>
                        </div>

                    </div>

                }
                <Routes>
                    {!userState.isAuth &&
                        <Route path="/home" element={
                            <Home/>
                        }>
                        </Route>
                    }
                    {userState.isAuth &&
                        <Route path="/home" element={
                            <Disk/>
                        }>
                        </Route>
                    }
                    {userState.isAuth &&
                        <Route path="/graphic-editor" element={
                            <GraphicEditor/>
                        }>
                        </Route>
                    }
                    {userState.isAuth &&
                        <Route path="/animation-editor" element={
                            <AnimationEditor/>
                        }>
                        </Route>
                    }
                    {userState.isAuth &&
                        <Route path="/book-editor" element={
                            <BookEditor/>
                        }>
                        </Route>
                    }

                    {!userState.isAuth && 
                        <Route path="/registration" element={
                            <Registration/>
                        }>
                        </Route>
                    }
                    {!userState.isAuth && 
                        <Route path="/login" element={
                            <Login/>
                        }>
                        </Route>
                    }
                    {/*{userState.isAuth && */}
                    {/*    <Route path="/disk" element={*/}
                    {/*        <Disk/>*/}
                    {/*    }>*/}
                    {/*    </Route>*/}
                    {/*}       */}
                    <Route path="*" element={<Navigate to="/home" replace/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
});

export default App;