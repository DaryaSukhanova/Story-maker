import React, {useRef, useState} from 'react';
import Toolbar from "./components/Toolbar";
import SettingBar from "./components/SettingBar";
import Canvas from "./components/Canvas";
import DrawingBlock from "./components/DrawingBlock";
import './styles/graphic-editor.scss'
import './styles/animation-editor.scss'
import SvgActionPanel from "./components/SvgActionPanel";
import ActionPanel from "./components/ActionPanel";
import LayersBlock from "./components/LayersBlock";
const GraphicEditor = () => {
    const [layerRefs, setLayerRefs] = useState({
        layer1: useRef(null),
        layer2: useRef(null)
    });
    return (
        <div className="graphic-editor">
            <div className="graphic-editor-workspace">
                <DrawingBlock/>
                <Canvas layerRefs={layerRefs}/>
                <LayersBlock/>
            </div>
            <ActionPanel layerRefs={layerRefs}/>
        </div>
    );
};

export default GraphicEditor;