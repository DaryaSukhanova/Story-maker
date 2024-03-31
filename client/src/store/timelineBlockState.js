import {action, makeAutoObservable} from "mobx";
import {useRef} from "react";

class timelineBlockState{
    keyCount = 0
    keys = []
    activeElement = null
    totalTime  = 0
    isRunningThumb = false
    elapsedTime = 0
    thumbCurrentPosition = 0
    constructor() {
        makeAutoObservable(this)


    }

    addKey(){
        this.keys.push({id: this.keyCount, name: `Key${this.keyCount}`, isActive: false, position: 0, duration: 0, rotate: 0});
        this.keyCount++
        // console.log(keys)
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

    }


    setThumbCurrentPosition(position) {
        this.thumbCurrentPosition = position;
    }

}

export default new timelineBlockState()