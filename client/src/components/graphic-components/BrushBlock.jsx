import React from 'react';
import toolState from "../../store/toolState";
import Brush from "../../tools/graphic-tools/Brush";
import canvasState from "../../store/canvasState";
import Scratch from "../../tools/graphic-tools/Scratch";
import Bubbles from "../../tools/graphic-tools/Bubbles";
import Pencil from "../../tools/graphic-tools/Pencil";
import SmoothBrush from "../../tools/graphic-tools/SmoothBrush";
import Highlighter from "../../tools/graphic-tools/Highlighter";

const BrushBlock = () => {
    return (
        <div className="brush-block-container">
            <div className="tool-bar-item-title">Кисти</div>
            <div className="tool-bar-item brush-block">
                <button className="tool-bar__btn pen" onClick={()=> toolState.setTool(new Brush(canvasState.canvas))}/>
                <button className="tool-bar__btn scratch" onClick={()=> toolState.setTool(new Scratch(canvasState.canvas))}/>
                <button className="tool-bar__btn bubbles" onClick={()=> toolState.setTool(new Bubbles(canvasState.canvas))}/>
                <button className="tool-bar__btn pencil" onClick={()=> toolState.setTool(new Pencil(canvasState.canvas))}/>
                <button className="tool-bar__btn smoothBrush" onClick={()=> toolState.setTool(new SmoothBrush(canvasState.canvas))}/>
                <button className="tool-bar__btn marker" onClick={()=> toolState.setTool(new Highlighter(canvasState.canvas))}/>
            </div>

        </div>
    );
};

export default BrushBlock;