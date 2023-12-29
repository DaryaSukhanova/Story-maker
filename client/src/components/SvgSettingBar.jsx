import React from 'react';
import toolState from "../store/toolState";
import svgToolState from "../store/svgToolState";
import "../styles/svg-toolbar.scss"
import SvgTool from "../tools/SvgTool";

const strokeColorStyles = {
    background: '#fff',
    appearance: 'none',
    border: 'none',
    padding: '2px',
    borderRadius: '4px',
    cursor: 'pointer'
};
const SvgSettingBar = () => {
    return (
        <div className="svg-setting-bar">
            <label htmlFor="line-width">Line width</label>
            <input
                onChange={e => svgToolState.setLineWidth(e.target.value)}
                style={{margin: '0 10px'}}
                id="line-width" type="number"
                defaultValue={2} min={1} max={50}
            />
            <label htmlFor="strokeColor" >Outline color</label>
            <input id="strokeColor"
                   style={strokeColorStyles}
                   onChange={e => svgToolState.setFillStroke(e.target.value)}
                   type="color"
            />

        </div>
    );
};

export default SvgSettingBar;