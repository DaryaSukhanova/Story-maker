import timelineBlockState from "../../store/timelineBlockState";
import AnimationTool from "./AnimationTool";


export default class KeyFrameManager extends AnimationTool{
    constructor(svgCanvas) {
        super(svgCanvas);
        this.svgCanvas = svgCanvas
        this.element = null;
    }
    thumbPosition = timelineBlockState.thumbEndPosition
    startAnimations(isRunningThumb, x, y) {
        this.element = timelineBlockState.activeElement;
        console.log(this.element)
        if (this.element) {
             this.applyRotationAnimationStyle( x, y);

            this.element.css({
                'animation': 'rotatePath', // Устанавливаем имя анимации
                'animation-duration': `${timelineBlockState.totalTime}s`, // Устанавливаем длительность анимации
                'animation-iteration-count': 'infinite', // Устанавливаем бесконечное повторение анимации
                'animation-play-state': isRunningThumb ? 'paused' : 'running' // Устанавливаем состояние анимации
            });
        }
    }
    applyRotationAnimationStyle (x, y) {
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