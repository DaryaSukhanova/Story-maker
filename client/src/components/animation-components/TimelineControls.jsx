import React, {useEffect, useRef, useState} from 'react';
import {observer} from "mobx-react-lite";
import timelineBlockState from "../../store/timelineBlockState";
import timelineBlock from "./TimelineBlock";

const TimelineControls = observer( () => {

    const isRunningThumb = timelineBlockState.isRunningThumb
    const [roundedElapsedTime, setRoundedElapsedTime] = useState(0);
    const [rotationCenter, setRotationCenter] = useState({ x: null, y: null });
    let elapsedTime = timelineBlockState.elapsedTime
    const timelineKeyRef = useRef(null);
    const intervalIdRef = useRef(null);
    const startTimeRef = useRef(null);

    useEffect(() => {
        if (isRunningThumb) {
            updateTimer();
        } else {
            clearInterval(intervalIdRef.current);
        }
        return () => clearInterval(intervalIdRef.current);
    }, [isRunningThumb, elapsedTime, timelineBlockState.totalTime]);

    const updateTimer = () => {
        startTimeRef.current = Date.now() - elapsedTime;
        intervalIdRef.current = setInterval(() => {
            const currentTime = Date.now();
            const newElapsedTime = currentTime - startTimeRef.current;
            setRoundedElapsedTime(Math.ceil(newElapsedTime / 100) * 100);
            console.log(elapsedTime);
            if (newElapsedTime >= timelineBlockState.totalTime * 1000) {
                timelineBlockState.setElapsedTime(0); // Если достигло, сбрасываем таймер на 0
                setRoundedElapsedTime(0);
                clearInterval(intervalIdRef.current);
                timelineBlockState.setIsRunningThumb(true);
            } else {
                timelineBlockState.setElapsedTime(newElapsedTime);
            }
        }, 10);
    };
    const handleStartButtonClick = () => {
        timelineBlockState.setIsRunningThumb(!isRunningThumb)
        startAnimations()
    };
    const handleStopButtonClick = () => {
        clearInterval(intervalIdRef.current);
        timelineBlockState.setIsRunningThumb(false);
        timelineBlockState.setElapsedTime(0);
        // setRoundedElapsedTime(0)
        const prevStyle = document.querySelector('style[data-animation="rotatePath"]');
        if (prevStyle) {
            prevStyle.remove();
        }
    };
    const startAnimations = () => {
        const selectedElement = timelineBlockState.activeElement;

        if (selectedElement) {
            // const remainingTime = (totalTime * 1000) - elapsedTime;
            applyRotationAnimationStyle(selectedElement, timelineBlockState);
            selectedElement.style.animationName = 'rotatePath';
            selectedElement.style.animationDuration = `${timelineBlockState.totalTime}s`;
            selectedElement.style.animationIterationCount = 'infinite';
            selectedElement.style.animationPlayState = isRunningThumb ? 'paused' : 'running'; // Устанавливаем состояние анимации в зависимости от значения isRunningThumb
            // Другие свойства анимации, если нужно
        }
    };

    const applyRotationAnimationStyle = (element) => {
        const rect = element.getBoundingClientRect();
        const canvasRect = document.getElementById("drawingCanvas").getBoundingClientRect();
        const x = rotationCenter.x !== null ? rotationCenter.x : rect.left - canvasRect.left + rect.width / 2;
        const y = rotationCenter.y !== null ? rotationCenter.y : rect.top - canvasRect.top + rect.height;


        setRotationCenter({ x, y });

        const prevStyle = document.querySelector('style[data-animation="rotatePath"]');
        if (prevStyle) {
            prevStyle.remove();
        }

        // Создание нового элемента <style>
        const style = document.createElement('style');
        style.setAttribute('data-animation', 'rotatePath');
        //
        // style.textContent = `
        // @keyframes rotatePath {
        //     0% {
        //         transform-origin: ${x}px ${y}px;
        //         transform: rotate(${timelineBlockState.keys[0].rotate}deg);
        //     }
        //     100% {
        //         transform-origin: ${x}px ${y}px;
        //         transform: rotate(${timelineBlockState.keys[timelineBlockState.keys.length-1].rotate}deg);
        //     }
        // }`;
        let keyframes = `
        0% {
            transform-origin: ${x}px ${y}px;
            transform: rotate(${0}deg);
        }
        `;

        // timelineBlockState.keys.forEach((key, index) => {
        //     console.log(key.position, thumbPosition)
        //     const percent = (key.position / thumbPosition)*100;
        //     keyframes += `
        //     ${percent}% {
        //         transform-origin: ${x}px ${y}px;
        //         transform: rotate(${key.rotate}deg);
        //     }
        // `;
        // });

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
    const formatTime = (time) => {
        const pad = (num) => (num < 10 ? `0${num}` : num);
        const minutes = Math.floor((time / 1000 / 60) % 60);
        const seconds = Math.floor((time / 1000) % 60);
        const milliseconds = Math.floor(time % 1000);
        return `${pad(minutes)}:${pad(seconds)}:${pad(milliseconds)}`;
    };


    return (
        <div className="timeline-controls">
            <div className="timeline-player">
                <button className="btn left-stop-button" id="leftStopBtn" onClick={handleStopButtonClick}></button>
                <button className={isRunningThumb ? 'btn pause-button' : 'btn play-button'} id="playBtn" onClick={handleStartButtonClick}></button>
            </div>
            <div className="timer">{formatTime(elapsedTime)} </div>
        </div>
    );
});

export default TimelineControls;