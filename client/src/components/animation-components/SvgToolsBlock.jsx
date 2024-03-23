import React, {useEffect, useState} from 'react';
import svgToolState from "../../store/svgToolState";
import "../../styles/toolbar.scss";
import BoxSelect from "../../tools/animation-tools/BoxSelect";
import svgCanvasState from "../../store/svgCanvasState";
import BoxSelectNew from "../../tools/animation-tools/BoxSelectNew";

const SvgToolsBlock = ({ currentColor }) => {
    const [isFill, setIsFill] = useState(true);
    const [isStroke, setIsStroke] = useState(false);
    const changeColor = () => {
        if (isFill) {
            svgToolState.setFillColor(currentColor);
            svgToolState.setStrokeColor(currentColor)
            // svgToolState.setFillStroke(currentColor);

        }
        if (isStroke) {
            // svgToolState.setFillStroke(currentColor);

            svgToolState.setStrokeColor(currentColor)
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

    const handleSvgToolClick = (svgTool) => {
        svgToolState.setSvgTool(svgTool);
        svgToolState.setIsDrawnSvg(true)
    };
    return (
        <div className="tools-block-container">
            <div className="tool-bar-item-title">Tools</div>

            <div className="tool-bar-item">
                <button className="tool-bar__btn boxSelect" onClick={() => {
                    const boundingBox = document.getElementById('boundingBoxGroup');
                    if (boundingBox) {
                        boundingBox.parentNode.removeChild(boundingBox);
                    }
                    handleSvgToolClick(new BoxSelect(svgCanvasState.canvas));
                }} />
                <button className="tool-bar__btn boxSelect" onClick={() => {
                    new BoxSelectNew(svgCanvasState.canvas);
                }} />
                <input
                    className="tool-bar__btn stroke"
                    type="button"
                    onClick={changeStrokeColorBtn}
                />
                <input
                    className="tool-bar__btn fill"
                    type="button"
                    onClick={changeFillColorBtn}
                />
            </div>

        </div>
    );
};

export default SvgToolsBlock;