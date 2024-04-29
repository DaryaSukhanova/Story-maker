import React from "react";
import SvgTool from "./SvgTool";
import {SVG} from "@svgdotjs/svg.js";
import svgToolState from "../../store/svgToolState";
import svgCanvasState from "../../store/svgCanvasState";

export default class SvgLine extends SvgTool{
    constructor(svgCanvas) {
        super(svgCanvas);
        this.svgCanvas = svgCanvas;
        this.drawingLine = null;
        this.listen();
        this.DrawingCanvas = SVG(document.getElementById("drawingCanvas"))
    }

    // listen() {
    //     this.svgCanvas.onmousemove = this.mouseMoveHandler.bind(this);
    //     this.svgCanvas.onmousedown = this.mouseDownHandler.bind(this);
    //     this.svgCanvas.onmouseup = this.mouseUpHandler.bind(this);
    // }

    mouseUpHandler(e) {

        this.mouseDown = false;

        if (this.drawingLine) {
            const lineData = {
                type: 'line',
                startX: this.startX,
                startY: this.startY,
                endX: this.currentX,
                endY: this.currentY,
                strokeColor: svgToolState.strokeColor,
                strokeWidth: svgToolState.stroke
            };

            svgCanvasState.pushToSvgElements(this.drawingLine);
            console.log(svgCanvasState.svgElements)
        }
        this.drawingLine = null;
    }

    mouseDownHandler(e) {
        this.mouseDown = true;
        const svgCanvasRect = this.svgCanvas.getBoundingClientRect();
        this.startX = e.pageX - svgCanvasRect.left;
        this.startY = e.pageY - svgCanvasRect.top;
        this.drawingLine = this.DrawingCanvas.line(this.startX, this.startY, this.startX, this.startY)
            .stroke({ color: this.currentStroke, width:this.currentLineWidth })
            .attr({ 'data-tool': true, 'type-tool': 'line', 'stroke-linecap': 'round' });
    }

    mouseMoveHandler(e) {
        if (this.mouseDown && this.drawingLine) {
            const svgCanvasRect = this.svgCanvas.getBoundingClientRect();
            this.currentX = e.pageX - svgCanvasRect.left;
            this.currentY = e.pageY - svgCanvasRect.top;
            this.drawingLine.plot(this.startX, this.startY, this.currentX, this.currentY);
        }
    }

}
