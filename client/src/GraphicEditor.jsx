import React, {useEffect, useRef, useState} from 'react';
import Toolbar from "./components/Toolbar";
import SettingBar from "./components/SettingBar";
import Canvas from "./components/Canvas";
import DrawingBlock from "./components/DrawingBlock";
import './styles/graphic-editor.scss'
import './styles/animation-editor.scss'
import SvgActionPanel from "./components/SvgActionPanel";
import ActionPanel from "./components/ActionPanel";
import LayersBlock from "./components/LayersBlock";
import {observer} from "mobx-react-lite";
import layerState from "./store/layerState";
const GraphicEditor = observer(() => {

    let [layers, setLayers ] = useState([
        { name: 'Layer1', ref: useRef(null) },
        { name: 'Layer2', ref: useRef(null) }
    ])
    //
    // const newLayerRef = useRef(null); // Объявляем useRef здесь
    // const addLayer = () => {
    //     const newLayerName = `Layer${layers.length + 1}`;
    //
    //     // Обновляем состояние, используя функцию обновления состояния, чтобы гарантировать корректное обновление
    //     setLayers(prevLayers => [...prevLayers, { name: newLayerName, ref: newLayerRef }]);
    // };

    layerState.setLayers(layers)
    const newLayerRef = useRef(null);
    const handleAddLayer = () => {
        layerState.addLayer(newLayerRef);
    };
    return (
        <div className="graphic-editor">
            <div className="graphic-editor-workspace">
                <DrawingBlock/>
                <Canvas />
                <LayersBlock />
                <button onClick={handleAddLayer}>Button </button>
            </div>
            <ActionPanel />
        </div>
    );
});

export default GraphicEditor;