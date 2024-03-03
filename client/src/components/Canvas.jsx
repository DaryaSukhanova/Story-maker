import React, {useEffect, useRef, useState} from 'react';
import "../styles/canvas.scss"
import {observe} from "mobx";
import {observer} from "mobx-react-lite";
import canvasState from "../store/canvasState";
import toolState from "../store/toolState";
import Brush from "../tools/Brush";
import {Button, Modal} from "react-bootstrap";
import axios from 'axios'
import {forEach} from "react-bootstrap/ElementChildren";
import Tool from "../tools/Tool";
const Canvas = observer(({ layerRefs }) => {
    const [currentLayer, setCurrentLayer] = useState('layer1');

    const [currentTool, setCurrentTool] = useState(null);


    useEffect(() => {
        canvasState.setCanvas(layerRefs[currentLayer].current);
        const currentToolInstance = toolState.tool; // Получаем текущий инструмент
        setCurrentTool(currentToolInstance); // Устанавливаем текущий инструмент для отображения
        console.log(layerRefs[currentLayer].current)
    }, [currentLayer]);

    const mouseDownHandler = () => {
        canvasState.pushToUndo(layerRefs[currentLayer].current.toDataURL());
    };

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

    const layerStyle = { position: "absolute" };
    const style = { display: "flex", flexDirection: "column", position: "absolute", top: 0 };

    return (
        <div className="canvas">
            <canvas id="layer1" width={1100} height={644} ref={layerRefs.layer1}></canvas>
            <canvas id="layer2" width={1100} height={644} ref={layerRefs.layer2} style={{position: "absolute" }}></canvas>
            <div style={style}>
                <button onClick={() => setCurrentLayerHandler('layer1')} >Выбрать слой 1</button>
                <button onClick={() => setCurrentLayerHandler('layer2')} >Выбрать слой 2</button>
            </div>

        </div>
    );
});

export default Canvas;