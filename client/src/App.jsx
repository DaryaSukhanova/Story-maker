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
    
                    <Route path="*" element={<Navigate to="/home" replace/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
});

export default App;