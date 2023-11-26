import React from 'react';
import Toolbar from "./components/Toolbar";
import SettingBar from "./components/SettingBar";
import Canvas from "./components/Canvas";

const GraphicEditor = () => {
    return (
        <div className="graphic-editor">
            <Toolbar></Toolbar>
            <SettingBar></SettingBar>
            <Canvas></Canvas>
        </div>
    );
};

export default GraphicEditor;