import React, {useRef, useState} from 'react';
import "../../styles/toolbar.scss"
import canvasState from "../../store/canvasState";
import Brush from "../../tools/Brush";
import toolState from "../../store/toolState";
import Rect from "../../tools/Rect";
import Circle from "../../tools/Cirlcle";
import Eraser from "../../tools/Eraser";
import Line from "../../tools/Line";
import canvas from "./Canvas";
import Canvas from "./Canvas";
import {Button, Modal} from "react-bootstrap";
import axios from "axios";
import Scratch from "../../tools/Scratch";
import Bubbles from "../../tools/Bubbles";
import Pencil from "../../tools/Pencil";
import BrushBlock from "./BrushBlock";
import FiguresBlock from "./FiguresBlock";
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
            <FiguresBlock></FiguresBlock>
            <ToolsBlock currentColor={currentColor}></ToolsBlock>
            <ColorPicker currentColor={currentColor} handleColorChange={handleColorChange} />
            <SettingBar></SettingBar>
        </div>
    );
};

export default Toolbar;