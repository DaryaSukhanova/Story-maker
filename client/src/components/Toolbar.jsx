import React, {useRef, useState} from 'react';
import "../styles/toolbar.scss"
import canvasState from "../store/canvasState";
import Brush from "../tools/Brush";
import toolState from "../store/toolState";
import Rect from "../tools/Rect";
import Circle from "../tools/Cirlcle";
import Eraser from "../tools/Eraser";
import Line from "../tools/Line";
import canvas from "./Canvas";
import Canvas from "./Canvas";
import {Button, Modal} from "react-bootstrap";
import axios from "axios";
import Scratch from "../tools/Scratch";
import Bubbles from "../tools/Bubbles";
import Pencil from "../tools/Pencil";
import BrushBlock from "./BrushBlock";
import FiguresBlock from "./FiguresBlock";
import ToolsBlock from "./ToolsBlock";
import {SketchPicker} from "react-color";
const Toolbar = () => {
    const [currentColor, setCurrentColor] = useState("rgba(0, 0, 0, 1)")

    const handleOnChange = (color) => {
        setCurrentColor(`rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`);
        console.log(color.rgb);
    };
    return (
        <div className="tool-bar">
            <BrushBlock></BrushBlock>
            <FiguresBlock></FiguresBlock>
            <ToolsBlock currentColor={currentColor}></ToolsBlock>

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

export default Toolbar;