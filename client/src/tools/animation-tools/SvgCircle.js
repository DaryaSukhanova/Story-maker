import {SVG} from "@svgdotjs/svg.js";
import SvgTool from "./SvgTool";
import canvas from "../../components/graphic-components/Canvas";
import svgToolState from "../../store/svgToolState";
import svgCanvasState from "../../store/svgCanvasState";

export default class SvgCircle extends SvgTool {
    constructor(svgCanvas) {
        super(svgCanvas);
        this.svgCanvas = svgCanvas;
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
        if (this.drawingCircle) {
            svgCanvasState.pushToSvgElements(this.drawingCircle);
        }
        this.drawingCircle = null;
    }

    mouseDownHandler(e) {
        const svgCanvasRect = this.svgCanvas.getBoundingClientRect();
        this.mouseDown = true;
        this.startX = e.pageX - svgCanvasRect.left;
        this.startY = e.pageY - svgCanvasRect.top;
        this.drawingCircle = this.DrawingCanvas.circle();
        this.currentDrawingTool = this.drawingCircle.attr({
            id: "svgCircle",
            fill: this.currentFillColor,
            stroke: this.currentStroke,
            "stroke-width": this.currentLineWidth,
            "data-tool": true,
            "type-tool": "circle",
        });
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

}

