import React, {useEffect, useRef, useState} from 'react';
import "../styles/svg-canvas.scss"
import {observer} from "mobx-react-lite";
import canvasState from "../store/canvasState";
import svgToolState from "../store/svgToolState";
import SvgRect from "../tools/SvgRect";
import SvgBrush from "../tools/SvgBrush";
import SvgCircle from "../tools/SvgCircle";
import SvgLine from "../tools/SvgLine";
import SvgPolyline from "../tools/SvgPolyline";
import SvgPolygon from "../tools/SvgPolygon";

import svgCanvasState from "../store/svgCanvasState";

const SvgCanvas = observer (() => {

    const svgCanvasRef = useRef()
    useEffect(()=>{
        svgCanvasState.setSvgCanvas(svgCanvasRef.current)
        // svgToolState.setSvgTool(new SvgPolyline(svgCanvasRef.current))
        svgToolState.setSvgTool(new SvgBrush(svgCanvasRef.current))
    }, [])



    return (
        <div className="block-container">
            <svg ref={svgCanvasRef}
                 className="svg-canvas"
                 id="drawingCanvas"
                 width={950}
                 height={544}>
            </svg>
        </div>

    );
});

export default SvgCanvas;