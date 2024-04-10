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

    // handleMouseDown = animationToolState.tool === 'motionCurve' ?  () => {} : handleMouseDown;
    // handleMouseMove = animationToolState.tool === 'motionCurve' ? handleMouseMove : () => {};
    // handleMouseUp = animationToolState.tool === 'motionCurve' ? handleMouseUp : () => {};

    return (
        <div className="block-container">
            <svg
                ref={svgCanvasRef}
                className="svg-canvas"
                id="drawingCanvas"
                width={1100}
                height={644}
                // onMouseDown={handleMouseDown}
                // onMouseMove={handleMouseMove}
                // onMouseUp={handleMouseUp}
            >
                {/*{[...shapes, currentShape].map((shape, index) => (*/}
                {/*    shape && (shape.type === 'circle' ? (*/}
                {/*        <Circle key={index} cx={shape.x} cy={shape.y} r={shape.r} />*/}
                {/*    ) : shape.type === 'rect' ? (*/}
                {/*        <Rect key={index} x={shape.x} y={shape.y} width={shape.width} height={shape.height}  />*/}
                {/*    ) : shape.type === 'brush' ?(*/}
                {/*        <Brush key={index} d={shape.d}/>*/}
                {/*    ) : shape.type === 'brush' ?(*/}
                {/*        <Line key={index} d={shape.d} />*/}
                {/*    ) :*/}
                {/*        null*/}
                {/*    )*/}

                {/*))}*/}
                {/*<rect x="0" y="0" width="100" height="100">*/}
                {/*    /!* Анимация изменения ширины *!/*/}
                {/*    <animate attributeName="width" from="100" to="300" dur="1s" repeatCount="indefinite" />*/}
                {/*    /!* Анимация изменения цвета *!/*/}
                {/*    <animate attributeName="fill" values="red;blue;green" dur="2s" repeatCount="indefinite" />*/}
                {/*</rect>*/}

                {/*<svg   x={320} y={150} width="298" height="248" viewBox="0 0 298 248" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
                {/*    <path d="M67.2797 93.7449H78.493V76.345H67.2797V93.7449ZM80.7973 11.6405L112.133 27.0452L89.7063 44.8106L80.7973 11.6405Z" fill="#FBC02D"/>*/}
                {/*    <path d="M27.579 61.6073L-7.53403e-05 87.945H22.4265L36.8692 73.0042C43.6308 78.7114 52.265 82.145 61.673 82.145C83.3482 82.145 100.919 63.9679 100.919 41.5452C100.919 23.1535 89.095 5.69557 72.8862 0V18.3453L27.579 61.6073Z" fill="#916DF9"/>*/}
                {/*    <path className="path-3"  d="M29.9169 59.3801C34.2509 62.2163 39.3473 63.9215 44.853 63.9215C60.3386 63.9215 72.8862 50.9411 72.8862 34.9216V18.3453L29.9169 59.3801Z" fill="#48377D"/>*/}
                {/*    <path  d="M78.4929 32.8452C78.4929 40.855 84.7667 47.3452 92.5095 47.3452C95.5819 47.3452 98.4021 46.2954 100.712 44.5612C100.785 43.5578 100.919 42.5718 100.919 41.5452C100.919 33.344 98.531 25.2009 94.4662 18.3569C93.827 18.2699 93.1711 18.3453 92.5095 18.3453C84.7667 18.3453 78.4929 24.8355 78.4929 32.8452Z" fill="#48377D"/>*/}
                {/*</svg>*/}

            </svg>
        </div>
    );
});

export default SvgCanvas;