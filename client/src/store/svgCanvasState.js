import {makeAutoObservable} from "mobx";

class SvgCanvasState{
    canvas = null
    undoList = [] //содержит все действие,которые мы делали
    redoList = [] //содержит те действия, которые мы отменили
    backgroundName = ""
    constructor() {
        makeAutoObservable(this)
    }

    setSvgCanvas(canvas){
        this.canvas = canvas
    }

}

export default new SvgCanvasState()