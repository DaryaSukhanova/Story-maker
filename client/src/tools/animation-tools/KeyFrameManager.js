import timelineBlockState from "../../store/timelineBlockState";
import AnimationTool from "./AnimationTool";
import svgCanvasState from "../../store/svgCanvasState";
import {action} from "mobx";
import animationToolState from "../../store/animationToolState";


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

        animatedElements.forEach((animatedElement, index) => {
            this.element = animatedElement.shape;
            const rect = animatedElement.shape.bbox();
            console.log(animatedElement.shape.bbox())
            this.applyRotationAnimationStyle(rect.x2, rect.y, animatedElement.keys, index);

            animatedElement.shape.attr({
                'style': `
                animation: rotatePath_${index}; 
                animation-duration: ${timelineBlockState.totalTime}s; 
                animation-iteration-count: infinite; 
                animation-play-state: ${!isRunningThumb ? 'paused' : 'running'};
            `
            });
        });
    }
    applyRotationAnimationStyle (x, y, keys, index) {
        this.thumbPosition = timelineBlockState.thumbEndPosition

        const prevStyle = document.querySelector(`style[data-animation="rotatePath_${index}"]`);
        if (prevStyle) {
            prevStyle.remove();
        }

        // Создание нового элемента <style>
        const style = document.createElement('style');
        style.setAttribute('data-animation', `rotatePath_${index}`);

        let keyframes = `
        0% {
            transform-origin: ${x}px ${y}px;
            transform: rotate(0deg) scale(1, 1) translate(0px, 0px) skew(0deg, 0deg);
        }
        `;

        keys.forEach((key, index) => {
            const percent = (key.position / this.thumbPosition)*100;
            keyframes += `
            ${percent}% {
                transform-origin: ${x}px ${y}px;
                transform: rotate(${key.rotate}deg) scale(${key.scaleX}, ${key.scaleY}) translate(${key.translateX}px, ${key.translateY}px) skew(${key.skewX}deg, ${key.skewY}deg);
            }
        `;
        });
        const maxDurationKey = keys.reduce((maxKey, currentKey) => {
            return currentKey.duration > maxKey.duration ? currentKey : maxKey;
        }, keys[0]); // Начальное значение - первый ключ
        keyframes += `
        100% {
            transform-origin: ${x}px ${y}px;
            transform: rotate(${maxDurationKey.rotate}deg) scale(${maxDurationKey.scaleX}, ${maxDurationKey.scaleY}) translate(${maxDurationKey.translateX}px, ${maxDurationKey.translateY}px) skew(${maxDurationKey.skewX}deg, ${maxDurationKey.skewY}deg);
        }
        `;
        style.textContent = `
        @keyframes rotatePath_${index} {
            ${keyframes}
        }
        `;
        document.head.appendChild(style);
    };
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