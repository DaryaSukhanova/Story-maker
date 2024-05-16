import React, {useRef, useState} from 'react';
import "../../styles/toolbar.scss"
import BrushBlock from "./BrushBlock";
import ShapesBlock from "./ShapesBlock";
import ToolsBlock from "./ToolsBlock";
import {SketchPicker} from "react-color";
import ColorPicker from "../ColorPicker";
import SettingBar from "./SettingBar";
const Toolbar = () => {
    const [currentColor, setCurrentColor] = useState("rgba(0, 0, 0, 1)");
    const handleColorChange = (color) => {
        setCurrentColor(`rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`);
    };
    return (
        <div className="tool-bar">
            <BrushBlock></BrushBlock>
            <ShapesBlock></ShapesBlock>
            <ToolsBlock currentColor={currentColor}></ToolsBlock>
            <ColorPicker currentColor={currentColor} handleColorChange={handleColorChange} />
            <SettingBar></SettingBar>
        </div>
    );
};

export default Toolbar;