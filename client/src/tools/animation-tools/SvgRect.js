import React from "react";
import SvgTool from "./SvgTool";
import toolState from "../../store/toolState";
import svgToolState from "../../store/svgToolState";
import svgCanvasState from "../../store/svgCanvasState";
import { SVG } from "@svgdotjs/svg.js";

export default class SvgRect extends SvgTool {
    constructor(svgCanvas) {
        super(svgCanvas);
        this.svgCanvas = svgCanvas;
        this.drawingRect = null;
        this.listen();
        this.drawingCanvas = SVG(this.svgCanvas).group();
    }

    mouseDownHandler(e) {
        const svgCanvasRect = this.svgCanvas.getBoundingClientRect();
        this.startX = e.pageX - svgCanvasRect.left;
        this.startY = e.pageY - svgCanvasRect.top;
        this.mouseDown = true;

        this.drawingRect = this.drawingCanvas.rect()
            .size(0, 0)
            .attr({
                x: this.startX,
                y: this.startY,
                fill: svgToolState.fillColor,
                stroke: svgToolState.strokeColor,
                'data-tool': 'true',
                'type-tool': 'rect'
            })
        this.currentDrawingTool = this.drawingRect
    }

    mouseMoveHandler(e) {
        if (this.mouseDown && this.drawingRect) {
            const svgCanvasRect = this.svgCanvas.getBoundingClientRect();
            let currentX = e.pageX - svgCanvasRect.left;
            let currentY = e.pageY - svgCanvasRect.top;
            let width = Math.max(0, currentX - this.startX);
            let height = Math.max(0, currentY - this.startY);

            if (width && height) {
                this.drawingRect.width(width).height(height);
            }
        }
    }

    mouseUpHandler(e) {
        this.mouseDown = false;
        if (this.drawingRect) {
            svgCanvasState.pushToSvgElements(this.drawingRect);
            this.drawingRect = null;
        }
    }
}