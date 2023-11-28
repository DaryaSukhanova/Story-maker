import {makeAutoObservable} from "mobx";

class AnimationToolState{
    tool = null
    constructor() {
        makeAutoObservable(this)
    }
    setAnimationTool(tool){
        this.tool = tool
    }
}
export default new AnimationToolState()