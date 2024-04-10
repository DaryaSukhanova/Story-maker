import React from "react";
import SvgTool from "./SvgTool";
import svgToolState from "../../store/svgToolState";
import svgCanvasState from "../../store/svgCanvasState";

export default class SvgPolyline extends SvgTool {
    constructor(svgCanvas) {
        super(svgCanvas);
        this.svgCanvas = svgCanvas;
        this.drawingPolyline = null;
        this.listen();
        this.pathData = "";
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
            if(this.drawingPolyline){
                svgCanvasState.pushToSvgElements(this.drawingPolyline);
            }
        }
    }

    mouseUpHandler(e) {
        this.mouseDown = false;

    }

    mouseDownHandler(e) {
        this.mouseDown = true;
        const svgCanvasRect = this.svgCanvas.getBoundingClientRect();
        this.currentX = e.pageX - svgCanvasRect.left;
        this.currentY = e.pageY - svgCanvasRect.top;

        if (!this.drawingPolyline) {
            // Создать новую полилинию, если еще не рисуется
            this.pathData = `${this.currentX},${this.currentY}`;
            this.drawingPolyline = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
            this.drawingPolyline.setAttribute("stroke", svgToolState.strokeColor);
            this.drawingPolyline.setAttribute("stroke-width", svgToolState.stroke);
            this.drawingPolyline.setAttribute("fill", svgToolState.fillColor);
            this.drawingPolyline.setAttribute("points", this.pathData);
            this.drawingPolyline.setAttribute('data-tool', 'true');
            this.drawingPolyline.setAttribute('type-tool', 'polyline');
            this.svgCanvas.appendChild(this.drawingPolyline);

        } else {
            // Обновить существующую полилинию, если уже рисуется
            this.pathData += ` ${this.currentX},${this.currentY}`;
            this.drawingPolyline.setAttribute("points", this.pathData);
        }
    }

    mouseMoveHandler(e) {
        // Обработать движение мыши, если необходимо
    }

    cancelDrawing() {
        this.mouseDown = false;
        if (this.drawingPolyline) {
            this.drawingPolyline = null;
            this.pathData = "";
        }
    }
}
