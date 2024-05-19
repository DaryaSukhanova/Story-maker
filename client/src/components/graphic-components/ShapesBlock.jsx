import React from 'react';
import toolState from "../../store/toolState";
import Rect from "../../tools/graphic-tools/Rect";
import canvasState from "../../store/canvasState";
import Circle from "../../tools/graphic-tools/Cirlcle";
import Eraser from "../../tools/graphic-tools/Eraser";
import Line from "../../tools/graphic-tools/Line";
import Triangle from "../../tools/graphic-tools/Triangle";

const toolComponents = {
    rect: Rect,
    circle: Circle,
    polygon: Triangle,
    line: Line
};

const ShapesBlock = () => {
    const handleToolClick = (toolKey) => {
        const ToolComponent = toolComponents[toolKey];
        if (ToolComponent) {
            const toolInstance = new ToolComponent(canvasState.canvas);
            toolState.setTool(toolInstance);
        }
    };

    return (
        <div className="figures-block-container">
            <div className="tool-bar-item-title">Фигуры</div>
            <div className="tool-bar-item">
                {Object.keys(toolComponents).map((toolKey) => (
                    <button
                        key={toolKey}
                        className={`tool-bar__btn-tools ${toolKey}`}
                        onClick={() => handleToolClick(toolKey)}
                    />
                ))}
            </div>
        </div>
    );
};

export default ShapesBlock;