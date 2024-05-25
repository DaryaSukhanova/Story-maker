import React, {useRef, useState} from 'react';
import LayerSelector from "../LayerSelector";
import '../../styles/layers-block.scss'
import layerState from "../../store/layerState";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import UploadImageBlock from './UploadImageBlock';
import { Tooltip } from 'react-tooltip';

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
    const toolTips = {
        addLayer: 'Добавить слой',
        removeLayer: 'Удалить слой',
    };
    return (
        <div className={` ${isVisible ? 'block-container' : 'hidden-block'}`}>
            <div className={`setting-block ${isVisible ? '' : 'hidden'}`}>
                <div>
                    <div className="tool-bar-item-title">Слои</div>
                    <div className="layer-buttons">
                        <button id='btnLayerAdd' data-tooltip-id="tooltip-addLayer" data-tooltip-content={toolTips.addLayer} className="layer-buttons__btn add-layer" onClick={handleAddLayer}></button>
                        <button id='btnLayerRemove' data-tooltip-id="tooltip-removeLayer" data-tooltip-content={toolTips.removeLayer} className="layer-buttons__btn remove-layer" onClick={handleRemoveLayer}></button>
                    </div>

                    <LayerSelector />
                </div>

                <UploadImageBlock/>
            </div>
            <button id="toggleButtonRight" className="icon-button right" onClick={toggleVisibility}>
                <FontAwesomeIcon 
                icon={faChevronRight} 
                style={{ color: "#e0e0e0", transform: isVisible ? 'none' : 'rotate(180deg)', transition: 'transform 0.3s ease' }} />
            </button>
            {Object.keys(toolTips).map(toolKey => (
                <Tooltip
                    id={`tooltip-${toolKey}`}
                    place="bottom"
                    type="dark"
                    effect="float"
                    key={toolKey}
                />
            ))}
        </div>
    );
};


export default LayersBlock;