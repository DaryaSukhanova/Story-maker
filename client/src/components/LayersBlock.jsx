import React, {useEffect, useState} from 'react';
import canvasState from "../store/canvasState";
import toolState from "../store/toolState";
import Tool from "../tools/Tool";

const LayersBlock = ({ layerRefs }) => {
    const [currentLayer, setCurrentLayer] = useState('layer1');
    const [currentTool, setCurrentTool] = useState(null);

    const setCurrentLayerHandler = (layer) => {
        // Удаляем обработчик события mousedown с предыдущего слоя
        layerRefs[currentLayer].current.removeEventListener('mousedown', mouseDownHandler);

        // Сбрасываем состояние инструмента в начальное
        resetToolState();

        // Устанавливаем новый текущий слой
        setCurrentLayer(layer);
        canvasState.setCanvas(layerRefs[layer].current);

        // Добавляем обработчик события mousedown к новому слою
        layerRefs[layer].current.addEventListener('mousedown', mouseDownHandler);

        if (layer === 'layer2') {
            layerRefs['layer2'].current.style.pointerEvents = 'auto';
        } else {
            layerRefs['layer2'].current.style.pointerEvents = 'none';
        }

        const toolInstance = toolState.tool; // Получаем текущий инструмент
        setCurrentTool(toolInstance); // Устанавливаем текущий инструмент для отображения
    };
    const resetToolState = () => {
        toolState.setTool(new Tool(layerRefs[currentLayer].current));
    };
    const mouseDownHandler = () => {
        canvasState.pushToUndo(layerRefs[currentLayer].current.toDataURL());
    };
    return (
        <div className="block-container">
            <div className="setting-block">
                <div className="tool-bar-item-title">Layers</div>
                {Object.keys(layerRefs).map((layer, index) => (
                    <button key={index} onClick={() => setCurrentLayerHandler(layer)}>
                         {layer}
                    </button>
                ))}
            </div>
        </div>
    );
};


export default LayersBlock;