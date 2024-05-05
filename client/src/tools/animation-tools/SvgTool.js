import svgToolState from "../../store/svgToolState";
import svgCanvasState from "../../store/svgCanvasState";

export default class SvgTool {
    constructor(svgCanvas) {
        this.svgCanvas = svgCanvas;
        this.currentStroke = svgToolState.strokeColor;
        this.currentFillColor = svgToolState.fillColor;
        this.currentLineWidth = svgToolState.stroke;
        this.mouseDown = false
        this.currentDrawingTool = null;
        svgToolState.tool = null
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
        if (this.mouseDown){
            console.log('MouseMove Event');
        }
    }

    mouseDownHandler(e) {
        // Заглушка
        console.log('MouseDown Event');
    }

    mouseUpHandler(e) {
        this.mouseDown = false
        if(this.currentDrawingTool){
            svgCanvasState.pushToSvgElements(this.currentDrawingTool);
            this.currentDrawingTool = null
        }
        console.log('MouseUp Event');
        console.log(svgCanvasState.svgElements)
    }
}
