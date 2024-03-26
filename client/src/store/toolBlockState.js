import {makeAutoObservable} from "mobx";
import {useRef} from "react";

class toolBlockState{
    constructor() {
        makeAutoObservable(this)
        this.keyCount = 0
        this.keys = []
        this.activeElement = null

    }

    addKey(){
        this.keys.push({id: this.keyCount, name: `Key${this.keyCount}`, isActive: false, position: 0, duration: 0, rotate: 0});
        this.keyCount++
        // console.log(keys)
    }
    setActiveElement(element){
        this.activeElement = element
    }
}

export default new toolBlockState()