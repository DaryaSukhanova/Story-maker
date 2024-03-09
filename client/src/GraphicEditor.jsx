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
    // const [layers, setLayer] = useState(
    //     {
    //     layer1: useRef(null),
    //     layer2: useRef(null)
    // });
    let [layers, setLayers ] = useState([
        { name: 'Layer1', ref: useRef(null) },
        { name: 'Layer2', ref: useRef(null) }
    ])

    // useEffect(() => {
    //     layerState.setLayerRef('layer1', layer1Ref);
    //     layerState.setLayerRef('layer2', layer2Ref);
    // }, []);
    // const [numLayers, setNumLayers] = useState(2); // Начальное количество слоев
    // const [layerRefs, setLayerRefs] = useState([]);
    //
    // useEffect(() => {
    //     setLayerRefs(Array.from({ length: numLayers }, () => React.createRef()));
    // }, [numLayers]);

    return (
        <div className="graphic-editor">
            <div className="graphic-editor-workspace">
                <DrawingBlock/>
                <Canvas layers={layers}/>
                {/*<DrawingBlock/>*/}
                <LayersBlock layers={layers}/>
            </div>
            <ActionPanel layerRefs={layers}/>
        </div>
    );
});

export default GraphicEditor;