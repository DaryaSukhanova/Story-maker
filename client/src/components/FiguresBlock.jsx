import React from 'react';
import toolState from "../store/toolState";
import Rect from "../tools/Rect";
import canvasState from "../store/canvasState";
import Circle from "../tools/Cirlcle";
import Eraser from "../tools/Eraser";
import Line from "../tools/Line";

const FiguresBlock = () => {
    return (
        <div>
            <button className="tool-bar__btn rect" onClick={()=> toolState.setTool(new Rect(canvasState.canvas))}/>
            <button className="tool-bar__btn circle" onClick={()=> toolState.setTool(new Circle(canvasState.canvas))}/>

            <button className="tool-bar__btn line" onClick={()=> toolState.setTool(new Line(canvasState.canvas))}/>
        </div>
    );
};

export default FiguresBlock;