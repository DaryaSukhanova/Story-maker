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
const Toolbar = () => {
    return (
        <div className="tool-bar">
            <BrushBlock></BrushBlock>
            <FiguresBlock></FiguresBlock>
            <ToolsBlock></ToolsBlock>
        </div>
    );
};

export default Toolbar;