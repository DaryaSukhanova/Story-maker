import React from 'react';
import "../../styles/toolbar.scss"
import toolState from "../../store/toolState";
const SettingBar = () => {

    return (
        <div className="setting-bar">
            <div>
                <label className="tool-bar-item-title" for="line-width">Толщина</label>
                <div className="tool-bar-item">
                    
                    <input className="slider__input"
                        onChange={e => toolState.setLineWidth(e.target.value)}
                        id="line-width" type="range"
                        defaultValue={1} min={1} max={50} />
                </div>
            </div>
        </div>
    );
};
export default SettingBar;