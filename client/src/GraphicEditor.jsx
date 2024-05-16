import React, {useEffect, useRef, useState} from 'react';
import Toolbar from "./components/graphic-components/Toolbar";
import SettingBar from "./components/graphic-components/SettingBar";
import Canvas from "./components/graphic-components/Canvas";
import DrawingBlock from "./components/graphic-components/DrawingBlock";
import './styles/editor.scss'
// import './styles/animation-editor.scss'
// import './styles/setting-block.scss'
import SvgActionPanel from "./components/animation-components/SvgActionPanel";
import ActionPanel from "./components/ActionPanel";
import LayersBlock from "./components/graphic-components/LayersBlock";
import {observer} from "mobx-react-lite";
import layerState from "./store/layerState";
const GraphicEditor = observer(() => {

    let [layers, setLayers ] = useState([
        { name: 'Layer1', ref: useRef(null), isActive: true, isVisible: true },
        { name: 'Layer2', ref: useRef(null), isActive: false, isVisible: true }
    ])


    layerState.setLayers(layers)

    return (
        <div className="editor">
            <div className="editor-workspace">
                <DrawingBlock/>
                <Canvas />
                <LayersBlock />
            </div>
            <ActionPanel />
        </div>
    );
});

export default GraphicEditor;