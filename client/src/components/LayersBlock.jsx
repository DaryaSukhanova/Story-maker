import React, {useEffect, useState} from 'react';
import canvasState from "../store/canvasState";
import toolState from "../store/toolState";
import Tool from "../tools/Tool";
import LayerSelector from "./LayerSelector";
import '../styles/layers-block.scss'

const LayersBlock = ({ layers }) => {

    return (
        <div className="block-container">
            <div className="setting-block">
                <div className="tool-bar-item-title">Layers</div>
                <LayerSelector layers={layers}/>
            </div>
        </div>
    );
};


export default LayersBlock;