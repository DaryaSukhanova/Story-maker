import timelineBlockState from "../../store/timelineBlockState";
import AnimationTool from "./AnimationTool";


export default class KeyFrameManager extends AnimationTool{
    constructor(svgCanvas) {
        super(svgCanvas);
        this.svgCanvas = svgCanvas
        this.element = null;
        this.thumbPosition = null
    }

    startAnimations(isRunningThumb, x, y, activeElement) {
        this.element = timelineBlockState.activeElement.svgElement;
        if (activeElement) {
             this.applyRotationAnimationStyle( x, y);

            activeElement.attr(
                { 'style': `
                        animation: rotatePath; 
                        animation-duration: ${timelineBlockState.totalTime}s; 
                        animation-iteration-count: infinite; 
                        animation-play-state: ${isRunningThumb ? 'paused' : 'running'};`
                }
                );
        }
    }
    applyRotationAnimationStyle (x, y) {
        this.thumbPosition = timelineBlockState.thumbEndPosition

        const prevStyle = document.querySelector('style[data-animation="rotatePath"]');
        if (prevStyle) {
            prevStyle.remove();
        }

        // Создание нового элемента <style>
        const style = document.createElement('style');
        style.setAttribute('data-animation', 'rotatePath');

        let keyframes = `
        0% {
            transform-origin: ${x}px ${y}px;
            transform: rotate(${0}deg) scale(1, 1) translate(0px, 0px) skew(0deg, 0deg);
        }
        `;

        timelineBlockState.keys.forEach((key, index) => {
            const percent = (key.position / this.thumbPosition)*100;
            keyframes += `
            ${percent}% {
                transform-origin: ${x}px ${y}px;
                transform: rotate(${key.rotate}deg) scale(${key.scaleX}, ${key.scaleY}) translate(${key.translateX}px, ${key.translateY}px) skew(${key.skewX}deg, ${key.skewY}deg);
            }
        `;
        });
        const maxDurationKey = timelineBlockState.keys.reduce((maxKey, currentKey) => {
            return currentKey.duration > maxKey.duration ? currentKey : maxKey;
        }, timelineBlockState.keys[0]); // Начальное значение - первый ключ
        keyframes += `
        100% {
            transform-origin: ${x}px ${y}px;
            transform: rotate(${maxDurationKey.rotate}deg) scale(${maxDurationKey.scaleX}, ${maxDurationKey.scaleY}) translate(${maxDurationKey.translateX}px, ${maxDurationKey.translateY}px) skew(${maxDurationKey.skewX}deg, ${maxDurationKey.skewY}deg);
        }
        `;
        style.textContent = `
        @keyframes rotatePath {
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
            timelineBlockState.setKeys([])
        }
    }
}