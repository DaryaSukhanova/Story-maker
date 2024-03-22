import {makeAutoObservable} from "mobx";
import animationToolState from "./animationToolState";
import TimelineBlock from "../components/animation-components/TimelineBlock";
import svgToolState from "./svgToolState";
import SvgBrush from "../tools/animation-tools/SvgBrush";


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
        if(animationToolState.currentPlay){
            animationToolState.setPlay();
        }

        svgToolState.setIsDrawnSvg(false)
    };

}

export default new SvgCanvasState()