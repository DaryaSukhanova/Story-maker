import React, {useEffect, useRef, useState} from 'react';
import "../../styles/svg-canvas.scss"
import {observer} from "mobx-react-lite";
import canvasState from "../../store/canvasState";
import svgToolState from "../../store/svgToolState";
import SvgRect from "../../tools/animation-tools/SvgRect";
import SvgBrush from "../../tools/animation-tools/SvgBrush";
import Circle from "../../tools/animation-tools/jsx-tools/Circle";
import SvgLine from "../../tools/animation-tools/SvgLine";
import SvgPolyline from "../../tools/animation-tools/SvgPolyline";
import SvgPolygon from "../../tools/animation-tools/SvgPolygon";

import svgCanvasState from "../../store/svgCanvasState";
import animationToolState from "../../store/animationToolState";
import Rect from "../../tools/animation-tools/jsx-tools/Rect";
import Brush from "../../tools/animation-tools/jsx-tools/Brush";
import Line from "../../tools/animation-tools/jsx-tools/Line";
import Polyline from "../../tools/animation-tools/jsx-tools/Polyline";
import Polygon from "../../tools/animation-tools/jsx-tools/Polygon";
import {set} from "mobx";

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
        setCurrentShape({ type: svgToolState.tool, x, y, width: 0, height: 0, d:`M ${x} ${y}`,points:"", stroke: `${svgToolState.stroke}` });
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
        // else if (svgToolState.tool === 'polyline') {
        //     setDataPoints(prevPoints => `${prevPoints} ${x},${y}`);
        //     const points = dataPoints
        //     setCurrentShape(prevShape => ({ ...prevShape, points}));
        // }
    };

    const handleMouseUp = () => {
        setIsDrawing(false);
        if (!currentShape) return; // Если нет текущей фигуры, выходим
        setShapes(prevShapes => [...prevShapes, currentShape]); // Добавляем текущую фигуру в массив shapes
        setCurrentShape(null); // Сбрасываем текущую фигуру

    };

    return (
        <div className="block-container">
            <svg
                ref={svgCanvasRef}
                className="svg-canvas"
                id="drawingCanvas"
                width={1100}
                height={644}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
            >
                {[...shapes, currentShape].map((shape, index) => (
                    shape && (shape.type === 'circle' ? (
                        <Circle key={index} cx={shape.x} cy={shape.y} r={shape.r} stroke={shape.stroke} />
                    ) : shape.type === 'rect' ? (
                        <Rect key={index} x={shape.x} y={shape.y} width={shape.width} height={shape.height} stroke={shape.stroke} />
                    ) : shape.type === 'brush' ?(
                        <Brush key={index} d={shape.d} stroke={shape.stroke}/>
                    ) : shape.type === 'line' ?(
                        <Line key={index} d={shape.d} stroke={shape.stroke}/>

                    ) :
                       <Polyline key={index} points={shape.points} stroke={shape.stroke}/>
                    )

                ))}
            </svg>
        </div>
    );
});

export default SvgCanvas;