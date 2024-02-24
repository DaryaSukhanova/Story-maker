import React, {useEffect, useState} from 'react';
import toolState from "../store/toolState";
import svgToolState from "../store/svgToolState";
import "../styles/svg-toolbar.scss"
import SvgTool from "../tools/SvgTool";
import {SketchPicker} from "react-color";
import ColorPicker from "./ColorPicker";

const SvgSettingBar = () => {
    const [currentColor, setCurrentColor] = useState("rgba(0, 0, 0, 1)")

    const [isFill, setIsFill] = useState(true);
    const [isStroke, setIsStroke] = useState(false);
    const handleColorChange = (color) => {
        setCurrentColor(`rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`);
    };

    const changeColor = () => {
        if (isFill) {
            svgToolState.setFillColor(currentColor);
            svgToolState.setFillStroke(currentColor);
        }
        if (isStroke) {
            svgToolState.setFillStroke(currentColor);
        }
    }
    const changeFillColorBtn = () => {
        setIsFill(true);
        setIsStroke(false);
    }
    const changeStrokeColorBtn = () => {
        setIsFill(false);
        setIsStroke(true);
    }

    useEffect(() => {
        changeColor()
        console.log(isFill, isStroke);
    }, [currentColor]);

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
                    <input
                        type="button"
                        value="Outline Color"
                        onClick={changeStrokeColorBtn}
                    />
                </div>

                <div className="fill-color-container">
                    <input
                        type="button"
                        value="Fill Color"
                        onClick={changeFillColorBtn}
                    />
                </div>
            </div>
            <ColorPicker currentColor={currentColor} handleColorChange={handleColorChange} />
        </div>
    );
};

export default SvgSettingBar;