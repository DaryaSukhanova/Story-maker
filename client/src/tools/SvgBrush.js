import SvgTool from "./SvgTool";

export default class SvgBrush extends SvgTool {
    constructor(svgCanvas) {
        super(svgCanvas);
        this.pathData = "";
        this.drawingPath = null;
        this.svgElement = null;
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
        this.svgElement = this.createSvgElement();
        this.drawingPath = this.createPath();
        // Добавить svg в svgCanvas сразу при начале рисования
        this.svgCanvas.appendChild(this.svgElement);
        this.svgElement.appendChild(this.drawingPath);
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

    createSvgElement() {
        const svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svgElement.setAttribute("id", "svgBrush"); // Замените "yourSvgId" на нужный id
        return svgElement;
    }

    createPath() {
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("stroke", this.currentStroke);
        path.setAttribute("stroke-width", this.currentLineWidth);
        path.setAttribute("fill", "none");
        path.setAttribute("d", this.pathData);
        return path;
    }

    updatePath() {
        if (this.drawingPath) {
            this.drawingPath.setAttribute("d", this.pathData);
        }
    }
}
