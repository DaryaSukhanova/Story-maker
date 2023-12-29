import {makeAutoObservable} from "mobx";
import animationToolState from "./animationToolState";
import TimelineBlock from "../components/TimelineBlock";


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
    handleClearCanvas = () => {
        this.canvas.innerHTML = '';
        animationToolState.currentPlay = false

    };

}

export default new SvgCanvasState()