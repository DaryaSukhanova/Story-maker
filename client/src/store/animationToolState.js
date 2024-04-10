import {makeAutoObservable} from "mobx";

class AnimationToolState{
    tool = null
    currentPlay = false
    newTime = 0
    startTime = Date.now()
    isAnimationSaved = false
    isMotionCurve = false
    isRotateElement = false

    constructor() {
        makeAutoObservable(this)
    }

    setAnimationTool(tool){
        this.tool = tool
    }

    setSpeed(speed){
        if (this.tool) {
            this.tool.animationSpeed = speed
        }
    }

    setPlay() {
        this.playButton = document.getElementById('playBtn');
        if (this.tool) {
            this.currentPlay = !this.currentPlay;
            console.log("curr play in store ", this.currentPlay)
            this.playButton.className = this.currentPlay ? "btn pause-button " : "btn play-button"
        }
    }

    setStartTime(time) {
        this.startTime = time;
    }



}
export default new AnimationToolState()