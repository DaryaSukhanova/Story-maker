import timelineBlockState from "../../store/timelineBlockState";
import AnimationTool from "./AnimationTool";
import svgCanvasState from "../../store/svgCanvasState";
import {action} from "mobx";
import animationToolState from "../../store/animationToolState";
import { createAnimationStyle } from './animationStylesManager';

export default class KeyFrameManager extends AnimationTool{
    constructor(svgCanvas) {
        super(svgCanvas);
        this.listen();
        this.svgCanvas = svgCanvas
        this.element = null;
        this.thumbPosition = null
    }

    mouseDownHandler = (e) => {
        const target = e.target;
        svgCanvasState.toggleAnimation(target)
        console.log(svgCanvasState.svgElements)
    }


    startAnimations(isRunningThumb) {
        // this.element = timelineBlockState.activeElement.shape;
        const animatedElements = svgCanvasState.svgElements.filter(svgElement => svgElement.isAnimated);
        const canvasRect = this.svgCanvas.getBoundingClientRect();
        animatedElements.forEach((animatedElement, index) => {
            this.element = animatedElement.shape;
            const rect = animatedElement.shape.bbox();
            console.log(animatedElement.shape.bbox())
            const animationName = `rotatePath_${index}`;
            createAnimationStyle({x: animatedElement.origin.x, y: animatedElement.origin.y}, animatedElement.keys, index, timelineBlockState.totalTime, animationName);

            animatedElement.shape.attr({
                'style': `
                animation: ${animationName}; 
                animation-duration: ${timelineBlockState.totalTime}s; 
                animation-iteration-count: infinite; 
                animation-play-state: ${!isRunningThumb ? 'paused' : 'running'};
            `
            });
        });
    }

    resetAnimations() {
        // Удаление стилей для каждой анимации
        svgCanvasState.svgElements.forEach((element, index) => {
            const prevStyle = document.querySelector(`style[data-animation="rotatePath_${index}"]`);
            if (prevStyle) {
                prevStyle.remove();
            }
            // Сброс стилей анимации для каждого элемента
            if (element.shape) {
                element.shape.attr({
                    style: ''  // Очистка инлайн-стилей
                });
            }
        });
        console.log("Animations reset");
    }

    stopAnimations() {
        if (this.element) {
            this.element.css({
                'animation': 'none' // Останавливаем анимацию
            });

            // timelineBlockState.setKeys([])
        }
        svgCanvasState.setSvgElements(svgCanvasState.svgElements.map(element => ({
            ...element,
            keys: []  // Очищаем массив keys
        })));
        console.log(svgCanvasState.svgElements)
    }
}