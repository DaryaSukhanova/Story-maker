import React from 'react';
import svgCanvas from "./SvgCanvas";
import svgCanvasState from "../store/svgCanvasState";

const ActionPanel = () => {
    return (
        <div className="action-panel-container">
            <button className="action-button">Save</button>
            <button className="action-button" onClick={svgCanvasState.handleClearCanvas}>Clear</button>
        </div>
    );
};

export default ActionPanel;