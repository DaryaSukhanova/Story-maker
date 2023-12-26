import {makeAutoObservable} from "mobx";

class AnimationToolState{
    tool = null
    currentPlay = true

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
        this.tool.newTime = time
    }

}
export default new AnimationToolState()