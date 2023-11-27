export default class AnimationTool{
    constructor(svgCanvas) {
        this.svgCanvas = svgCanvas
        this.destroyEvents()
    }
    destroyEvents(){
        this.svgCanvas.onmousemove = null
        this.svgCanvas.onmousedown = null
        this.svgCanvas.onmouseup = null
    }
}