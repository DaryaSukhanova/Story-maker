import React, { useState, useEffect } from 'react';
import { Tooltip } from 'react-tooltip';
import canvasState from "../../store/canvasState";
import toolState from "../../store/toolState";
import Eraser from "../../tools/graphic-tools/Eraser";

const toolTips = {
    select: 'Выбрать',
    fill: 'Заливка',
    stroke: 'Обводка',
    undo: 'Отменить',
    redo: 'Повторить',
    eraser: 'Ластик'
};

const ToolsBlock = ({ currentColor }) => {
    const [isFill, setIsFill] = useState(true);
    const [isStroke, setIsStroke] = useState(false);

    const changeColor = () => {
        if (isFill) {
            toolState.setFillColor(currentColor);
            toolState.setFillStroke(currentColor);
        }
        if (isStroke) {
            toolState.setFillStroke(currentColor);
        }
    }

    const changeFillColorBtn = () => {
        setIsFill(true);
        setIsStroke(false);
    }
    const changeStrokeColorBtn = () => {
        setIsFill(false);
        setIsStroke(true);
    }

    useEffect(() => {
        changeColor()

    }, [currentColor]);

    return (
        <div className="tools-block-container">
            <div className="tool-bar-item-title">Инструменты</div>
            <div className="tool-bar-item">
                <input
                    className="tool-bar__btn-tools select"
                    type="button"
                    data-tooltip-id="tooltip-select"
                    data-tooltip-content={toolTips.select}
                />
                <input
                    className="tool-bar__btn-tools fill"
                    type="button"
                    onClick={changeFillColorBtn}
                    data-tooltip-id="tooltip-fill"
                    data-tooltip-content={toolTips.fill}
                />
                <input
                    className="tool-bar__btn-tools stroke"
                    type="button"
                    onClick={changeStrokeColorBtn}
                    data-tooltip-id="tooltip-stroke"
                    data-tooltip-content={toolTips.stroke}
                />
                <div className="undo-redo-container">
                    <button
                        className="tool-bar__btn-tools undo"
                        onClick={() => canvasState.undo()}
                        data-tooltip-id="tooltip-undo"
                        data-tooltip-content={toolTips.undo}
                    />
                    <button
                        className="tool-bar__btn-tools redo"
                        onClick={() => canvasState.redo()}
                        data-tooltip-id="tooltip-redo"
                        data-tooltip-content={toolTips.redo}
                    />
                </div>
                <button
                    className="tool-bar__btn-tools eraser"
                    onClick={() => toolState.setTool(new Eraser(canvasState.canvas))}
                    data-tooltip-id="tooltip-eraser"
                    data-tooltip-content={toolTips.eraser}
                />
            </div>
            {Object.keys(toolTips).map(toolKey => (
                <Tooltip
                    id={`tooltip-${toolKey}`}
                    place="bottom"
                    type="dark"
                    effect="float"
                    key={toolKey}
                />
            ))}
        </div>
    );
};

export default ToolsBlock;
