import AnimationTool from "./AnimationTool";

export default class MotionCurve extends AnimationTool {
    constructor(svgCanvas) {
        super(svgCanvas);
        this.pathData = "";
        this.drawingPath = null;
        this.listen();
        this.currentPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
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
        const clickedElement = document.elementFromPoint(e.clientX, e.clientY);
        console.log('Clicked element:', clickedElement);
    }

    mouseDownHandler(e) {

        const svgCanvasRect = this.svgCanvas.getBoundingClientRect();
        const startX = e.pageX - svgCanvasRect.left;
        const startY = e.pageY - svgCanvasRect.top;


        if (!this.drawingPath) {
            this.drawingPath = this.currentPath
            this.drawingPath.setAttribute("stroke", "red");
            this.drawingPath.setAttribute("stroke-width", "2");
            this.drawingPath.setAttribute("fill", "none");
            this.svgCanvas.appendChild(this.drawingPath);
        }

        this.pathData = `M ${startX} ${startY}`;
    }

    mouseMoveHandler(e) {
        if (this.drawingPath) {
            const svgCanvasRect = this.svgCanvas.getBoundingClientRect();
            const currentX = e.pageX - svgCanvasRect.left;
            const currentY = e.pageY - svgCanvasRect.top;
            this.pathData += ` L ${currentX} ${currentY}`;
            this.updatePath();
            console.log(this.drawingPath)
        }

    }

    updatePath() {
        if (this.drawingPath) {
            this.drawingPath.setAttribute("d", this.pathData);
        }
    }
}
