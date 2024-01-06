import React from "react";
import SvgTool from "./SvgTool";
import toolState from "../store/toolState";

export default class SvgRect extends SvgTool {
    constructor(svgCanvas) {
        super(svgCanvas);
        this.svgCanvas = svgCanvas;
        this.drawingRect = null; // Текущий рисуемый прямоугольник
        this.listen();
    }

    listen() {
        this.svgCanvas.onmousemove = this.mouseMoveHandler.bind(this);
        this.svgCanvas.onmousedown = this.mouseDownHandler.bind(this);
        this.svgCanvas.onmouseup = this.mouseUpHandler.bind(this);
    }

    mouseUpHandler(e) {
        this.mouseDown = false;
        if(this.drawingRect){
            // this.getBoundingBox(this.drawingRect)
        }
        this.drawingRect = null; // Сбрасываем текущий рисуемый прямоугольник
    }

    mouseDownHandler(e) {
        const svgCanvasRect = this.svgCanvas.getBoundingClientRect();
        this.mouseDown = true;
        this.startX = e.pageX - svgCanvasRect.left;
        this.startY = e.pageY - svgCanvasRect.top;
        this.drawingRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        this.drawingRect.setAttribute("id", "svgRect");
        this.drawingRect.setAttribute("stroke", this.currentStroke);
        this.drawingRect.setAttribute("stroke-width", this.currentLineWidth);
        this.drawingRect.setAttribute("fill", this.currentFillColor);
        this.drawingRect.setAttribute('data-tool', 'true');
        this.svgCanvas.appendChild(this.drawingRect);
    }

    mouseMoveHandler(e) {
        if (this.mouseDown) {
            const svgCanvasRect = this.svgCanvas.getBoundingClientRect();
            let currentX = Math.abs(e.pageX - svgCanvasRect.left);
            let currentY = Math.abs(e.pageY - svgCanvasRect.top);
            let width = Math.abs(currentX - this.startX);
            let height = Math.abs(currentY - this.startY);
            this.drawingRect.setAttribute("x", this.startX);
            this.drawingRect.setAttribute("y", this.startY);
            this.drawingRect.setAttribute("width", width);
            this.drawingRect.setAttribute("height", height);
            this.drawingRect.setAttribute('data-tool', 'true');
        }
    }
}
