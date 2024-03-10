import React, {useEffect, useRef, useState} from 'react';
import canvasState from "../store/canvasState";
import toolState from "../store/toolState";
import Tool from "../tools/Tool";
import LayerSelector from "./LayerSelector";
import '../styles/layers-block.scss'
import layerState from "../store/layerState";

const LayersBlock = () => {
    const newLayerRef = useRef(null);
    const handleAddLayer = () => {
        layerState.addLayer(newLayerRef);
    };
    const handleRemoveLayer = () => {
        layerState.removeLayer();
    };
    return (
        <div className="block-container">
            <div className="setting-block">
                <div className="tool-bar-item-title">Layers</div>
                <button onClick={handleAddLayer}>Add Layer </button>
                <button onClick={handleRemoveLayer}>Delete Layer </button>
                <LayerSelector />
            </div>
        </div>
    );
};


export default LayersBlock;