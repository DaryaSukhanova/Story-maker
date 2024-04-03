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
    thumbEndPosition = 0
    roundedElapsedTime = 0
    constructor() {
        makeAutoObservable(this)
    }

    addKey(){
        this.keys.push({
            id: this.keyCount,
            name: `Key${this.keyCount}`,
            isActive: false,
            position: 0,
            duration: 0,
            rotate: 0,
            scaleX: 1,
            scaleY: 1,
            translateX: 0,
            translateY: 0,
            skewX: 0,
            skewY: 0
        });
        this.keyCount++
        // console.log(keys)
    }
    setKeys(arr){
        this.keys = arr
    }
    setActiveElement(element){
        this.activeElement = element
        console.log("this.activeElement", this.activeElement)
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

}

export default new timelineBlockState()