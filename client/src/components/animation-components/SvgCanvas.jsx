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
    const [circle, setCircle] = useState(null); // Состояние круга
    const [rect, setRect] = useState(null);

    const [startX, setStartX] = useState(0); // Начальная координата X
    const [startY, setStartY] = useState(0); // Начальная координата Y
    const [isDrawing, setIsDrawing] = useState(false); // Флаг рисования

    useEffect(() => {
        svgCanvasState.setSvgCanvas(svgCanvasRef.current);
    }, []);

    // Обработчик нажатия кнопки мыши
    const handleMouseDown = (e) => {
        setIsDrawing(true); // Устанавливаем флаг рисования
        const svgCanvasRect = svgCanvasRef.current.getBoundingClientRect();
        const x = e.clientX - svgCanvasRect.left;
        const y = e.clientY - svgCanvasRect.top;
        setStartX(x); // Устанавливаем начальную координату X
        setStartY(y); // Устанавливаем начальную координату Y
    };

    // Обработчик движения мыши
    const handleMouseMove = (e) => {
        if (!isDrawing) return; // Если не рисуем, выходим
        const svgCanvasRect = svgCanvasRef.current.getBoundingClientRect();
        const x = e.clientX - svgCanvasRect.left;
        const y = e.clientY - svgCanvasRect.top;
        if (svgToolState.tool === 'circle') {
            const radius = Math.sqrt(Math.pow(x - startX, 2) + Math.pow(y - startY, 2));
            setCircle({ cx: startX, cy: startY, r: radius });
        } else if (svgToolState.tool === 'rect') {
            const width = Math.abs(x - startX);
            const height = Math.abs(y - startY);
            setRect({ x: startX, y: startY, width, height });
        }
    };

    // Обработчик отжатия кнопки мыши
    const handleMouseUp = () => {
        setIsDrawing(false); // Сбрасываем флаг рисования
    };

    return (
        <div className="block-container">
            <svg
                ref={svgCanvasRef}
                className="svg-canvas"
                id="drawingCanvas"
                width={1100}
                height={644}
                onMouseDown={handleMouseDown} // Обработчик нажатия кнопки мыши
                onMouseMove={handleMouseMove} // Обработчик движения мыши
                onMouseUp={handleMouseUp} // Обработчик отжатия кнопки мыши
            >
                {/*{circle && <Circle cx={circle.cx} cy={circle.cy} r={circle.r} />}*/}
                {svgToolState.tool === 'circle' && circle && <Circle cx={circle.cx} cy={circle.cy} r={circle.r} />}
                {svgToolState.tool === 'rect' && rect && <Rect x={rect.x} y={rect.y} width={rect.width} height={rect.height} />}
            </svg>
        </div>
    );
});

export default SvgCanvas;