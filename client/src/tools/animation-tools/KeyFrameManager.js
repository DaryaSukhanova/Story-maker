import timelineBlockState from "../../store/timelineBlockState";
import AnimationTool from "./AnimationTool";
import svgCanvasState from "../../store/svgCanvasState";


export default class KeyFrameManager extends AnimationTool{
    constructor(svgCanvas) {
        super(svgCanvas);
        this.svgCanvas = svgCanvas
        this.element = null;
        this.thumbPosition = null
    }

    startAnimations(isRunningThumb, x, y, activeElement) {
        // this.element = timelineBlockState.activeElement.shape;
        const animatedElements = svgCanvasState.svgElements.filter(svgElement => svgElement.isAnimated);

        animatedElements.forEach((animatedElement, index) => {
            this.element = animatedElement.shape;
            this.applyRotationAnimationStyle(x, y, animatedElement.keys, index);

            animatedElement.shape.attr({
                'style': `
                animation: rotatePath_${index}; 
                animation-duration: ${timelineBlockState.totalTime}s; 
                animation-iteration-count: infinite; 
                animation-play-state: ${isRunningThumb ? 'paused' : 'running'};
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
            transform: rotate(${0}deg) scale(1, 1) translate(0px, 0px) skew(0deg, 0deg);
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