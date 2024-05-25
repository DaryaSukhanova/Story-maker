import React from 'react';
import { Tooltip } from 'react-tooltip';
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

const toolTips = {
    pen: 'Ручка',
    scratch: 'Кисть',
    bubbles: 'Пузыри',
    pencil: 'Карандаш',
    smoothBrush: 'Гладкая кисть',
    marker: 'Маркер'
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
                    <div key={toolKey}>
                        <button
                            className={`tool-bar__btn ${toolKey}`}
                            onClick={() => handleToolClick(toolKey)}
                            id={`GE${toolKey}`}
                            data-tooltip-id={`tooltip-${toolKey}`}
                        />
                        <Tooltip
                            id={`tooltip-${toolKey}`}
                            place="bottom"
                            type="info"
                            effect="float"
                        >
                            {toolTips[toolKey]}
                        </Tooltip>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BrushBlock;
