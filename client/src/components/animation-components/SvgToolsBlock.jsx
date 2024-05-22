import React, {useEffect, useState} from 'react';
import svgToolState from "../../store/svgToolState";
import "../../styles/toolbar.scss";
import BoxSelectNew from "../../tools/animation-tools/BoxSelectNew";
import Group from "../../tools/animation-tools/Group";
import Mover from "../../tools/animation-tools/Mover";
import svgCanvasState from "../../store/svgCanvasState";

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

    return (
        <div className="tools-block-container">
            <div className="tool-bar-item-title">Инструменты</div>
            <div className="tool-bar-item">
                <button className="tool-bar__btn-tools boxSelect" onClick={() => {
                    new BoxSelectNew(svgCanvasState.canvas);
                }} />
                <button className="tool-bar__btn-tools group" onClick={() => {
                    new Group(svgCanvasState.canvas);
                }} />
                <button className="tool-bar__btn-tools move" onClick={() => {
                    new Mover(svgCanvasState.canvas);
                }} />
                <input
                    className="tool-bar__btn-tools stroke"
                    type="button"
                    onClick={changeStrokeColorBtn}
                />
                <input
                    className="tool-bar__btn-tools fill"
                    type="button"
                    onClick={changeFillColorBtn}
                />
            </div>
        </div>
    );
};

export default SvgToolsBlock;
