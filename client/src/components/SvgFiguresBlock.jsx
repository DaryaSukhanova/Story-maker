import React from 'react';
import toolState from "../store/toolState";
import Rect from "../tools/Rect";
import canvasState from "../store/canvasState";
import Circle from "../tools/Cirlcle";
import Triangle from "../tools/Triangle";
import Line from "../tools/Line";
import SvgBrush from "../tools/SvgBrush";
import svgCanvasState from "../store/svgCanvasState";
import SvgLine from "../tools/SvgLine";
import SvgPolyline from "../tools/SvgPolyline";
import SvgRect from "../tools/SvgRect";
import SvgCircle from "../tools/SvgCircle";
import SvgPolygon from "../tools/SvgPolygon";
import svgToolState from "../store/svgToolState";
import "../styles/toolbar.scss";
const handleSvgToolClick = (svgTool) => {
    svgToolState.setSvgTool(svgTool);
    svgToolState.setIsDrawnSvg(true)
};
const SvgFiguresBlock = () => {
    return (
        <div className="figures-block-container">
            <div className="tool-bar-item-title">Figures</div>
            <div className="tool-bar-item">
                <button className="tool-bar__btn svgBrush" onClick={() => handleSvgToolClick(new SvgBrush(svgCanvasState.canvas))} />
                <button className="tool-bar__btn line" onClick={() => handleSvgToolClick(new SvgLine(svgCanvasState.canvas))} />
                <button className="tool-bar__btn svgPolyline" onClick={() => handleSvgToolClick(new SvgPolyline(svgCanvasState.canvas))} />
                <button className="tool-bar__btn rect" onClick={() => handleSvgToolClick(new SvgRect(svgCanvasState.canvas))} />
                <button className="tool-bar__btn circle" onClick={() => handleSvgToolClick(new SvgCircle(svgCanvasState.canvas))} />
                <button className="tool-bar__btn triangle" onClick={() => handleSvgToolClick(new SvgPolygon(svgCanvasState.canvas))} />
            </div>

        </div>
    );
};

export default SvgFiguresBlock;