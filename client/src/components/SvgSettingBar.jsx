import React, {useState} from 'react';
import toolState from "../store/toolState";
import svgToolState from "../store/svgToolState";
import "../styles/svg-toolbar.scss"
import SvgTool from "../tools/SvgTool";
import {SketchPicker} from "react-color";

const SvgSettingBar = () => {
    const [currentColor, setCurrentColor] = useState("rgba(0, 0, 0, 1)")
    const handleOnChange = (color) => {
        setCurrentColor(`rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`);
        console.log(color.rgb);
    };
    return (
        <div className="setting-bar-container" >
            <div className="svg-setting-bar">
                <div className="line-width-container">
                    {/*<label htmlFor="line-width">Line width</label>*/}
                    <input
                        onChange={e => svgToolState.setLineWidth(e.target.value)}
                        id="line-width" type="number"
                        defaultValue={2} min={1} max={50}
                    />
                </div>

                <div className="stroke-color-container">
                    {/*<label htmlFor="strokeColor">Outline color</label>*/}
                    {/*<input id="strokeColor"*/}
                    {/*       style={strokeColorStyles}*/}
                    {/*       onChange={e => svgToolState.setFillStroke(e.target.value)}*/}
                    {/*       type="color"*/}
                    {/*/>*/}
                    <input
                        type="button"
                        value="Outline Color"
                        onClick={e=>svgToolState.setFillStroke(currentColor)}
                    />
                </div>

                <div className="fill-color-container">
                    {/*<label htmlFor="fillColor" >Fill color</label>*/}
                    {/*<input id="fillColor"*/}
                    {/*       onChange={e => svgToolState.setFillColor(e.target.value)}*/}
                    {/*       type="color"*/}
                    {/*/>*/}
                    <input
                        type="button"
                        value="Fill Color"
                        onClick={e=>svgToolState.setFillColor(currentColor)}
                    />
                </div>
            </div>
            <div className="color-picker-container">
                <SketchPicker
                    color={currentColor}
                    onChangeComplete={handleOnChange}
                />
            </div>
        </div>
    );
};

export default SvgSettingBar;