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
        this.drawingCanvas = SVG(document.getElementById("drawingCanvas"))
    }

    mouseDownHandler(e) {
        this.mouseDown = true
        const svgCanvasRect = this.svgCanvas.getBoundingClientRect();
        const startX = e.pageX - svgCanvasRect.left;
        const startY = e.pageY - svgCanvasRect.top;


        this.path = this.drawingCanvas.path(`M${startX},${startY}`)

        this.path.attr({
            'data-tool': true,
            'type-tool': 'line',
            'stroke-linecap': 'round',
            fill: "none",
            stroke: this.currentStroke,
            "stroke-width": this.currentLineWidth,
            linecap: 'round',
            linejoin: 'round'
        });
        this.currentDrawingTool = this.path
    }

    mouseMoveHandler(e) {
        if (this.path && this.mouseDown) {
            const svgCanvasRect = this.svgCanvas.getBoundingClientRect();
            const currentX = e.pageX - svgCanvasRect.left;
            const currentY = e.pageY - svgCanvasRect.top;

            const d = this.path.attr('d');
            this.path.plot(d + ` L${currentX},${currentY}`);
        }
    }
}
