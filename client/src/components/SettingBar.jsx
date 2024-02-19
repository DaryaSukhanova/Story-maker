import React, {useState} from 'react';
import "../styles/toolbar.scss"
import toolState from "../store/toolState";
import {SketchPicker} from "react-color";
const SettingBar = () => {
    const [currentColor, setCurrentColor] = useState("rgba(0, 0, 0, 1)")

    const handleOnChange = (color) => {
        setCurrentColor(`rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`);
        console.log(color.rgb);
    };
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
            {/*<div>*/}
            {/*    <label htmlFor="stroke-color" >Outline color</label>*/}
            {/*    <input id="stroke-color" onChange={e=>toolState.setFillStroke(e.target.value)} type="color"/>*/}
            {/*</div>*/}
            <div>
                <div className="tool-bar-item-title">Color</div>
                <div className="color-picker-container">
                    <SketchPicker
                        color={currentColor}
                        onChangeComplete={handleOnChange}
                    />
                </div>
            </div>

        </div>
    );
};

export default SettingBar;