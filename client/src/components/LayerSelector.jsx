import React, {useState} from 'react';
import canvasState from "../store/canvasState";
import toolState from "../store/toolState";
import Tool from "../tools/graphic-tools/Tool";
import LayerButton from "./graphic-components/LayerButton";
import layerState from "../store/layerState";
import {observer} from "mobx-react-lite";


const LayerSelector = observer(() => {
    let layers = layerState.layers

    const [currentLayer, setCurrentLayer] = useState(0);
    const [currentTool, setCurrentTool] = useState(null);

    const setCurrentLayerHandler = (layerIndex) => {
        const layer = layers[layerIndex];

        if (layer) {
            const { ref, name } = layer;

            if (ref && ref.current) {
                setCurrentLayer(layerIndex);
                layerState.setActiveLayer(layerIndex)
                canvasState.setCanvas(ref.current);
            }
        }
    };

    return (
        <div className="layer-selector">
            {Object.keys(layers).map((layer, index) => (
                <LayerButton id={index} layerName={layers[index].name} func={() => setCurrentLayerHandler(index)} isActive={layers[index].isActive} isVisible={layers[index].isVisible}/>
            ))}
        </div>
    );
});

export default LayerSelector;