import {makeAutoObservable} from "mobx";

class AnimationToolState{
    tool = null
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
}
export default new AnimationToolState()