import React from "react";
import SvgTool from "./SvgTool";
import svgToolState from "../../store/svgToolState";
import svgCanvasState from "../../store/svgCanvasState";
import {SVG} from "@svgdotjs/svg.js";

export default class SvgPolygon extends SvgTool {
    constructor(svgCanvas) {
        super(svgCanvas);
        this.svgCanvas = svgCanvas;
        this.drawingPolygon = null;
        this.pathData = [];
        this.listen();
        this.drawingCanvas = SVG(this.svgCanvas).group(); // Создаем группу для управления всеми элементами
    }

    // listen() {
    //     this.svgCanvas.addEventListener('mousemove', this.mouseMoveHandler.bind(this));
    //     this.svgCanvas.addEventListener('mousedown', this.mouseDownHandler.bind(this));
    //     this.svgCanvas.addEventListener('mouseup', this.mouseUpHandler.bind(this));
    //     document.addEventListener("keydown", this.keyDownHandler.bind(this));
    // }
    listen() {
        super.listen(); // Вызов родительского метода listen
        this.boundKeyDownHandler = this.keyDownHandler.bind(this);
        document.addEventListener("keydown", this.boundKeyDownHandler);
    }
    keyDownHandler(e) {
        if (e.key === "Escape") {
            this.cancelDrawing();
        }
    }

    // mouseUpHandler(e) {
    //     this.mouseDown = false;
    // }

    mouseDownHandler(e) {

        const svgCanvasRect = this.svgCanvas.getBoundingClientRect();
        const x = e.pageX - svgCanvasRect.left;
        const y = e.pageY - svgCanvasRect.top;

        if (!this.drawingPolygon) {
            // Создаем новый полигон, если ранее он не был создан
            this.pathData.push([x, y]);

            this.drawingPolygon = this.drawingCanvas.polygon(this.pathData)
                .attr({
                    'data-tool': 'true',
                    'type-tool': 'polygon',
                    fill: this.currentFillColor,
                    stroke: this.currentStroke,
                    "stroke-width": this.currentLineWidth,
                });
            this.currentDrawingTool = this.drawingPolygon
        } else {
            // Добавляем точки к полигону, если он уже рисуется
            this.pathData.push([x, y]);
            this.drawingPolygon.plot(this.pathData);
        }
    }

    mouseMoveHandler(e) {

    }
    destroyEvents() {
        super.destroyEvents(); // Удаляем события мыши, установленные в базовом классе
        document.removeEventListener("keydown", this.boundKeyDownHandler); // Удаляем обработчик событий клавиатуры
    }

    cancelDrawing() {
        if (this.drawingPolygon) {
            svgCanvasState.pushToSvgElements(this.drawingPolygon);
            this.drawingPolygon = null;
            this.pathData = [];
        }
    }
}
