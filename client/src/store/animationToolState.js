import {makeAutoObservable} from "mobx";

class AnimationToolState{
    tool = null
    currentPlay = true
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
            this.currentPlay = !this.currentPlay; // Исправлено здесь
            this.tool.currentPlay = this.currentPlay;
        }
    }

}
export default new AnimationToolState()