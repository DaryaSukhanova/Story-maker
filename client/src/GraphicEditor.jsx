import React, {useRef, useState} from 'react';
import Canvas from "./components/graphic-components/Canvas";
import DrawingBlock from "./components/graphic-components/DrawingBlock";
import './styles/editor.scss'
import ActionPanel from "./components/ActionPanel";
import LayersBlock from "./components/graphic-components/LayersBlock";
import {observer} from "mobx-react-lite";
import layerState from "./store/layerState";
const GraphicEditor = observer(() => {

    let layers  = [
        { name: 'Layer1', ref: useRef(null), isActive: true, isVisible: true },
        { name: 'Layer2', ref: useRef(null), isActive: false, isVisible: true }
    ]

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