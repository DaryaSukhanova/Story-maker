import React, { useEffect, useState } from 'react';
import svgToolState from "../../store/svgToolState";
import "../../styles/toolbar.scss";
import BoxSelectNew from "../../tools/animation-tools/BoxSelectNew";
import Group from "../../tools/animation-tools/Group";
import Mover from "../../tools/animation-tools/Mover";
import svgCanvasState from "../../store/svgCanvasState";
import { Tooltip } from 'react-tooltip';

const SvgToolsBlock = ({ currentColor }) => {
    const [isFill, setIsFill] = useState(false);
    const [isStroke, setIsStroke] = useState(true);

    const changeColor = () => {
        if (isFill) {
            svgToolState.setFillColor(currentColor);
        }
        if (isStroke) {
            svgToolState.setStrokeColor(currentColor);
        }
    };

    const changeFillColorBtn = () => {
        setIsFill(prevIsFill => {
            const newIsFill = !prevIsFill;
            if (!newIsFill) {
                svgToolState.setFillColor("none");
            } else {
                svgToolState.setFillColor(currentColor);
            }
            return newIsFill;
        });
        changeColor();
    };

    const changeStrokeColorBtn = () => {
        setIsStroke(prevIsStroke => {
            const newIsStroke = !prevIsStroke;
            if (!newIsStroke) {
                svgToolState.setStrokeColor("none");
            } else {
                svgToolState.setStrokeColor(currentColor);
            }
            return newIsStroke;
        });
        changeColor();
    };

    useEffect(() => {
        changeColor();
        console.log("isFill, isStroke", isFill, isStroke);
    }, [currentColor, isFill, isStroke]);

    const handleSvgToolClick = (svgTool) => {
        svgToolState.setSvgTool(svgTool);
        svgToolState.setIsDrawnSvg(true);
    };

    const toolTips = {
        boxSelect: 'Выбрать',
        group: 'Группировка',
        move: 'Перемещение',
        stroke: 'Обводка',
        fill: 'Заливка'
    };

    return (
        <div className="tools-block-container">
            <div className="tool-bar-item-title">Инструменты</div>
            <div className="tool-bar-item">
                <button
                    className="tool-bar__btn-tools boxSelect"
                    onClick={() => { new BoxSelectNew(svgCanvasState.canvas); }}
                    data-tip={toolTips.boxSelect}
                    data-tooltip-id="tooltip-boxSelect"
                    data-tooltip-content={toolTips.boxSelect}
                />
                <button
                    className="tool-bar__btn-tools group"
                    onClick={() => { new Group(svgCanvasState.canvas); }}
                    data-tip={toolTips.group}
                    data-tooltip-id="tooltip-group"
                    data-tooltip-content={toolTips.group}
                    
                />
                <button
                    className="tool-bar__btn-tools move"
                    onClick={() => { new Mover(svgCanvasState.canvas); }}
                    data-tooltip-id="tooltip-move"
                    data-tooltip-content={toolTips.move}
                />
                <input
                    className="tool-bar__btn-tools stroke"
                    type="button"
                    onClick={changeStrokeColorBtn}
                    data-tooltip-id="tooltip-stroke"
                    data-tooltip-content={toolTips.stroke}
                />
                <input
                    className="tool-bar__btn-tools fill"
                    type="button"
                    onClick={changeFillColorBtn}
                    data-tooltip-id="tooltip-fill"
                    data-tooltip-content={toolTips.fill}
                />
            </div>
            {Object.keys(toolTips).map(toolKey => (
                <Tooltip
                    id={`tooltip-${toolKey}`}
                    place="bottom"
                    type="dark"
                    effect="float"
                    key={toolKey}
                >
                    {toolTips[toolKey]}
                </Tooltip>
            ))}
        </div>
    );
};

export default SvgToolsBlock;
