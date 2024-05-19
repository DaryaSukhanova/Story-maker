import React, {useEffect, useRef, useState} from 'react';
import canvasState from "../../store/canvasState";
import toolState from "../../store/toolState";
import Tool from "../../tools/graphic-tools/Tool";
import LayerSelector from "../LayerSelector";
import '../../styles/layers-block.scss'
import layerState from "../../store/layerState";
import Line from "../../tools/graphic-tools/Line";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import UploadImageBlock from './UploadImageBlock';

const LayersBlock = () => {
    const newLayerRef = useRef(null);
    const [isVisible, setIsVisible] = useState(true);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    const handleAddLayer = () => {
        layerState.addLayer(newLayerRef);
    };
    const handleRemoveLayer = () => {
        const activeIndex = layerState.layers.findIndex(layer => layer.isActive);
        if(layerState.layers.length > 1){
            layerState.removeLayer(activeIndex);
        }

    };
    return (
        <div className={` ${isVisible ? 'block-container' : 'hidden-block'}`}>
            <div className={`setting-block ${isVisible ? '' : 'hidden'}`}>
                <div>
                    <div className="tool-bar-item-title">Слои</div>
                    <div className="layer-buttons">
                        <button className="layer-buttons__btn add-layer" onClick={handleAddLayer}></button>
                        <button className="layer-buttons__btn remove-layer" onClick={handleRemoveLayer}></button>
                    </div>

                    <LayerSelector />
                </div>

                <UploadImageBlock/>
            </div>
            <button id="toggle-button" className="icon-button rigth" onClick={toggleVisibility}>
                <FontAwesomeIcon 
                icon={faChevronRight} 
                style={{ color: "#e0e0e0", transform: isVisible ? 'none' : 'rotate(180deg)', transition: 'transform 0.3s ease' }} />
            </button>
        </div>
    );
};


export default LayersBlock;