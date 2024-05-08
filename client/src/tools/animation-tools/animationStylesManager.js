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
        transform: rotate(0deg) ;
    }
    `;

    // keys.forEach((key, index) => {
    //     const percent = (key.duration / animDuration)*100;
    //     keyframes += `
    //     ${percent}% {
    //         transform: rotate(${key.rotate}deg);
    //     }
    // `;
    // });
    const maxDurationKey = keys.reduce((maxKey, currentKey) => {
        return currentKey.duration > maxKey.duration ? currentKey : maxKey;
    }, keys[0]); // Начальное значение - первый ключ
    keyframes += `
    100% {
        transform: rotate(${maxDurationKey.rotate}deg);
    }
    `;
    style.textContent = `
    @keyframes ${animName} {
        ${keyframes}
    }
    `;
    document.head.appendChild(style);
};