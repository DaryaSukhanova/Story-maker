import React, {useState} from 'react';
import "../../styles/svg-toolbar.scss";
import svgToolState from "../../store/svgToolState";
import SvgBrush from "../../tools/animation-tools/SvgBrush";
import SvgRect from "../../tools/animation-tools/SvgRect";
import SvgLine from "../../tools/animation-tools/SvgLine";
import Circle from "../../tools/animation-tools/jsx-tools/Circle";
import SvgPolyline from "../../tools/animation-tools/SvgPolyline";
import SvgPolygon from "../../tools/animation-tools/SvgPolygon";
import svgCanvasState from "../../store/svgCanvasState";
import BoxSelect from "../../tools/animation-tools/BoxSelect";
import SvgFiguresBlock from "./SvgFiguresBlock";
import SvgSettingBar from "./SvgSettingBar";
import ColorPicker from "../ColorPicker";
import SvgToolsBlock from "./SvgToolsBlock";

const SvgToolbar = () => {
    const [currentColor, setCurrentColor] = useState("rgba(0, 0, 0, 1)")

    const [isFill, setIsFill] = useState(true);
    const [isStroke, setIsStroke] = useState(false);


    const handleColorChange = (color) => {
        setCurrentColor(`rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`);
    };

    return (
        <div className="tool-bar svg-tool-bar">
            {/*<div className="svg-tool-bar-title">Drawing Tools</div>*/}
                <SvgFiguresBlock/>
                <SvgToolsBlock currentColor={currentColor}/>
                <ColorPicker currentColor={currentColor} handleColorChange={handleColorChange} />
                <SvgSettingBar></SvgSettingBar>

        </div>
    )
}
export default SvgToolbar;
