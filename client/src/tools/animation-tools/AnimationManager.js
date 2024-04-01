import timelineBlockState from "../../store/timelineBlockState";

export default class AnimationManager {
    constructor(element) {
        this.element = element
    }
    thumbPosition = timelineBlockState.thumbEndPosition
    startAnimations(isRunningThumb, x, y) {
        if (this.element) {
            this.applyRotationAnimationStyle( x, y);
            this.element.style.animationName = 'rotatePath';
            this.element.style.animationDuration = `${timelineBlockState.totalTime}s`;
            this.element.style.animationIterationCount = 'infinite';
            this.element.style.animationPlayState = isRunningThumb ? 'paused' : 'running'; // Устанавливаем состояние анимации в зависимости от значения isRunningThumb
            // Другие свойства анимации, если нужно
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
            transform: rotate(${0}deg);
        }
        `;
        timelineBlockState.keys.forEach((key, index) => {
            console.log(key.position, this.thumbPosition)
            const percent = (key.position / this.thumbPosition)*100;
            keyframes += `
            ${percent}% {
                transform-origin: ${x}px ${y}px;
                transform: rotate(${key.rotate}deg);
            }
        `;
        });
        const maxDurationKey = timelineBlockState.keys.reduce((maxKey, currentKey) => {
            return currentKey.duration > maxKey.duration ? currentKey : maxKey;
        }, timelineBlockState.keys[0]); // Начальное значение - первый ключ
        keyframes += `
        100% {
            transform-origin: ${x}px ${y}px;
            transform: rotate(${maxDurationKey.rotate}deg);
        }
        `;
        style.textContent = `
        @keyframes rotatePath {
            ${keyframes}
        }
        `;
        document.head.appendChild(style);
    };
}