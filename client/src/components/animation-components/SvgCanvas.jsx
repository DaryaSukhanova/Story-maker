import React, {useEffect, useRef, useState} from 'react';
import "../../styles/svg-canvas.scss"
import {observer} from "mobx-react-lite";
import canvasState from "../../store/canvasState";
import svgToolState from "../../store/svgToolState";
import SvgRect from "../../tools/animation-tools/SvgRect";
import SvgBrush from "../../tools/animation-tools/SvgBrush";
import Circle from "../../tools/animation-tools/Circle";
import SvgLine from "../../tools/animation-tools/SvgLine";
import SvgPolyline from "../../tools/animation-tools/SvgPolyline";
import SvgPolygon from "../../tools/animation-tools/SvgPolygon";

import svgCanvasState from "../../store/svgCanvasState";
import animationToolState from "../../store/animationToolState";
import Rect from "../../tools/animation-tools/Rect";

const SvgCanvas = observer(() => {
    const svgCanvasRef = useRef();
    const [shapes, setShapes] = useState([]); // Массив для хранения всех нарисованных фигур
    const [currentShape, setCurrentShape] = useState(null);
    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);
    const [isDrawing, setIsDrawing] = useState(false);

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
        setCurrentShape({ type: svgToolState.tool, x, y, width: 0, height: 0 });
    };

    const handleMouseMove = (e) => {
        if (!isDrawing) return;
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
        }
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
                {shapes.map((shape, index) => {
                    if (shape.type === 'circle') {
                        return <Circle key={index} cx={shape.x} cy={shape.y} r={shape.r} />;
                    } else if (shape.type === 'rect') {
                        return <Rect key={index} x={shape.x} y={shape.y} width={shape.width} height={shape.height} />;
                    }
                })}
                {currentShape && ( // Рендерим текущий элемент в процессе рисования
                    currentShape.type === 'circle' ?
                        <Circle cx={currentShape.x} cy={currentShape.y} r={currentShape.r} /> :
                        <Rect x={currentShape.x} y={currentShape.y} width={currentShape.width} height={currentShape.height}  />
                )}
            </svg>
        </div>
    );
});

export default SvgCanvas;