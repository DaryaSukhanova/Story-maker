export const createAnimationStyle = (origin, keys, index, animDuration, animName) => {
    const {x, y} = origin;
    const prevStyle = document.querySelector(`style[data-animation="rotatePath_${index}"]`);
    if (prevStyle) {
        prevStyle.remove();
    }

    // Создание нового элемента <style>
    const style = document.createElement('style');
    style.setAttribute('data-animation', `${animName}`);

    let keyframes = `
    0% {
        transform-origin: ${x}px ${y}px;
        transform: rotate(0deg) scale(1, 1) translate(0px, 0px) skew(0deg, 0deg);
    }
    `;

    keys.forEach((key, index) => {
        const percent = (key.duration / animDuration)*100;
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
    @keyframes ${animName} {
        ${keyframes}
    }
    `;
    document.head.appendChild(style);
};