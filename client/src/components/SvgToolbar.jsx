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


const SvgToolbar = () =>{
    return(
        <div className="tool-bar">
            <button className="tool-bar__btn svgBrush" onClick={()=> svgToolState.setSvgTool(new SvgBrush(svgCanvasState.canvas))}/>
            <button className="tool-bar__btn svgLine" onClick={()=> svgToolState.setSvgTool(new SvgLine(svgCanvasState.canvas))}/>
            <button className="tool-bar__btn svgPolyline" onClick={()=> svgToolState.setSvgTool(new SvgPolyline(svgCanvasState.canvas))}/>
            <button className="tool-bar__btn svgRect" onClick={()=> svgToolState.setSvgTool(new SvgRect(svgCanvasState.canvas))}/>
            <button className="tool-bar__btn svgCircle" onClick={()=> svgToolState.setSvgTool(new SvgCircle(svgCanvasState.canvas))}/>
            <button className="tool-bar__btn svgPolygon" onClick={()=> svgToolState.setSvgTool(new SvgPolygon(svgCanvasState.canvas))}/>

        </div>
    )
}
export default SvgToolbar;