import React, {useRef, useState} from 'react';
import canvasState from "../store/canvasState";
import toolState from "../store/toolState";
import Eraser from "../tools/Eraser";
import {Button, Modal} from "react-bootstrap";
import axios from "axios";

const ToolsBlock = () => {
    const changeColor = e =>{
        toolState.setFillColor(e.target.value)
        toolState.setFillStroke(e.target.value)
    }
    return (
        <div className="tools-block-container">

            <div className="tool-bar-item-title">Tools</div>
            <div className="tool-bar-item">
                <input onChange={e=> changeColor(e)} type="color"/>
                <div className="undo-redo-container">
                    <button className="tool-bar__btn undo" onClick={()=> canvasState.undo()}/>
                    <button className="tool-bar__btn redo" onClick={()=> canvasState.redo()}/>
                </div>

                <button className="tool-bar__btn eraser" onClick={()=> toolState.setTool(new Eraser(canvasState.canvas))}/>
                {/*<button className="tool-bar__btn save" onClick={()=> setModal(true)}/>*/}
            </div>

        </div>
    );
};

export default ToolsBlock;