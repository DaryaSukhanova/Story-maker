import {action, makeAutoObservable} from "mobx";
import {useRef} from "react";

class timelineBlockState{
    keyCount = 0
    // keys = []
    activeElement = null
    totalTime  = 0
    isRunningThumb = false
    elapsedTime = 0
    thumbCurrentPosition = 0
    thumbEndPosition = 0
    roundedElapsedTime = 0
    activeTimeline = null
    constructor() {
        makeAutoObservable(this)
    }

    setActiveElement(element){
        this.activeElement = element
    }
    setTotalTime(time){
        this.totalTime = time
    }
    setIsRunningThumb(isRunning){
        this.isRunningThumb = isRunning
    }
    setElapsedTime(time){
        this.elapsedTime = time;
        this.setThumbCurrentPosition((time / 1000) * 150);
        this.setRoundedElapsedTime(time)
    }
    setRoundedElapsedTime(time){
        this.roundedElapsedTime = Math.ceil(time / 100) * 100
    }

    setThumbCurrentPosition(position) {
        this.thumbCurrentPosition = position;
    }

    setThumbEndPosition(position){
        this.thumbEndPosition = position
    }

    setActiveTimeline(timelineId) {
        this.activeTimeline = timelineId;
    }

}

export default new timelineBlockState()