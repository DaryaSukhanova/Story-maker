import {SVG} from "@svgdotjs/svg.js";
import SvgTool from "./SvgTool";
import {logDOM} from "@testing-library/react";
import canvas from "../../components/graphic-components/Canvas";
import svgToolState from "../../store/svgToolState";

export default class SvgCircle extends SvgTool {
    constructor(svgCanvas) {
        super(svgCanvas);
        this.svgCanvas = svgCanvas;
        this.circles = [];
        this.listen();
        this.DrawingCanvas = SVG(document.getElementById("drawingCanvas"))
    }

    listen() {
        this.svgCanvas.onmousemove = this.mouseMoveHandler.bind(this);
        this.svgCanvas.onmousedown = this.mouseDownHandler.bind(this);
        this.svgCanvas.onmouseup = this.mouseUpHandler.bind(this);
    }

    mouseUpHandler(e) {
        this.mouseDown = false;
        if (this.drawingCircle) {
            // this.getBoundingBox(this.drawingCircle)
        }
        this.drawingCircle = null;
    }

    mouseDownHandler(e) {
        const svgCanvasRect = this.svgCanvas.getBoundingClientRect();
        this.mouseDown = true;
        this.startX = e.pageX - svgCanvasRect.left;
        this.startY = e.pageY - svgCanvasRect.top;
        this.drawingCircle = this.DrawingCanvas.circle();
        this.drawingCircle.attr({
            id: "svgCircle",
            fill: svgToolState.fillColor,
            stroke: svgToolState.strokeColor,
            "stroke-width": svgToolState.stroke,
            "data-tool": true,
            "type-tool": "circle",
        });
        console.log(this.currentLineWidth)
    }

    mouseMoveHandler(e) {
        if (this.mouseDown) {
            const svgCanvasRect = this.svgCanvas.getBoundingClientRect();
            let currentX = Math.abs(e.pageX - svgCanvasRect.left);
            let currentY = Math.abs(e.pageY - svgCanvasRect.top);
            let width = Math.abs(currentX - this.startX);
            let height = Math.abs(currentY - this.startY);
            this.radius = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
            this.drawingCircle.center(this.startX, this.startY).radius(this.radius);
        }
    }

    // draw(x, y, r) {
    //     this.DrawingCanvas.clear(); // Очищаем холст
    //
    //     this.circles.forEach((circleData) => {
    //         const circle = this.svgCanvas.circle(circleData.r * 2);
    //         circle.attr({
    //             id: "svgCircle",
    //             cx: circleData.x,
    //             cy: circleData.y,
    //             fill: "none",
    //             stroke: this.currentStroke,
    //             "stroke-width": this.currentLineWidth,
    //         });
    //     });
    //
    //     if (this.drawingCircle) {
    //         const circle = this.svgCanvas.circle(r * 2);
    //         circle.attr({
    //             id: "svgCircle",
    //             cx: x,
    //             cy: y,
    //             fill: "none",
    //             stroke: this.currentStroke,
    //             "stroke-width": this.currentLineWidth,
    //         });
    //     }
    // }
}
