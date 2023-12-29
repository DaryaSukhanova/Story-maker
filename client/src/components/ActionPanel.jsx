import React from 'react';
import svgCanvas from "./SvgCanvas";
import svgCanvasState from "../store/svgCanvasState";
import MotionCurve from "../tools/MotionCurve";
import animationToolState from "../store/animationToolState";

const ActionPanel = () => {
    return (
        <div className="action-panel-container">
            <button className="action-button" onClick={saveSvg}>Save</button>
            <button className="action-button" onClick={svgCanvasState.handleClearCanvas}>Clear</button>
        </div>
    );
};

function saveSvg(){
    animationToolState.isAnimationSaved = true
}

export default ActionPanel;