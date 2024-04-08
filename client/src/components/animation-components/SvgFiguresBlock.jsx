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
import {Svg} from "@svgdotjs/svg.js";


const SvgFiguresBlock = () => {

    const [selectedTool, setSelectedTool] = useState(null);

    const handleSvgToolClick = (svgTool) => {
        svgToolState.setSvgTool(svgTool);
        svgToolState.setIsDrawnSvg(true)
    };

    const tools = [
        {name:"brush", style: 'tool-bar__btn svgBrush'},
        { name: "circle", style: 'tool-bar__btn circle' },
        { name: "rect", style: 'tool-bar__btn rect' },
        {name: "line", style: 'tool-bar__btn line'},
        {name: "polyline", style: 'tool-bar__btn svgPolyline'},
        // {name: "polygon"}
        // Другие инструменты рисования
    ];

    const selectTool = (toolComponent) => {
        svgToolState.setSvgTool(toolComponent);
    };

    return (
        <div className="figures-block-container">
            <div className="tool-bar-item-title">Фигуры</div>
            <div className="tool-bar-item">
                <button className="tool-bar__btn-tools svgBrush" onClick={() => handleSvgToolClick(new SvgBrush(svgCanvasState.canvas))} />
                <button className="tool-bar__btn line" onClick={() => handleSvgToolClick(new SvgLine(svgCanvasState.canvas))} />
                {/*<button className="tool-bar__btn svgPolyline" onClick={() => handleSvgToolClick(new SvgPolyline(svgCanvasState.canvas))} />*/}
                <button className="tool-bar__btn-tools rect" onClick={() => handleSvgToolClick(new SvgRect(svgCanvasState.canvas))} />
                <button className="tool-bar__btn-tools circle" onClick={() => handleSvgToolClick(new SvgCircle(svgCanvasState.canvas))} />
                <button className="tool-bar__btn-tools triangle" onClick={() => handleSvgToolClick(new SvgPolygon(svgCanvasState.canvas))} />
                {/*{tools.map((tool, index) => (*/}
                {/*    <button key={index} onClick={() => selectTool(tool.name)} className={tool.style}></button>*/}
                {/*))}*/}
            </div>

        </div>
    );
};

export default SvgFiguresBlock;