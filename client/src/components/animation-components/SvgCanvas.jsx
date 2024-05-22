import React, {useEffect, useRef, useState} from 'react';
import "../../styles/canvas.scss"
import {observer} from "mobx-react-lite";


import svgCanvasState from "../../store/svgCanvasState";


const SvgCanvas = observer(() => {
    const svgCanvasRef = useRef();

    useEffect(() => {
        svgCanvasState.setSvgCanvas(svgCanvasRef.current);
    }, []);


    return (
        <div className="canvas-container">
            <svg
                ref={svgCanvasRef}
                id="drawingCanvas"
                width={1100}
                height={644}
                viewBox="0 0 1100 644"
                preserveAspectRatio="xMidYMid meet"
            >
            </svg>
        </div>
    );
});

export default SvgCanvas;