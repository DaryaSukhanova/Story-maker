import React, {useEffect, useRef, useState} from 'react';
import "../../styles/canvas.scss"
import {observer} from "mobx-react-lite";
import canvasState from "../../store/canvasState";
import toolState from "../../store/toolState";
import Brush from "../../tools/graphic-tools/Brush";
import Layer from "./Layer";
import layerState from "../../store/layerState";
const Canvas = observer(() => {

    let layers = layerState.layers
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
        <div className="canvas-container">
            {Object.keys(layers).map((index) => (

                <Layer
                    id={layers.length > 0 ? index : ''}
                    canvasRef={layers.length > 0 ? layers[index].ref : null}
                    style={{
                        display: layers[index].isVisible === true ? 'block' : 'none',
                        pointerEvents: layers[index].isActive === true ? 'auto' : 'none'
                    }}
                />
            ))}

        </div>
    );
});

export default Canvas;