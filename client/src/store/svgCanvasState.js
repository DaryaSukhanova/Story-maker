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
        if (!this.canvas) return;

        const canvasRect = this.canvas.getBoundingClientRect();
        const bbox = element.bbox()

        const originX = (bbox.x + bbox.width / 2);
        const originY = (bbox.y + bbox.height / 2);
        console.log("origin", originX, originY)
        // console.log("originX, originY", originX, originY, "originX - canvasRect.left, originY-canvasRect.top", originX - canvasRect.left, originY-canvasRect.top)
        const svgElementWrapper = {
            shape: element,
            isAnimated: false,
            keys: [],
            origin: {
                x: originX,
                y: originY
            }
        };

        this.svgElements.push(svgElementWrapper);
        timelineBlockState.setActiveElement(svgElementWrapper);
        console.log("this.svgElements", this.svgElements)
    }
    toggleAnimation(element) {
        const svgElement = this.svgElements.find(el => el.shape.node === element);
        console.log("svgElement", svgElement)
        if (svgElement) {
            svgElement.isAnimated = !svgElement.isAnimated;
        }
    }
    setSvgElements(arr){
        this.svgElements = arr
        console.log(this.svgElements)
    }

    setSvgCanvas(canvas){
        this.canvas = canvas
    }

    handleClearCanvas = () => {
        this.canvas.innerHTML = '';
        this.svgElements = [];
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