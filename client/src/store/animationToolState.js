import {makeAutoObservable} from "mobx";

class AnimationToolState{
    tool = null
    currentPlay = false
    newTime = 0

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

}
export default new AnimationToolState()