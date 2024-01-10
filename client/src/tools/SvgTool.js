export default class SvgTool {
    constructor(svgCanvas) {
        this.svgCanvas = svgCanvas;
        this.currentStroke = '#000000';
        this.currentFillColor = 'none';
        this.currentLineWidth = '2';
        // this.boundingBoxRect = null
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



    destroyEvents() {

        this.svgCanvas.onmousemove = null;
        this.svgCanvas.onmousedown = null;
        this.svgCanvas.onmouseup = null;
    }
}
