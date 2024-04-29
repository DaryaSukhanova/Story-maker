import React, {useRef, useState} from 'react';
import "../../styles/toolbar.scss"
import canvasState from "../../store/canvasState";
import Brush from "../../tools/graphic-tools/Brush";
import toolState from "../../store/toolState";
import Rect from "../../tools/graphic-tools/Rect";
import Circle from "../../tools/graphic-tools/Cirlcle";
import Eraser from "../../tools/graphic-tools/Eraser";
import Line from "../../tools/graphic-tools/Line";
import canvas from "./Canvas";
import Canvas from "./Canvas";
import {Button, Modal} from "react-bootstrap";
import axios from "axios";
import Scratch from "../../tools/graphic-tools/Scratch";
import Bubbles from "../../tools/graphic-tools/Bubbles";
import Pencil from "../../tools/graphic-tools/Pencil";
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