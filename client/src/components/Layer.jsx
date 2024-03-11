import React from 'react';
import canvasState from "../store/canvasState";
import {observer} from "mobx-react-lite";

const Layer = observer(({id, canvasRef, style}) => {
    // const isVisible = canvasState.layerVisibility[id];
    // const layerStyle = {
    //     display: isVisible ? 'block' : 'none',
    //     pointerEvents: isVisible ? 'auto': 'none'
    // }
    return (
        <canvas width={1100} height={644}  id={id} ref={canvasRef} style={style}></canvas>
    );
});

export default Layer;