import React from "react";
import SvgTool from "./SvgTool";

export default class SvgLine extends SvgTool{
    constructor(svgCanvas) {
        super(svgCanvas)
        this.svgCanvas = svgCanvas;
        this.drawingLine = null;
        this.listen();

    }

    listen() {
        this.svgCanvas.onmousemove = this.mouseMoveHandler.bind(this);
        this.svgCanvas.onmousedown = this.mouseDownHandler.bind(this);
        this.svgCanvas.onmouseup = this.mouseUpHandler.bind(this);
    }

    mouseUpHandler(e) {
        this.mouseDown = false;
        // if (this.drawingLine) {
        //     this.lines.push(this.drawingLine);
        //     console.log(this.drawingLine)
        //     this.drawingLine = null;
        // }
        if(this.drawingLine){
            // this.getBoundingBox(this.drawingLine)
        }
        this.drawingLine = null

    }

    mouseDownHandler(e) {
        this.mouseDown = true;
        this.pathData = "";
        const svgCanvasRect = this.svgCanvas.getBoundingClientRect();
        this.startX = e.pageX - svgCanvasRect.left;
        this.startY = e.pageY - svgCanvasRect.top;
        this.pathData = `M ${this.startX} ${this.startY}`;
        this.drawingLine = {d: this.pathData}
        this.drawingLine = document.createElementNS("http://www.w3.org/2000/svg", "path");
        this.drawingLine.setAttribute("stroke", this.currentStroke);
        this.drawingLine.setAttribute("stroke-width", this.currentLineWidth);
        this.drawingLine.setAttribute("fill", "none");
        this.drawingLine.setAttribute('data-tool', 'true');
        this.drawingLine.setAttribute('type-tool', 'line');
        this.svgCanvas.appendChild(this.drawingLine)
        // this.draw(this.drawingLine.d);
    }

    mouseMoveHandler(e) {
        if(this.mouseDown){
            const svgCanvasRect = this.svgCanvas.getBoundingClientRect();
            const currentX = e.pageX - svgCanvasRect.left;
            const currentY = e.pageY - svgCanvasRect.top;
            this.pathData = `M ${this.startX} ${this.startY} L ${currentX} ${currentY}`;
            // this.drawingLine = {d: this.pathData}
            this.drawingLine.setAttribute("d", this.pathData);
            // this.draw(this.drawingLine.d);
            // console.log(this.drawingLine)
        }
    }
    draw(d) {
        this.svgCanvas.innerHTML = "";
        this.lines.forEach((lineData) =>{
            const line = document.createElementNS("http://www.w3.org/2000/svg", "path");
            line.setAttribute("stroke", "black");
            line.setAttribute("stroke-width", "2");
            line.setAttribute("fill", "none");
            line.setAttribute("d", lineData.d);
            line.setAttribute('data-tool', 'true');
            this.svgCanvas.appendChild(line);
        })
        if (this.drawingLine) {
            const line = document.createElementNS("http://www.w3.org/2000/svg", "path");
            line.setAttribute("stroke", "black");
            line.setAttribute("stroke-width", "2");
            line.setAttribute("fill", "none");
            line.setAttribute("d", d);
            line.setAttribute('data-tool', 'true');
            this.svgCanvas.appendChild(line);
        }
    }
}
