import React, {useEffect, useState} from 'react';
import toolState from "../../store/toolState";
import svgToolState from "../../store/svgToolState";
import "../../styles/svg-toolbar.scss"


const SvgSettingBar = () => {

    return (
        <div className="setting-bar" >
            <div>
                <label className="tool-bar-item-title" for="line-width">Толщина</label>
                <div className="tool-bar-item">
                    <input className="slider__input"
                           onChange={e => svgToolState.setStroke(e.target.value)}
                           // onChange={e => svgToolState.setLineWidth(e.target.value)}
                           id="line-width" type="range"
                           defaultValue={1} min={1} max={50}/>
                </div>
            </div>
        </div>
    );
};

export default SvgSettingBar;