import {makeAutoObservable} from "mobx";

class AnimationToolState{
    tool = null
    constructor() {
        makeAutoObservable(this)
    }
}
export default new AnimationToolState()