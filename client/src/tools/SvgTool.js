export default class SvgTool{
    constructor(svgCanvas) {
        this.svgCanvas = svgCanvas
        this.currentStroke = 'black';
        this.currenLineWidth = '2'
        this.destroyEvents()

    }

    set fillStroke(color){
        this.currentStroke = color
    }
    set lineWidth(width){
        this.currenLineWidth = width
    }


    destroyEvents(){
        this.svgCanvas.onmousemove = null
        this.svgCanvas.onmousedown = null
        this.svgCanvas.onmouseup = null
    }
}
