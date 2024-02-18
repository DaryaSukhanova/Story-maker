import React from 'react';
import toolState from "../store/toolState";
import Brush from "../tools/Brush";
import canvasState from "../store/canvasState";
import Scratch from "../tools/Scratch";
import Bubbles from "../tools/Bubbles";
import Pencil from "../tools/Pencil";

const BrushBlock = () => {
    return (
        <div>
            <button className="tool-bar__btn brush" onClick={()=> toolState.setTool(new Brush(canvasState.canvas))}/>
            <button className="tool-bar__btn scratch" onClick={()=> toolState.setTool(new Scratch(canvasState.canvas))}/>
            <button className="tool-bar__btn bubbles" onClick={()=> toolState.setTool(new Bubbles(canvasState.canvas))}/>
            <button className="tool-bar__btn pencil" style={{marginRight: 10}} onClick={()=> toolState.setTool(new Pencil(canvasState.canvas))}/>
        </div>
    );
};

export default BrushBlock;