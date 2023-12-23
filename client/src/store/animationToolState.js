import {makeAutoObservable} from "mobx";

class AnimationToolState{
    tool = null
    currentPlay = true
    currentTime = 0
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

    setPlay(){
        if(this.tool){
            this.play = !this.play
            this.tool.currentPlay = this.play
        }
    }

    setTime(){
        this.currentTime = 0
    }

}
export default new AnimationToolState()