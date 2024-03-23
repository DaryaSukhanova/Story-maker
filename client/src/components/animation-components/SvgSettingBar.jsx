import React, {useEffect, useState} from 'react';
import toolState from "../../store/toolState";
import svgToolState from "../../store/svgToolState";
import "../../styles/svg-toolbar.scss"
import SvgTool from "../../tools/animation-tools/SvgTool";
import {SketchPicker} from "react-color";
import ColorPicker from "../ColorPicker";

const SvgSettingBar = () => {

    return (
        <div className="setting-bar" >
            <div>
                <div className="tool-bar-item-title">Line width</div>
                <div className="tool-bar-item">
                    <input className="slider-line-width"
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