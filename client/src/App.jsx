import React, {useState} from 'react'
import "./styles/app.scss"
import Toolbar from "./components/Toolbar";
import SettingBar from "./components/SettingBar";
import Canvas from "./components/Canvas";
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
const App =  observer(() => {

    return (
        <div className="app">
            <BrowserRouter>
                <Navbar/>
                {!userState.isAuth &&
                    <div className="home-navbar">
                        <div className="navbar__login"><NavLink to="/login">Log In</NavLink></div>
                        <div className="navbar__registration"><NavLink to="/registration">Sign In</NavLink></div>
                    </div>
                }
                {userState.isAuth &&
                    <div className="home-navbar">
                        <div className="navbar__logout" onClick={()=>userState.logout()}>Log Out</div>
                    </div>

                }
                <Routes>
                    <Route path="/home" element={
                        <Home/>
                    }>
                    </Route>
                    <Route path="/graphic-editor" element={
                        <GraphicEditor/>
                    }>
                    </Route>
                    <Route path="/animation-editor" element={
                        <AnimationEditor/>
                    }>
                    </Route>
                    <Route path="/book-editor" element={
                        <BookEditor/>
                    }>
                    </Route>

                    <Route path="/registration" element={
                        <Registration/>
                    }>
                    </Route>
                    {!userState.isAuth &&
                        <Route path="/login" element={
                            <Login/>
                        }>
                        </Route>
                    }
                    <Route path="*" element={<Navigate to="/home" replace/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
});

export default App;