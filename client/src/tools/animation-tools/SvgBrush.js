import svgCanvas from "../../components/animation-components/SvgCanvas";

import SvgTool from "./SvgTool";
import svgToolState from "../../store/svgToolState";
import svgCanvasState from "../../store/svgCanvasState";
import {SVG} from "@svgdotjs/svg.js";
export default class SvgBrush extends SvgTool {
    constructor(svgCanvas) {
        super(svgCanvas);
        this.path = null;
        this.listen();
        this.drawingCanvas = SVG(document.getElementById("drawingCanvas")).group();
    }

    // listen() {
    //     this.svgCanvas.addEventListener('mousemove', this.mouseMoveHandler.bind(this));
    //     this.svgCanvas.addEventListener('mousedown', this.mouseDownHandler.bind(this));
    //     this.svgCanvas.addEventListener('mouseup', this.mouseUpHandler.bind(this));
    // }

    mouseUpHandler(e) {
        if (this.path) {
            svgCanvasState.pushToSvgElements(this.path);
            this.path = null;
        }
    }

    mouseDownHandler(e) {
        const svgCanvasRect = this.svgCanvas.getBoundingClientRect();
        const startX = e.pageX - svgCanvasRect.left;
        const startY = e.pageY - svgCanvasRect.top;

        this.path = this.drawingCanvas.path(`M${startX},${startY}`)
            .stroke({
                color: this.currentStroke,
                width: this.currentLineWidth,
                linecap: 'round',
                linejoin: 'round'
            })
            .fill('none');
        this.currentDrawingTool = this.path
    }

    mouseMoveHandler(e) {
        if (this.path) {
            const svgCanvasRect = this.svgCanvas.getBoundingClientRect();
            const currentX = e.pageX - svgCanvasRect.left;
            const currentY = e.pageY - svgCanvasRect.top;

            // Append new line segment to the path
            const d = this.path.attr('d');
            this.path.plot(d + ` L${currentX},${currentY}`);
        }
    }


}
