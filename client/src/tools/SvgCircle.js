import SvgTool from "./SvgTool";

export default class SvgCircle extends SvgTool{
    constructor(svgCanvas) {
        super(svgCanvas)
        this.svgCanvas = svgCanvas;
        this.circles = []; // Массив для хранения всех нарисованных прямоугольников
        this.listen();

    }

    listen() {
        this.svgCanvas.onmousemove = this.mouseMoveHandler.bind(this);
        this.svgCanvas.onmousedown = this.mouseDownHandler.bind(this);
        this.svgCanvas.onmouseup = this.mouseUpHandler.bind(this);
    }

    mouseUpHandler(e) {
        this.mouseDown = false;
        this.drawingCircle = null;
    }

    mouseDownHandler(e) {
        const svgCanvasRect = this.svgCanvas.getBoundingClientRect();
        this.mouseDown = true;
        this.startX = e.pageX - svgCanvasRect.left;
        this.startY = e.pageY - svgCanvasRect.top;
        this.drawingCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        this.drawingCircle.setAttribute("id", "svgCircle");
        this.drawingCircle.setAttribute("fill", "none");
        this.drawingCircle.setAttribute("stroke", this.currentStroke);
        this.drawingCircle.setAttribute("stroke-width", this.currentLineWidth);
        this.svgCanvas.appendChild(this.drawingCircle)
        // this.drawingCircle = { x: this.startX, y: this.startY, r: 0 };
        // this.draw(this.drawingCircle.x, this.drawingCircle.y, this.drawingCircle.r);
    }

    mouseMoveHandler(e) {
        if (this.mouseDown) {
            const svgCanvasRect = this.svgCanvas.getBoundingClientRect();
            let currentX = Math.abs(e.pageX - svgCanvasRect.left);
            let currentY = Math.abs(e.pageY - svgCanvasRect.top);
            let width = Math.abs(currentX - this.startX);
            let height = Math.abs(currentY - this.startY);
            this.radius = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2))
            // this.drawingCircle = { x: this.startX, y: this.startY, r: this.radius };
            // this.draw(this.drawingCircle.x, this.drawingCircle.y, this.radius);
            this.drawingCircle.setAttribute("cx", this.startX);
            this.drawingCircle.setAttribute("cy", this.startY);
            this.drawingCircle.setAttribute("r", this.radius);
        }
    }

    draw(x, y, r) {
        this.svgCanvas.innerHTML = ""; // Очищаем холст

        this.circles.forEach((circleData) => {
            const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            circle.setAttribute("id", "svgCircle");
            circle.setAttribute("cx", circleData.x);
            circle.setAttribute("cy", circleData.y);
            circle.setAttribute("r", circleData.r);
            circle.setAttribute("fill", "none");
            circle.setAttribute("stroke", this.currentStroke);
            circle.setAttribute("stroke-width", this.currentLineWidth);
            this.svgCanvas.appendChild(circle);
        });

        if (this.drawingCircle) {
            // Рисуем текущий прямоугольник, который еще не был добавлен в массив
            const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            circle.setAttribute("id", "svgCircle");
            circle.setAttribute("cx", x);
            circle.setAttribute("cy", y);
            circle.setAttribute("r", r);
            circle.setAttribute("fill", "none");
            circle.setAttribute("stroke", this.currentStroke);
            circle.setAttribute("stroke-width", this.currentLineWidth);
            this.svgCanvas.appendChild(circle);
        }
    }
}
