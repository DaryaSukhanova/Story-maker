import svgToolState from "../../store/svgToolState";

export default class SvgTool {
    constructor(svgCanvas) {
        this.svgCanvas = svgCanvas;
        this.currentStroke = '#000000';
        this.currentFillColor = 'none';
        this.currentLineWidth = svgToolState.stroke;
        this.destroyEvents();

    }
    set svgFillStroke(color) {
        this.currentStroke = color;
    }
    set svgLineWidth(width) {
        this.currentLineWidth = width;
    }
    set svgFillColor(color){
        this.currentFillColor = color
    }

    // clearBoundingBox() {
    //     const boundingBoxGroup = document.getElementById("boundingBoxGroup");
    //     if (boundingBoxGroup && boundingBoxGroup.parentNode) {
    //         boundingBoxGroup.parentNode.removeChild(boundingBoxGroup);
    //     }
    // }


    destroyEvents() {
        this.svgCanvas.onmousemove = null;
        this.svgCanvas.onmousedown = null;
        this.svgCanvas.onmouseup = null;
        svgToolState.clearBoundingBox()
    }
}
