import React, {useState} from 'react';
import canvasState from "../store/canvasState";
import toolState from "../store/toolState";
import Tool from "../tools/Tool";
import LayerButton from "./LayerButton";


const LayerSelector = ({layerRefs}) => {
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
        <div className="layer-selector">
            {Object.keys(layerRefs).map((layer, index) => (
                <LayerButton id={index} layerName={layer} func={() => setCurrentLayerHandler(layer)} isActive={layer === currentLayer}/>
            ))}
        </div>
    );
};

export default LayerSelector;