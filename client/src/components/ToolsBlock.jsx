import React, { useState, useEffect } from 'react';
import canvasState from "../store/canvasState";
import toolState from "../store/toolState";
import Eraser from "../tools/Eraser";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import { SketchPicker } from "react-color";

const ToolsBlock = ({ currentColor }) => {
    const [isFill, setIsFill] = useState(true);
    const [isStroke, setIsStroke] = useState(false);

    const changeColor = () => {
        if (isFill) {
            toolState.setFillColor(currentColor);
            toolState.setFillStroke(currentColor);
        }
        if (isStroke) {
            toolState.setFillStroke(currentColor);
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
        <div className="tools-block-container">
            <div className="tool-bar-item-title">Tools</div>
            <div className="tool-bar-item">
                <input className="tool-bar__btn" type="button" onClick={changeFillColorBtn} />
                <input className="tool-bar__btn" type="button" onClick={changeStrokeColorBtn} />
                <div className="undo-redo-container">
                    <button className="tool-bar__btn undo" onClick={() => canvasState.undo()} />
                    <button className="tool-bar__btn redo" onClick={() => canvasState.redo()} />
                </div>
                <button className="tool-bar__btn eraser" onClick={() => toolState.setTool(new Eraser(canvasState.canvas))} />
            </div>
        </div>
    );
};

export default ToolsBlock;