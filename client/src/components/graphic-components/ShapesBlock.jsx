import React from 'react';
import toolState from "../../store/toolState";
import Rect from "../../tools/graphic-tools/Rect";
import canvasState from "../../store/canvasState";
import Circle from "../../tools/graphic-tools/Cirlcle";
import Line from "../../tools/graphic-tools/Line";
import Triangle from "../../tools/graphic-tools/Triangle";
import { Tooltip } from 'react-tooltip';

const toolComponents = {
    rect: Rect,
    circle: Circle,
    polygon: Triangle,
    line: Line
};

const toolTips = {
    rect: 'Прямоугольник',
    circle: 'Круг',
    polygon: 'Тругольник',
    line: 'Линия'
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
                    <div key={toolKey}>
                    <button
                        key={toolKey}
                        className={`tool-bar__btn-tools ${toolKey}`}
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

export default ShapesBlock;