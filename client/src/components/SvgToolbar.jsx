import svgToolState from "../store/svgToolState";
import SvgBrush from "../tools/SvgBrush";
import toolState from "../store/toolState";
import Brush from "../tools/Brush";
import canvasState from "../store/canvasState";
import React from "react";
import svgCanvasState from "../store/svgCanvasState";
import SvgRect from "../tools/SvgRect";
import SvgLine from "../tools/SvgLine";
import SvgCircle from "../tools/SvgCircle";
import SvgPolyline from "../tools/SvgPolyline";
import SvgPolygon from "../tools/SvgPolygon";
import "../styles/svg-toolbar.scss"
import BoxSelect from "../tools/BoxSelect";

const SvgToolbar = () =>{
    return(
        <div className="svg-tool-bar-container">
            <div className="svg-tool-bar-title">
                Drawing Tools
            </div>
            <div className="svg-tool-bar">
                <button className="tool-bar__btn boxSelect" onClick={()=> {
                    const boundingBox = document.getElementById('boundingBoxGroup');
                    if (boundingBox) {
                        boundingBox.parentNode.removeChild(boundingBox);
                    }
                    svgToolState.setSvgTool(new BoxSelect(svgCanvasState.canvas))}
                }
                />
                <button className="tool-bar__btn svgBrush" onClick={()=> svgToolState.setSvgTool(new SvgBrush(svgCanvasState.canvas))}/>
                <button className="tool-bar__btn svgLine" onClick={()=> svgToolState.setSvgTool(new SvgLine(svgCanvasState.canvas))}/>
                <button className="tool-bar__btn svgPolyline" onClick={()=> svgToolState.setSvgTool(new SvgPolyline(svgCanvasState.canvas))}/>
                <button className="tool-bar__btn svgRect" onClick={()=> svgToolState.setSvgTool(new SvgRect(svgCanvasState.canvas))}/>
                <button className="tool-bar__btn svgCircle" onClick={()=> svgToolState.setSvgTool(new SvgCircle(svgCanvasState.canvas))}/>
                <button className="tool-bar__btn svgPolygon" onClick={()=> svgToolState.setSvgTool(new SvgPolygon(svgCanvasState.canvas))}/>

            </div>
        </div>

    )
}
export default SvgToolbar;