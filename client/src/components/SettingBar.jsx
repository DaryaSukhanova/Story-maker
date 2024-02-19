import React from 'react';
import "../styles/toolbar.scss"
import toolState from "../store/toolState";
const SettingBar = () => {
    return (
        <div className="setting-bar">
            <div>
                <div className="tool-bar-item-title">Line width</div>
                <div className="tool-bar-item">
                    <input className="slider-line-width"
                        onChange={e => toolState.setLineWidth(e.target.value)}
                        id="line-width" type="range"
                        defaultValue={1} min={1} max={50}/>
                </div>

            </div>
            <div>
                <label htmlFor="stroke-color" >Outline color</label>
                <input id="stroke-color" onChange={e=>toolState.setFillStroke(e.target.value)} type="color"/>
            </div>

        </div>
    );
};

export default SettingBar;