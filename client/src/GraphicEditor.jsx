import React, {useRef, useState} from 'react';
import Toolbar from "./components/Toolbar";
import SettingBar from "./components/SettingBar";
import Canvas from "./components/Canvas";
import DrawingBlock from "./components/DrawingBlock";
import './styles/graphic-editor.scss'
import './styles/animation-editor.scss'
import SvgActionPanel from "./components/SvgActionPanel";
import ActionPanel from "./components/ActionPanel";
const GraphicEditor = () => {
    const [layerRefs, setLayerRefs] = useState({
        layer1: useRef(null),
        layer2: useRef(null)
    });
    return (
        <div className="graphic-editor">
            <div className="graphic-editor-workspace">
                <DrawingBlock></DrawingBlock>
                <Canvas layerRefs={layerRefs}/>
                <div className="block-container">
                    <div className="setting-block">
                    </div>
                </div>
            </div>
            <ActionPanel layerRefs={layerRefs}></ActionPanel>
        </div>
    );
};

export default GraphicEditor;