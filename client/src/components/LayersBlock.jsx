import React, {useEffect, useState} from 'react';
import canvasState from "../store/canvasState";
import toolState from "../store/toolState";
import Tool from "../tools/Tool";
import LayerSelector from "./LayerSelector";
import '../styles/layers-block.scss'

const LayersBlock = ({ layerRefs }) => {

    return (
        <div className="block-container">
            <div className="setting-block">
                <div className="tool-bar-item-title">Layers</div>
                <LayerSelector layerRefs={layerRefs}/>
            </div>
        </div>
    );
};


export default LayersBlock;