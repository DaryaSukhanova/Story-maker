import React, {useEffect, useRef, useState} from 'react';
import "../../styles/canvas.scss"
import {observer} from "mobx-react-lite";
import canvasState from "../../store/canvasState";
import svgToolState from "../../store/svgToolState";


import svgCanvasState from "../../store/svgCanvasState";


const SvgCanvas = observer(() => {
    const svgCanvasRef = useRef();
    const [shapes, setShapes] = useState([]); // Массив для хранения всех нарисованных фигур
    const [currentShape, setCurrentShape] = useState(null);
    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);
    const [isDrawing, setIsDrawing] = useState(false);
    const [dataPoints, setDataPoints] = useState("")
    useEffect(() => {
        svgCanvasState.setSvgCanvas(svgCanvasRef.current);
    }, []);

    const handleMouseDown = (e) => {
        setIsDrawing(true);
        const svgCanvasRect = svgCanvasRef.current.getBoundingClientRect();
        const x = e.clientX - svgCanvasRect.left;
        const y = e.clientY - svgCanvasRect.top;
        setStartX(x);
        setStartY(y);

        // if (svgToolState.tool === 'polyline') {
        //     setDataPoints(`${x},${y}`);
        //     setCurrentShape({ type: svgToolState.tool, points: `${x},${y}`, stroke: svgToolState.stroke });
        // }
        // if(svgToolState.tool === 'polygon' ){
        //     setDataPoints(dataPoints + ` ${x},${y}`)
        // }

        setCurrentShape({ type: svgToolState.tool, x, y, width: 0, height: 0, d:`M ${x} ${y}`,points:"" });
    };

    const handleMouseMove = (e) => {
        // if (!isDrawing) return;
        const svgCanvasRect = svgCanvasRef.current.getBoundingClientRect();
        const x = e.clientX - svgCanvasRect.left;
        const y = e.clientY - svgCanvasRect.top;

        if (svgToolState.tool === 'circle') {
            const radius = Math.sqrt(Math.pow(x - startX, 2) + Math.pow(y - startY, 2));
            setCurrentShape(prevShape => ({ ...prevShape, r: radius }));
        } else if (svgToolState.tool === 'rect') {
            const width = Math.abs(x - startX);
            const height = Math.abs(y - startY);
            setCurrentShape(prevShape => ({ ...prevShape, width, height }));
        } else if(svgToolState.tool === 'brush'){
            if (currentShape) {
                currentShape.d += ` L ${x} ${y}`;
                const d = currentShape.d;
                setCurrentShape(prevShape => ({ ...prevShape, d }));
            }
        } else if (svgToolState.tool === 'line'){
            const d = `M ${startX} ${startY} L ${x} ${y}`;
            setCurrentShape(prevShape => ({ ...prevShape,  d}));
        }

    };


    return (
        <div className="canvas-container">
            <svg
                ref={svgCanvasRef}
                className="svg-canvas"
                id="drawingCanvas"
                width={1100}
                height={644}
            >

            </svg>
        </div>
    );
});

export default SvgCanvas;