import React from 'react';
import canvasState from "../store/canvasState";
import {observer} from "mobx-react-lite";
import layerState from "../store/layerState";

const Layer = observer(({id, canvasRef, style}) => {
    // const isVisible = canvasState.layerVisibility[id];
    // const layerStyle = {
    //     display: isVisible ? 'block' : 'none',
    //     pointerEvents: isVisible ? 'auto': 'none'
    // }
    const mouseDownHandler = () => {
        console.log("mouseDownHandler")
        canvasState.pushToUndo(layerState.layers[id].ref.current.toDataURL());
    };
    return (
        <canvas
            onMouseDown={()=> mouseDownHandler()}
            width={1100}
            height={644}
            id={id}
            ref={canvasRef}
            style={style}></canvas>
    );
});

export default Layer;