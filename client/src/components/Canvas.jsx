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
import layerState from "../store/layerState";
const Canvas = observer(() => {

    let layers = layerState.layers
    const [currentLayer, setCurrentLayer] = useState(0);

    const [currentTool, setCurrentTool] = useState(null);

    useEffect(() => {

        if (layers.length > 0) {
            const activeIndex = layers.findIndex(layer => layer.isActive);
            if (activeIndex !== -1) {
                const activeLayer = layers[activeIndex];
                canvasState.setCanvas(activeLayer.ref.current);
                const currentToolInstance = new Brush(canvasState.canvas);
                toolState.setTool(currentToolInstance);
                setCurrentTool(currentToolInstance);
            }
        }
    }, [canvasState.canvas]);



    return (
        <div className="canvas">
            {Object.keys(layers).map((layer, index) => (

                <Layer
                    id={layers.length > 0 ? index : ''}
                    canvasRef={layers.length > 0 ? layers[index].ref : null}
                    style={{
                        display: layers[index].isVisible === true ? 'block' : 'none',
                        pointerEvents: layers[index].isActive === true ? 'auto' : 'none'
                    }}
                />
                // <canvas key={index} id={layer} width={1100} height={644} ref={layerRefs[layer]}></canvas>
            ))}
            {/*<canvas id={layers.length > 0 ? layers[0].name : ''} width={1100} height={644} ref={layers.length > 0 ? layers[0].ref : null}></canvas>*/}

        </div>
    );
});

export default Canvas;