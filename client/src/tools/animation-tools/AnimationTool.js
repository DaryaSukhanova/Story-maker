import animationToolState from "../../store/animationToolState";
import svgToolState from "../../store/svgToolState";
import svgCanvasState from "../../store/svgCanvasState";

export default class AnimationTool {
    constructor(svgCanvas) {
        this.svgCanvas = svgCanvas;
        this.currentSpeed = 20
        animationToolState.tool = null
        this.destroyEvents();
    }
    listen() {
        // this.svgCanvas.onmousemove = this.mouseMoveHandler.bind(this);
        this.svgCanvas.onmousedown = this.mouseDownHandler.bind(this);
        this.svgCanvas.onmouseup = this.mouseUpHandler.bind(this);
    }

    // mouseMoveHandler(e) {
    //     // Заглушка
    //     console.log('MouseMove Event');
    // }

    mouseDownHandler(e) {
        // Заглушка
        console.log('MouseDown Event');
    }

    mouseUpHandler(e) {
        console.log('MouseUp Event');
    }

    destroyEvents() {
        this.svgCanvas.onmousemove = null;
        this.svgCanvas.onmousedown = null;
        this.svgCanvas.onmouseup = null;

    }
    set animationSpeed(speed){
        this.currentSpeed = speed
    }

    set animationName(name){
        this.currentName = name
    }

}