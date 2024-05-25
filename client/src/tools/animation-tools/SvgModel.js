import React from "react";
import SvgTool from "./SvgTool";
import { SVG } from "@svgdotjs/svg.js";
import svgToolState from "../../store/svgToolState";
import svgCanvasState from "../../store/svgCanvasState";

export default class SvgModel extends SvgTool {
    constructor(svgCanvas) {
        super(svgCanvas);
        this.svgCanvas = svgCanvas;
        this.listen();
        this.DrawingCanvas = SVG(document.getElementById("drawingCanvas"));
    }

    listen() {
        this.svgCanvas.onmousemove = this.mouseMoveHandler.bind(this);
        this.svgCanvas.onmousedown = this.mouseDownHandler.bind(this);
        this.svgCanvas.onmouseup = this.mouseUpHandler.bind(this);
    }

    mouseUpHandler(e) {
        this.mouseDown = false;
    }

    mouseDownHandler(e) {
        this.mouseDown = true;
        const svgCanvasRect = this.svgCanvas.getBoundingClientRect();
        const mouseX = e.pageX - svgCanvasRect.left;
        const mouseY = e.pageY - svgCanvasRect.top;

        
        const offsetX1 = 0;
        const offsetY1 = 0;

        const offsetX2 = -95; 
        const offsetY2 = -15;

        const offsetX3 = -55;
        const offsetY3 = 10;

        const offsetX4 = 2;
        const offsetY4 = 2;

        const newPath1 = this.DrawingCanvas.path("M87.5577 122H102.151V99.3557H87.5577V122ZM105.15 15.149L145.93 35.1968L116.744 58.3166L105.15 15.149Z");
        newPath1.fill("#FBC02D");
        newPath1.move(mouseX + offsetX1, mouseY + offsetY1);
        newPath1.attr({ 'data-tool': true, 'type-tool': 'path' });
        svgCanvasState.pushToSvgElements(newPath1);

        const newPath2 = this.DrawingCanvas.path("M35.8914 80.176L-0.000106812 114.452H29.1859L47.9817 95.008C56.7813 102.435 68.0179 106.904 80.2614 106.904C108.47 106.904 131.337 83.2481 131.337 54.0671C131.337 30.132 115.949 7.41224 94.8544 0V23.8747L35.8914 80.176Z");
        newPath2.fill("#916DF9");
        newPath2.move(mouseX + offsetX2, mouseY + offsetY2);
        newPath2.attr({ 'data-tool': true, 'type-tool': 'path' });
        svgCanvasState.pushToSvgElements(newPath2);

        const newPath3 = this.DrawingCanvas.path("M38.9341 77.2775C44.5743 80.9685 51.2068 83.1876 58.372 83.1876C78.5249 83.1876 94.8545 66.295 94.8545 45.4471V23.8746L38.9341 77.2775Z");
        newPath3.fill("#48377D");
        newPath3.move(mouseX + offsetX3, mouseY + offsetY3);
        newPath3.attr({ 'data-tool': true, 'type-tool': 'path' });
        svgCanvasState.pushToSvgElements(newPath3);

        const newPath4 = this.DrawingCanvas.path("M102.151 42.7449C102.151 53.1689 110.316 61.6152 120.392 61.6152C124.391 61.6152 128.061 60.249 131.067 57.9921C131.162 56.6863 131.337 55.4031 131.337 54.0671C131.337 43.3941 128.229 32.7965 122.939 23.8898C122.107 23.7765 121.253 23.8747 120.392 23.8747C110.316 23.8747 102.151 32.321 102.151 42.7449Z");
        newPath4.fill("#48377D");
        newPath4.move(mouseX + offsetX4, mouseY + offsetY4);
        newPath4.attr({ 'data-tool': true, 'type-tool': 'path' });
        svgCanvasState.pushToSvgElements(newPath4);
    }

    mouseMoveHandler(e) {
        super.mouseMoveHandler();
    }
}
