import svgCanvas from "../components/SvgCanvas";

import SvgTool from "./SvgTool";
export default class SvgBrush extends SvgTool{
    constructor(svgCanvas) {
        super(svgCanvas)
        this.pathData = "";
        this.drawingPath = null;
        this.listen();
    }

    listen() {
        this.svgCanvas.onmousemove = this.mouseMoveHandler.bind(this);
        this.svgCanvas.onmousedown = this.mouseDownHandler.bind(this);
        this.svgCanvas.onmouseup = this.mouseUpHandler.bind(this);
    }

    mouseUpHandler(e) {
        if (this.drawingPath) {
            this.drawingPath = null;
        }
    }

    mouseDownHandler(e) {
        this.pathData = "";
        const svgCanvasRect = this.svgCanvas.getBoundingClientRect();
        const startX = e.pageX - svgCanvasRect.left;
        const startY = e.pageY - svgCanvasRect.top;
        this.pathData = `M ${startX} ${startY}`;
        this.drawingPath = this.createPath();
    }

    mouseMoveHandler(e) {
        if (this.drawingPath) {
            const svgCanvasRect = this.svgCanvas.getBoundingClientRect();
            const currentX = e.pageX - svgCanvasRect.left;
            const currentY = e.pageY - svgCanvasRect.top;
            this.pathData += ` L ${currentX} ${currentY}`;
            this.updatePath();
        }
    }

    createPath() {
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("stroke", this.currentStroke);
        path.setAttribute("stroke-width", this.currenLineWidth);
        path.setAttribute("fill", "none");
        path.setAttribute("d", this.pathData);
        this.svgCanvas.appendChild(path);
        return path;
    }

    updatePath() {
        if (this.drawingPath) {
            this.drawingPath.setAttribute("d", this.pathData);
        }
    }
}
