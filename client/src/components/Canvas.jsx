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
const Canvas = observer(({ layers }) => {
    const [currentLayer, setCurrentLayer] = useState(layers[0]);

    const [currentTool, setCurrentTool] = useState(null);

    useEffect(() => {
        console.log(layers)
        if (layers.length > 0) {
            canvasState.setCanvas(layers[0].ref.current); // Передача текущего DOM-элемента холста
            const currentToolInstance = toolState.tool; // Получаем текущий инструмент
            setCurrentTool(currentToolInstance); // Устанавливаем текущий инструмент для отображения
            // console.log(layerRefs[currentLayer].current)
        }

    }, [currentLayer, layers]);

    return (
        <div className="canvas">
            {Object.keys(layers).map((layer, index) => (

                <Layer
                    id={layers.length > 0 ? index : ''}
                    canvasRef={layers.length > 0 ? layers[index].ref : null}
                />
                // <canvas key={index} id={layer} width={1100} height={644} ref={layerRefs[layer]}></canvas>
            ))}
            {/*<canvas id={layers.length > 0 ? layers[0].name : ''} width={1100} height={644} ref={layers.length > 0 ? layers[0].ref : null}></canvas>*/}

        </div>
    );
});

export default Canvas;