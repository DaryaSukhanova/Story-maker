export default class SvgTool{
    constructor(svgCanvas) {
        this.svgCanvas = svgCanvas
        this.currentStroke = 'black';
        this.currentLineWidth = '2'
        this.destroyEvents()
    }

    set svgFillStroke(color){
        console.log(color)
        this.currentStroke = color
    }
    set svgLineWidth(width){
        this.currentLineWidth = width
    }


    destroyEvents(){
        this.svgCanvas.onmousemove = null
        this.svgCanvas.onmousedown = null
        this.svgCanvas.onmouseup = null
    }
}
