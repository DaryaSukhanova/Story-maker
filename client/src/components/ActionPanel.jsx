import React from 'react';
import svgCanvasState from "../store/svgCanvasState";
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