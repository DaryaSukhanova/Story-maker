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
import Layer from "./Layer";
const Canvas = observer(({ layerRefs }) => {
    const [currentLayer, setCurrentLayer] = useState('layer1');

    const [currentTool, setCurrentTool] = useState(null);

    useEffect(() => {
        canvasState.setCanvas(layerRefs[currentLayer].current);
        const currentToolInstance = toolState.tool; // Получаем текущий инструмент
        setCurrentTool(currentToolInstance); // Устанавливаем текущий инструмент для отображения
        console.log(layerRefs[currentLayer].current)
    }, [currentLayer]);

    return (
        <div className="canvas">
            {Object.keys(layerRefs).map((layer, index) => (
                // <Layer/>
                <Layer
                    key={index}
                    id={layer}
                    canvasRef={layerRefs[layer]}
                />
                // <canvas key={index} id={layer} width={1100} height={644} ref={layerRefs[layer]}></canvas>
            ))}
        </div>
    );
});

export default Canvas;