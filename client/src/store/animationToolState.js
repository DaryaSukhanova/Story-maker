import {makeAutoObservable} from "mobx";
import svgToolState from "./svgToolState";

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

    get currentTool() {
        return this.tool;
    }

    setSpeed(speed){
        if (this.tool) {
            this.tool.animationSpeed = speed
        }
    }
    setAnimationTool(tool) {
        if (svgToolState.tool) {
            svgToolState.clearActiveTool();  // Сброс текущего SVG инструмента

        }
        this.tool = tool;
        this.tool.listen();  // Активация событий нового инструмента анимации
    }

    clearActiveTool() {
        if (this.tool) {
            this.tool.destroyEvents();  // Очистка событий текущего инструмента анимации
        }
        this.tool = null;
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