import React from 'react';
import canvasState from "../store/canvasState";
import toolState from "../store/toolState";
import Eraser from "../tools/Eraser";

const ToolsBlock = () => {
    const changeColor = e =>{
        toolState.setFillColor(e.target.value)
        toolState.setFillStroke(e.target.value)
    }
    return (
        <div>
            <input onChange={e=> changeColor(e)} style={{marginLeft: 10}} type="color"/>
            <button className="tool-bar__btn undo" onClick={()=> canvasState.undo()}/>
            <button className="tool-bar__btn redo" onClick={()=> canvasState.redo()}/>
            <button className="tool-bar__btn eraser" onClick={()=> toolState.setTool(new Eraser(canvasState.canvas))}/>
            {/*<button className="tool-bar__btn save" onClick={()=> setModal(true)}/>*/}
        </div>
    );
};

export default ToolsBlock;