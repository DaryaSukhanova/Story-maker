import animationToolState from "../store/animationToolState";

export default class AnimationTool {
    constructor(svgCanvas) {
        this.svgCanvas = svgCanvas;
        this.currentSpeed = 20
        // this.statePlay = false
        this.destroyEvents();
        this.currentTime = 0
    }

    destroyEvents() {
        this.svgCanvas.onmousemove = null;
        this.svgCanvas.onmousedown = null;
        this.svgCanvas.onmouseup = null;

    }
    set animationSpeed(speed){
        this.currentSpeed = speed
    }
    set currentPlay(play){
        this.statePlay = play
    }

    set newTime(time){
        this.currentTime = time
    }
}