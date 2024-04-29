import svgToolState from "../../store/svgToolState";

export default class SvgTool {
    constructor(svgCanvas) {
        this.svgCanvas = svgCanvas;
        this.currentStroke = svgToolState.strokeColor;
        this.currentFillColor = svgToolState.fillColor;
        this.currentLineWidth = svgToolState.stroke;
        this.destroyEvents();

    }
    set svgFillStroke(color) {
        svgToolState.strokeColor = color
        this.currentStroke = color;
    }
    set svgLineWidth(width) {
        svgToolState.stroke = width
        this.currentLineWidth = width;
    }
    set svgFillColor(color){
        svgToolState.fillColor = color
        this.currentFillColor = color
    }

    // clearBoundingBox() {
    //     const boundingBoxGroup = document.getElementById("boundingBoxGroup");
    //     if (boundingBoxGroup && boundingBoxGroup.parentNode) {
    //         boundingBoxGroup.parentNode.removeChild(boundingBoxGroup);
    //     }
    // }

    listen() {
        this.svgCanvas.onmousemove = this.mouseMoveHandler.bind(this);
        this.svgCanvas.onmousedown = this.mouseDownHandler.bind(this);
        this.svgCanvas.onmouseup = this.mouseUpHandler.bind(this);
    }

    destroyEvents() {
        this.svgCanvas.onmousemove = null;
        this.svgCanvas.onmousedown = null;
        this.svgCanvas.onmouseup = null;
        svgToolState.clearBoundingBox()
    }

    mouseMoveHandler(e) {
        // Заглушка: переопределите в наследуемых классах
        console.log('MouseMove Event');
    }

    mouseDownHandler(e) {
        // Заглушка: переопределите в наследуемых классах
        console.log('MouseDown Event');
    }

    mouseUpHandler(e) {
        // Заглушка: переопределите в наследуемых классах
        console.log('MouseUp Event');
    }
}
