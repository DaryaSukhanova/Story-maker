import React from "react";
import SvgTool from "./SvgTool";
import {SVG} from "@svgdotjs/svg.js";
import svgToolState from "../../store/svgToolState";
import svgCanvasState from "../../store/svgCanvasState";

export default class SvgModel extends SvgTool{
    constructor(svgCanvas) {
        super(svgCanvas);
        this.svgCanvas = svgCanvas;
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
    }

    mouseDownHandler(e) {
        this.mouseDown = true;
        const svgCanvasRect = this.svgCanvas.getBoundingClientRect();
        const mouseX = e.pageX - svgCanvasRect.left;
        const mouseY = e.pageY - svgCanvasRect.top;

        // Создаем и добавляем новый path
        const newPath1 = this.DrawingCanvas.path("M178.872 248H208.536V201.969H178.872V248ZM214.632 30.7947L297.53 71.5476L238.201 118.545L214.632 30.7947Z");
        newPath1.fill("#FBC02D");
        newPath1.move(mouseX+180, mouseY+30);
        newPath1.attr({ 'data-tool': true, 'type-tool': 'path' });
        svgCanvasState.pushToSvgElements(newPath1);

        const newPath2 = this.DrawingCanvas.path("M73.8443 162.981L0.884579 232.656H60.2135L98.4213 193.131C116.309 208.229 139.151 217.313 164.039 217.313C221.381 217.313 267.865 169.226 267.865 109.907C267.865 61.252 236.584 15.0675 193.704 0V48.5321L73.8443 162.981Z");
        newPath2.fill("#916DF9");
        newPath2.move(mouseX, mouseY);
        newPath2.attr({ 'data-tool': true, 'type-tool': 'path' });
        svgCanvasState.pushToSvgElements(newPath2);

        const newPath3 = this.DrawingCanvas.path("M80.0296 157.089C91.495 164.592 104.977 169.103 119.543 169.103C160.509 169.103 193.704 134.764 193.704 92.3843V48.532L80.0296 157.089Z");
        newPath3.fill("#48377D");
        newPath3.move(mouseX+65, mouseY+65);
        newPath3.attr({ 'data-tool': true, 'type-tool': 'path' });
        svgCanvasState.pushToSvgElements(newPath3);

        const newPath4 = this.DrawingCanvas.path("M208.536 86.8913C208.536 108.081 225.133 125.25 245.616 125.25C253.744 125.25 261.205 122.473 267.316 117.886C267.509 115.231 267.865 112.623 267.865 109.907C267.865 88.2108 261.546 66.6683 250.793 48.5627C249.102 48.3326 247.367 48.532 245.616 48.532C225.133 48.532 208.536 65.7016 208.536 86.8913Z");
        newPath4.fill("#48377D");
        newPath4.move(mouseX+190, mouseY+45);
        newPath4.attr({ 'data-tool': true, 'type-tool': 'path' });
        svgCanvasState.pushToSvgElements(newPath4);


    }

    mouseMoveHandler(e) {
        super.mouseMoveHandler()
    }

}
