import React from 'react';
import canvasState from "../../store/canvasState";
import {observer} from "mobx-react-lite";
import layerState from "../../store/layerState";

const Layer = observer(({id, canvasRef, style}) => {

    const mouseDownHandler = () => {
        console.log("mouseDownHandler")
        const rect = canvasRef.current.getBoundingClientRect();
        console.log(rect)
        canvasState.pushToUndo(layerState.layers[id].ref.current.toDataURL());
    };
    return (
        <canvas
            onMouseDown={()=> mouseDownHandler()}
            width={1100}
            height={644}
            id={`canvas${id}`}
            ref={canvasRef}
            style={style}>

        </canvas>
    );
});

export default Layer;