import {makeAutoObservable} from "mobx";
import animationToolState from "./animationToolState";
import TimelineBlock from "../components/animation-components/TimelineBlock";
import svgToolState from "./svgToolState";
import SvgBrush from "../tools/animation-tools/SvgBrush";
import timelineBlockState from "./timelineBlockState";
import KeyFrameManager from "../tools/animation-tools/KeyFrameManager";


class SvgCanvasState{
    canvas = null
    undoList = [] //содержит все действие,которые мы делали
    redoList = [] //содержит те действия, которые мы отменили
    backgroundName = ""
    svgElements = []
    constructor() {
        makeAutoObservable(this)
    }
    pushToSvgElements(element) {
        const svgElementWrapper = {
            svgElement: element,
            isAnimated: false
        };
        this.svgElements.push(svgElementWrapper);
        console.log(this.svgElements)
        // Добавляем обработчик события клика для каждого элемента
        element.on('click', () => {
            // Выполняем действия при клике на элемент
            timelineBlockState.setActiveElement(svgElementWrapper);
            console.log(this.svgElements);
        });
    }
    setSvgElements(arr){
        this.svgElements = arr
    }

    setSvgCanvas(canvas){
        this.canvas = canvas
    }

    handleClearCanvas = () => {
        this.canvas.innerHTML = '';
        svgToolState.svgElements = [];
        svgToolState.setIsDrawnSvg(false)
        timelineBlockState.setIsRunningThumb(false)
        timelineBlockState.setTotalTime(0)
        timelineBlockState.setThumbEndPosition(0)
        timelineBlockState.setThumbCurrentPosition(0)
        timelineBlockState.setElapsedTime(0)

        const keyframeManager = new KeyFrameManager(this.canvas);
        if (keyframeManager) {
            keyframeManager.stopAnimations();
        }
    };

}

export default new SvgCanvasState()