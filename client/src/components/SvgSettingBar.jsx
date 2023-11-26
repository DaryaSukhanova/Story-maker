import React from 'react';
import toolState from "../store/toolState";
import svgToolState from "../store/svgToolState";

const SvgSettingBar = () => {
    return (
        <div className="svg-setting-bar">
            <label htmlFor="line-width">Толщина линии</label>
            <input
                onChange={e => svgToolState.setLineWidth(e.target.value)}
                style={{margin: '0 10px'}}
                id="line-width" type="number"
                defaultValue={2} min={1} max={50}
            />
            <label htmlFor="stroke-color" style={{marginRight: 7}}>Цвет обводки</label>
            <input id="stroke-color"
                   onChange={e => svgToolState.setFillStroke(e.target.value)}
                   type="color"
            />

        </div>
    );
};

export default SvgSettingBar;