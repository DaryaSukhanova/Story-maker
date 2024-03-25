import {makeAutoObservable} from "mobx";
import {useRef} from "react";

class toolBlockState{
    constructor() {
        makeAutoObservable(this)
        this.keyCount = 0
        this.keys = []

    }

    addKey(){
        this.keys.push({id: this.keyCount, name: `Key${this.keyCount}`, isActive: false, position: 0, duration: 0});
        this.keyCount++
        // console.log(keys)
    }
}

export default new toolBlockState()