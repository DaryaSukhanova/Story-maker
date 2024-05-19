import React from 'react';
import toolState from "../../store/toolState";
import Brush from "../../tools/graphic-tools/Brush";
import canvasState from "../../store/canvasState";
import Scratch from "../../tools/graphic-tools/Scratch";
import Bubbles from "../../tools/graphic-tools/Bubbles";
import Pencil from "../../tools/graphic-tools/Pencil";
import SmoothBrush from "../../tools/graphic-tools/SmoothBrush";
import Highlighter from "../../tools/graphic-tools/Highlighter";
const toolComponents = {
    pen: Brush,
    scratch: Scratch,
    bubbles: Bubbles,
    pencil: Pencil,
    smoothBrush: SmoothBrush,
    marker: Highlighter
};

const BrushBlock = () => {
    const handleToolClick = (toolKey) => {
        const ToolComponent = toolComponents[toolKey];
        if (ToolComponent) {
            const toolInstance = new ToolComponent(canvasState.canvas);
            toolState.setTool(toolInstance);
        }
    };

    return (
        <div className="brush-block-container">
            <div className="tool-bar-item-title">Кисти</div>
            <div className="tool-bar-item brush-block">
                {Object.keys(toolComponents).map((toolKey) => (
                    <button
                        key={toolKey}
                        className={`tool-bar__btn ${toolKey}`}
                        onClick={() => handleToolClick(toolKey)}
                    />
                ))}
            </div>
        </div>
    );
};

export default BrushBlock;