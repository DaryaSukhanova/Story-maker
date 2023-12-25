import animationToolState from "../store/animationToolState";

export default class AnimationTool {
    constructor(svgCanvas) {
        this.svgCanvas = svgCanvas;
        this.currentSpeed = 20
        // this.statePlay = false
        this.destroyEvents();
    }

    destroyEvents() {
        this.svgCanvas.onmousemove = null;
        this.svgCanvas.onmousedown = null;
        this.svgCanvas.onmouseup = null;

    }
    set animationSpeed(speed){
        this.currentSpeed = speed
        console.log("speed",this.currentSpeed)
    }
    set currentPlay(play){
        this.statePlay = play
    }
}