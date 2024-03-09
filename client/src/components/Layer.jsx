import React from 'react';
import canvasState from "../store/canvasState";
import {observer} from "mobx-react-lite";

const Layer = observer(({id, canvasRef }) => {
    const isVisible = canvasState.layerVisibility[id];
    console.log(canvasRef)
    const layerStyle = {
        display: isVisible ? 'block' : 'none'
    }
    return (
        <canvas width={1100} height={644}  id={id} ref={canvasRef} style={layerStyle}></canvas>
    );
});

export default Layer;