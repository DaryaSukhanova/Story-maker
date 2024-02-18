import React from 'react';
import Toolbar from "./components/Toolbar";
import SettingBar from "./components/SettingBar";
import Canvas from "./components/Canvas";
import DrawingBlock from "./components/DrawingBlock";
import './styles/graphic-editor.scss'
import './styles/animation-editor.scss'
import SvgActionPanel from "./components/SvgActionPanel";
import ActionPanel from "./components/ActionPanel";
const GraphicEditor = () => {
    return (
        <div className="graphic-editor">
            <div className="graphic-editor-workspace">
                <DrawingBlock></DrawingBlock>
                <Canvas></Canvas>
                <DrawingBlock></DrawingBlock>
            </div>
            <ActionPanel></ActionPanel>
        </div>
    );
};

export default GraphicEditor;