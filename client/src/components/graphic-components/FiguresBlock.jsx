import React from 'react';
import toolState from "../../store/toolState";
import Rect from "../../tools/graphic-tools/Rect";
import canvasState from "../../store/canvasState";
import Circle from "../../tools/graphic-tools/Cirlcle";
import Eraser from "../../tools/graphic-tools/Eraser";
import Line from "../../tools/graphic-tools/Line";
import Triangle from "../../tools/graphic-tools/Triangle";

const FiguresBlock = () => {
    return (
        <div className="figures-block-container">
            <div className="tool-bar-item-title">Фигуры</div>
            <div className="tool-bar-item">
                <button className="tool-bar__btn-tools rect" onClick={()=> toolState.setTool(new Rect(canvasState.canvas))}/>
                <button className="tool-bar__btn-tools circle" onClick={()=> toolState.setTool(new Circle(canvasState.canvas))}/>
                <button className="tool-bar__btn-tools triangle" onClick={()=> toolState.setTool(new Triangle(canvasState.canvas))}/>
                <button className="tool-bar__btn-tools line" onClick={()=> toolState.setTool(new Line(canvasState.canvas))}/>
            </div>

        </div>
    );
};

export default FiguresBlock;