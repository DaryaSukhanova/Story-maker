import React, { useState } from 'react';
import toolState from "../../store/toolState";
import svgToolState from "../../store/svgToolState";
import svgCanvasState from "../../store/svgCanvasState";
import SvgBrush from "../../tools/animation-tools/SvgBrush";
import SvgLine from "../../tools/animation-tools/SvgLine";
import SvgPolyline from "../../tools/animation-tools/SvgPolyline";
import SvgRect from "../../tools/animation-tools/SvgRect";
import SvgCircle from "../../tools/animation-tools/SvgCircle";
import SvgPolygon from "../../tools/animation-tools/SvgPolygon";
import SvgModel from "../../tools/animation-tools/SvgModel";
import "../../styles/toolbar.scss";

const toolComponents = {
    brush: SvgBrush,
    line: SvgLine,
    rect: SvgRect,
    circle: SvgCircle,
    polygon: SvgPolygon,
    model: SvgModel
};

const SvgShapesBlock = () => {
    // const [selectedTool, setSelectedTool] = useState(null);

    const handleSvgToolClick = (toolKey) => {
        const ToolComponent = toolComponents[toolKey];
        if (ToolComponent) {
            const toolInstance = new ToolComponent(svgCanvasState.canvas);
            svgToolState.setSvgTool(toolInstance);
            svgToolState.setIsDrawnSvg(true);
        }
    };

    return (
        <div className="figures-block-container">
            <div className="tool-bar-item-title">Фигуры</div>
            <div className="tool-bar-item">
                {Object.keys(toolComponents).map((toolKey) => (
                    <button
                        key={toolKey}
                        className={`tool-bar__btn ${toolKey}`}
                        onClick={() => handleSvgToolClick(toolKey)}
                    />
                ))}
            </div>
        </div>
    );
};

export default SvgShapesBlock;