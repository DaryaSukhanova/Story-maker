import animationToolState from "../../store/animationToolState";
import svgToolState from "../../store/svgToolState";

export default class AnimationTool {
    constructor(svgCanvas) {
        this.svgCanvas = svgCanvas;
        this.currentSpeed = 20
        // this.statePlay = false
        this.destroyEvents();
        this.currentTime = 0
        this.currentName = null
        this.destroyEvents();
    }

    destroyEvents() {
        console.log("destroy")
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