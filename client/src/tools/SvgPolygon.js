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
            this.drawingPolygon.setAttribute("stroke-width", this.currenLineWidth);
            this.drawingPolygon.setAttribute("fill", "none");
            this.drawingPolygon.setAttribute("points", this.pathData);
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
    // draw(p) {
    //     this.svgCanvas.innerHTML = "";
    //     this.polygons.forEach((polygonData) =>{
    //         const polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    //         polygon.setAttribute("stroke", "black");
    //         polygon.setAttribute("stroke-width", "2");
    //         polygon.setAttribute("fill", "none");
    //         polygon.setAttribute("points", polygonData.p);
    //         this.svgCanvas.appendChild(polygon);
    //     })
    //     console.log(this.polygons)
    //     // if (this.drawingLine) {
    //         const line = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    //         line.setAttribute("stroke", "black");
    //         line.setAttribute("stroke-width", "2");
    //         line.setAttribute("fill", "none");
    //         line.setAttribute("points", p);
    //         this.svgCanvas.appendChild(line);
    //     // }
    // }
}
