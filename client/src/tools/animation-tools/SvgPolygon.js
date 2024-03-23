import React from "react";
import SvgTool from "./SvgTool";

export default class SvgPolygon extends SvgTool{
    constructor(svgCanvas) {
        super(svgCanvas)
        this.svgCanvas = svgCanvas;
        this.drawingPolygon = null
        this.listen();
        this.pathData = ""

    }

    listen() {
        this.svgCanvas.onmousemove = this.mouseMoveHandler.bind(this);
        this.svgCanvas.onmousedown = this.mouseDownHandler.bind(this);
        this.svgCanvas.onmouseup = this.mouseUpHandler.bind(this);
        document.addEventListener("keydown", this.keyDownHandler.bind(this));
    }

    keyDownHandler(e) {
        if (e.key === "Escape") {
            this.cancelDrawing();
        }
    }

    mouseUpHandler(e) {
        this.mouseDown = false;
        if(this.drawingPolygon){
            // this.getBoundingBox(this.drawingPolygon)
        }

    }

    mouseDownHandler(e) {
        this.mouseDown = true;
        const svgCanvasRect = this.svgCanvas.getBoundingClientRect();
        this.currentX = e.pageX - svgCanvasRect.left;
        this.currentY = e.pageY - svgCanvasRect.top;

        if (!this.drawingPolygon) {
            // Создать новую полилинию, если еще не рисуется
            this.pathData = `${this.currentX},${this.currentY}`;
            this.drawingPolygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
            this.drawingPolygon.setAttribute("stroke", this.currentStroke);
            this.drawingPolygon.setAttribute("stroke-width", this.currentLineWidth);
            this.drawingPolygon.setAttribute("fill", this.currentFillColor);
            this.drawingPolygon.setAttribute("points", this.pathData);
            this.drawingPolygon.setAttribute('data-tool', 'true');
            this.drawingPolygon.setAttribute('type-tool', 'polygon');
            this.svgCanvas.appendChild(this.drawingPolygon);
        } else {
            // Обновить существующую полилинию, если уже рисуется
            this.pathData += ` ${this.currentX},${this.currentY}`;
            this.drawingPolygon.setAttribute("points", this.pathData);
        }
    }

    mouseMoveHandler(e) {

    }
    cancelDrawing() {
        this.mouseDown = false;
        if (this.drawingPolygon) {
            this.drawingPolygon = null;
            this.pathData = "";
        }
    }

}
