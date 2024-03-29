import AnimationTool from "./AnimationTool";
import animationToolState from "../../store/animationToolState";
import timelineBlockState from "../../store/timelineBlockState";


export default class KeyFrames extends AnimationTool {
    constructor(svgCanvas) {
        super(svgCanvas);
        this.listen();
    }

    listen() {
        this.svgCanvas.onmousemove = this.mouseMoveHandler.bind(this);
        this.svgCanvas.onmousedown = this.mouseDownHandler.bind(this);
        this.svgCanvas.onmouseup = this.mouseUpHandler.bind(this);
    }

    mouseUpHandler(e) {

    }

    mouseDownHandler(e) {
        this.clickedElement = document.elementFromPoint(e.clientX, e.clientY);
        if(this.clickedElement.getAttribute('data-tool') === 'true'){
            console.log(this.clickedElement);
            timelineBlockState.setActiveElement(this.clickedElement)
            console.log(timelineBlockState.activeElement)
        }

    }

    mouseMoveHandler(e) {
    }

}

