import React from 'react';
import "../styles/svg-toolbar.scss";
import svgToolState from "../store/svgToolState";
import SvgBrush from "../tools/SvgBrush";
import SvgRect from "../tools/SvgRect";
import SvgLine from "../tools/SvgLine";
import SvgCircle from "../tools/SvgCircle";
import SvgPolyline from "../tools/SvgPolyline";
import SvgPolygon from "../tools/SvgPolygon";
import svgCanvasState from "../store/svgCanvasState";
import BoxSelect from "../tools/BoxSelect";

const SvgToolbar = () => {
    const handleSvgToolClick = (svgTool) => {
        svgToolState.setSvgTool(svgTool);
        svgToolState.setIsDrawnSvg(true)
    };

    return (
        <div className="svg-tool-bar-container">
            <div className="svg-tool-bar-title">Drawing Tools</div>
            <div className="svg-tool-bar">
                <button className="tool-bar__btn boxSelect" onClick={() => {
                    const boundingBox = document.getElementById('boundingBoxGroup');
                    if (boundingBox) {
                        boundingBox.parentNode.removeChild(boundingBox);
                    }
                    handleSvgToolClick(new BoxSelect(svgCanvasState.canvas));
                }} />
                <button className="tool-bar__btn svgBrush" onClick={() => handleSvgToolClick(new SvgBrush(svgCanvasState.canvas))} />
                <button className="tool-bar__btn svgLine" onClick={() => handleSvgToolClick(new SvgLine(svgCanvasState.canvas))} />
                <button className="tool-bar__btn svgPolyline" onClick={() => handleSvgToolClick(new SvgPolyline(svgCanvasState.canvas))} />
                <button className="tool-bar__btn svgRect" onClick={() => handleSvgToolClick(new SvgRect(svgCanvasState.canvas))} />
                <button className="tool-bar__btn svgCircle" onClick={() => handleSvgToolClick(new SvgCircle(svgCanvasState.canvas))} />
                <button className="tool-bar__btn svgPolygon" onClick={() => handleSvgToolClick(new SvgPolygon(svgCanvasState.canvas))} />
            </div>
        </div>
    )
}
export default SvgToolbar;
