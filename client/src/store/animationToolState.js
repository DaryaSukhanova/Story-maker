import {makeAutoObservable} from "mobx";

class AnimationToolState{
    tool = null
    currentPlay = false
    newTime = 0
    startTime = Date.now()
    isAnimationSaved = false
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
        if (this.tool) {
            this.currentPlay = !this.currentPlay;
        }
    }
    setTime(time){
        // console.log(time)
        this.newTime = time
    }

    setStartTime(time) {
        this.startTime = time;
    }

}
export default new AnimationToolState()