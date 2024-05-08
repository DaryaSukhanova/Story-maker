import React, {useEffect, useState} from 'react';
import svgToolState from "../../store/svgToolState";
import "../../styles/toolbar.scss";
import BoxSelect from "../../tools/animation-tools/BoxSelect";
import svgCanvasState from "../../store/svgCanvasState";
import BoxSelectNew from "../../tools/animation-tools/BoxSelectNew";
import Group from "../../tools/animation-tools/Group";
import Mover from "../../tools/animation-tools/Mover";

const SvgToolsBlock = ({ currentColor }) => {
    const [isFill, setIsFill] = useState(false);
    const [isStroke, setIsStroke] = useState(true);
    const changeColor = () => {

        if (isFill) {
            svgToolState.setFillColor(currentColor);
        }
        if (isStroke) {
            svgToolState.setStrokeColor(currentColor)
        }
    }
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
    };

    useEffect(() => {
        changeColor()

    }, [currentColor]);

    const handleSvgToolClick = (svgTool) => {
        svgToolState.setSvgTool(svgTool);
        svgToolState.setIsDrawnSvg(true)
    };
    return (
        <div className="tools-block-container">
            <div className="tool-bar-item-title">Инструменты</div>

            <div className="tool-bar-item">
                {/*<button className="tool-bar__btn boxSelect" onClick={() => {*/}
                {/*    const boundingBox = document.getElementById('boundingBoxGroup');*/}
                {/*    if (boundingBox) {*/}
                {/*        boundingBox.parentNode.removeChild(boundingBox);*/}
                {/*    }*/}
                {/*    handleSvgToolClick(new BoxSelect(svgCanvasState.canvas));*/}
                {/*}} />*/}
                <button className="tool-bar__btn-tools boxSelect" onClick={() => {
                    new BoxSelectNew(svgCanvasState.canvas);
                }} />
                <button className="tool-bar__btn-tools group" onClick={() => {
                    new Group(svgCanvasState.canvas);
                }} />
                <button className="tool-bar__btn-tools move" onClick={() => {
                    new Mover(svgCanvasState.canvas);
                }} />
                {/*<input*/}
                {/*    className="tool-bar__btn-tools color-picker"*/}
                {/*    type="button"*/}
                {/*/>*/}
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