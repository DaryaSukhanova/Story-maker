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
import SvgFiguresBlock from "./SvgFiguresBlock";

const SvgToolbar = () => {
    const handleSvgToolClick = (svgTool) => {
        svgToolState.setSvgTool(svgTool);
        svgToolState.setIsDrawnSvg(true)
    };

    return (
        <div className="tool-bar svg-tool-bar">
           <SvgFiguresBlock/>
        </div>
    )
}
export default SvgToolbar;
