import React, {useState} from 'react';
import canvasState from "../store/canvasState";
import toolState from "../store/toolState";
import Tool from "../tools/Tool";
import LayerButton from "./LayerButton";
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
                ref.current.removeEventListener('mousedown', mouseDownHandler);

                resetToolState();

                setCurrentLayer(layerIndex);
                canvasState.setCanvas(ref.current);

                ref.current.addEventListener('mousedown', mouseDownHandler);

                // if (layerIndex === 0) {
                //     ref.current.style.pointerEvents = 'auto';
                //
                // } else {
                //     ref.current.style.pointerEvents = 'auto';
                // }

                const toolInstance = toolState.tool;
                setCurrentTool(toolInstance);
            }
        }
    };
    const resetToolState = () => {
        toolState.setTool(new Tool(layers[currentLayer].ref.current));
    };
    const mouseDownHandler = () => {
        canvasState.pushToUndo(layers[currentLayer].ref.current.toDataURL());
    };

    return (
        <div className="layer-selector">
            {Object.keys(layers).map((layer, index) => (
                <LayerButton id={index} layerName={layers[index].name} func={() => setCurrentLayerHandler(index)} isActive={index === currentLayer}/>
            ))}
            {/*<LayerButton id={0} layerName={layers.length > 0 ? layers[0].name : ''} func={() => setCurrentLayerHandler(currentLayer)} isActive={layers[0].name === currentLayer}/>*/}

        </div>
    );
});

export default LayerSelector;