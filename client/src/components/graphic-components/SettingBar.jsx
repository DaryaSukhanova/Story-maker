import React, {useState} from 'react';
import "../../styles/toolbar.scss"
import toolState from "../../store/toolState";
import {SketchPicker} from "react-color";
const SettingBar = () => {

    return (
        <div className="setting-bar">
            <div>
                <div className="tool-bar-item-title">Толщина</div>
                <div className="tool-bar-item">
                    <input className="slider__total-time"
                        onChange={e => toolState.setLineWidth(e.target.value)}
                        id="line-width" type="range"
                        defaultValue={1} min={1} max={50}/>
                </div>
            </div>
        </div>
    );
};

export default SettingBar;