import React, {useState} from 'react';
import toolState from "../../store/toolState";
import Rect from "../../tools/graphic-tools/Rect";
import canvasState from "../../store/canvasState";
import Triangle from "../../tools/graphic-tools/Triangle";
import Line from "../../tools/graphic-tools/Line";
import SvgBrush from "../../tools/animation-tools/SvgBrush";
import svgCanvasState from "../../store/svgCanvasState";
import SvgLine from "../../tools/animation-tools/SvgLine";
import SvgPolyline from "../../tools/animation-tools/SvgPolyline";
import SvgRect from "../../tools/animation-tools/SvgRect";

import SvgPolygon from "../../tools/animation-tools/SvgPolygon";
import svgToolState from "../../store/svgToolState";
import "../../styles/toolbar.scss";
import Circle from "../../tools/animation-tools/jsx-tools/Circle";
import SvgCircle from "../../tools/animation-tools/SvgCircle";


const SvgFiguresBlock = () => {

    const [selectedTool, setSelectedTool] = useState(null);

    const handleSvgToolClick = (svgTool) => {
        svgToolState.setSvgTool(svgTool);
        svgToolState.setIsDrawnSvg(true)
    };

    const tools = [
        { name: "circle" },
        { name: "rect" },
        {name:"brush"},
        {name: "line"},
        {name: "polyline"},
        // {name: "polygon"}
        // Другие инструменты рисования
    ];

    const selectTool = (toolComponent) => {
        svgToolState.setSvgTool(toolComponent);
    };


    return (
        <div className="figures-block-container">
            <div className="tool-bar-item-title">Figures</div>
            <div className="tool-bar-item">
                {/*<button className="tool-bar__btn line" onClick={() => handleSvgToolClick(new SvgLine(svgCanvasState.canvas))} />*/}
                <button className="tool-bar__btn svgPolyline" onClick={() => handleSvgToolClick(new SvgPolyline(svgCanvasState.canvas))} />
                {/*<button className="tool-bar__btn svgBrush" onClick={() => handleSvgToolClick(new SvgBrush(svgCanvasState.canvas))} />*/}
                {/*<button className="tool-bar__btn rect" onClick={() => handleSvgToolClick(new SvgRect(svgCanvasState.canvas))} />*/}
                {/*<button className="tool-bar__btn circle" onClick={() => handleSvgToolClick(new SvgCircle(svgCanvasState.canvas))} />*/}
                {/*<button className="tool-bar__btn triangle" onClick={() => handleSvgToolClick(new SvgPolygon(svgCanvasState.canvas))} />*/}
                {tools.map((tool, index) => (
                    <button key={index} onClick={() => selectTool(tool.name)}>
                        {tool.name}
                    </button>
                ))}
            </div>

        </div>
    );
};

export default SvgFiguresBlock;