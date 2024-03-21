import React from 'react'
import "./styles/app.scss"
import Toolbar from "./components/graphic-components/Toolbar";
import SettingBar from "./components/graphic-components/SettingBar";
import Canvas from "./components/graphic-components/Canvas";
import GraphicEditor from "./GraphicEditor";
import {BrowserRouter, Link, Navigate, Route, Routes} from "react-router-dom";
import AnimationEditor from "./AnimationEditor";
import Navbar from "./components/Navbar";
import BookEditor from "./BookEditor";
import Home from "./Home";
import Registration from "./components/Registration";
const App = () => {
    return (
        <div className="app">
            <BrowserRouter>
                <Navbar/>
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
                    <Route path="*" element={<Navigate to="/home" replace/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;