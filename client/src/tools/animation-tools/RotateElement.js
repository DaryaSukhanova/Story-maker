import AnimationTool from "./AnimationTool";
import animationToolState from "../../store/animationToolState";
import toolBlockState from "../../store/toolBlockState";


export default class RotateElement extends AnimationTool {
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
            toolBlockState.setActiveElement(this.clickedElement)
            console.log(toolBlockState.activeElement)
        }

    }

    mouseMoveHandler(e) {
    }

}

