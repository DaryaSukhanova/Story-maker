import {action, makeAutoObservable} from "mobx";
import {useRef} from "react";

class timelineBlockState{
    constructor() {
        makeAutoObservable(this)
        this.keyCount = 0
        this.keys = []
        this.activeElement = null
        this.totalTime  = 0
        this.isRunningThumb = false
        this.elapsedTime = 0
        this.thumbCurrentPosition = 0

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
        console.log(this.elapsedTime)
    }


    setThumbCurrentPosition(position) {
        this.thumbCurrentPosition = position;
    }

}

export default new timelineBlockState()