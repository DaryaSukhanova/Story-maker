import React, {useEffect, useRef, useState} from 'react';
import '../../styles/timeline-block.scss';
import timelineBlockState from "../../store/timelineBlockState";
import {observer} from "mobx-react-lite";
import TimelineControls from "./TimelineControls";
import animationToolState from "../../store/animationToolState";
import KeyFrames from "../../tools/animation-tools/KeyFrames";

const TimeLineBlock = observer (() => {
    const [elapsedTime, setElapsedTime] = useState(0);
    const [roundedElapsedTime, setRoundedElapsedTime] = useState(0);
    const [isRunningThumb, setIsRunningThumb] = useState(false);
    const [thumbPosition, setThumbPosition] = useState(0);
    const [isEndThumb, setIsEndThumb] = useState(false);
    const [thumbCurrentPosition, setThumbCurrentPosition] = useState(0);
    const [totalTime, setTotalTime] = useState(0);
    const [keys, setKeys] = useState([])
    const [isDraggingKey, setIsDraggingKey] = useState(true);
    const [rotationCenter, setRotationCenter] = useState({ x: null, y: null });

    const intervalIdRef = useRef(null);
    const startTimeRef = useRef(null);
    const timelineRef = useRef(null);
    const thumbEndTimeRef = useRef(null);
    const thumbCurrent = useRef(null);
    const timelineKeyRef = useRef(null);

    const formatTime = (time) => {
        const pad = (num) => (num < 10 ? `0${num}` : num);
        const minutes = Math.floor((time / 1000 / 60) % 60);
        const seconds = Math.floor((time / 1000) % 60);
        const milliseconds = Math.floor(time % 1000);
        return `${pad(minutes)}:${pad(seconds)}:${pad(milliseconds)}`;
    };

    useEffect(() => {
        if (isRunningThumb) {
            startTimeRef.current = Date.now() - elapsedTime;
            intervalIdRef.current = setInterval(() => {
                const currentTime = Date.now();
                const newElapsedTime = currentTime - startTimeRef.current;
                setRoundedElapsedTime(Math.ceil(newElapsedTime / 100) * 100) ;

                if (roundedElapsedTime >= totalTime*1000) {

                    setElapsedTime(0); // Если достигло, сбрасываем таймер на 0
                    setRoundedElapsedTime(0)
                    clearInterval(intervalIdRef.current);
                    setIsRunningThumb(true);
                    // const prevStyle = document.querySelector('style[data-animation="rotatePath"]');
                    // if (prevStyle) {
                    //     prevStyle.remove();
                    // }
                    // applyRotationAnimationStyle(timelineBlockState.activeElement, timelineBlockState);
                } else {
                    setElapsedTime(newElapsedTime); // Округляем до ближайшего кратного 100

                }

                // setThumbTime((elapsedTime / 150)*1000);

            }, 10);
        } else {
            clearInterval(intervalIdRef.current);
        }

        return () => clearInterval(intervalIdRef.current);

    }, [isRunningThumb, roundedElapsedTime, totalTime]);


    const applyRotationAnimationStyle = (element, timelineBlockState) => {
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

        timelineBlockState.keys.forEach((key, index) => {
            console.log(key.position, thumbPosition)
            const percent = (key.position / thumbPosition)*100;
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

    const startAnimations = () => {
        const selectedElement = timelineBlockState.activeElement;

        if (selectedElement) {
            // const remainingTime = (totalTime * 1000) - elapsedTime;
            applyRotationAnimationStyle(selectedElement, timelineBlockState);
            selectedElement.style.animationName = 'rotatePath';
            selectedElement.style.animationDuration = `${totalTime}s`;
            selectedElement.style.animationIterationCount = 'infinite';
            selectedElement.style.animationPlayState = isRunningThumb ? 'paused' : 'running'; // Устанавливаем состояние анимации в зависимости от значения isRunningThumb
            // Другие свойства анимации, если нужно
        }
    };

    const handleStartButtonClick = () => {
        setIsRunningThumb(prevIsRunning => !prevIsRunning);
        startAnimations()

    };
    const handleStopButtonClick = () => {
        clearInterval(intervalIdRef.current);
        setIsRunningThumb(false);
        setElapsedTime(0);
        setRoundedElapsedTime(0)
        const prevStyle = document.querySelector('style[data-animation="rotatePath"]');
        if (prevStyle) {
            prevStyle.remove();
        }
    };


    const renderTimelineTicks = () => {
        const ticks = [];
        for (let i = 0; i <= 10; i++) {
            const leftPosition = i * 150;
            ticks.push(
                <div key={i} className="tick" style={{ left: `${leftPosition}px` }}>
                    <span style={{marginLeft: 5}}>{i}s</span>
                </div>
            );
            // Добавляем дополнительные метки между основными делениями
            if(i === 10) break
            for (let j = 1; j <= 9; j++) {
                const subTickLeftPosition = leftPosition + j * 15; // Учитываем шаг в 100мс (0.1с * 10)
                ticks.push(
                    <div key={`${i}-${j}`} className="sub-tick" style={{ left: `${subTickLeftPosition}px` }}></div>
                );
            }
        }
        return ticks;
    };
    const handleThumbDragStart = (event) => {
        event.preventDefault();
        setIsEndThumb(true)
        // setIsRunningThumb(false); // Остановить таймер во время перемещения ползунка

        // document.addEventListener('mousemove', handleThumbDrag);
        // document.addEventListener('mouseup', handleThumbDragEnd);
    };
    const thumbPositionRef = useRef(null);

    const handleThumbDrag = (event) => {
        if(isEndThumb){
            const boundingRect = timelineRef.current.getBoundingClientRect();
            const newPosition = event.clientX - boundingRect.left;

            // Найдем ближайшее деление времени
            const nearestTickPosition = findNearestTickPosition(newPosition);
            // Установим позицию ползунка в ближайшем делении времени
            thumbEndTimeRef.current.style.left = `${nearestTickPosition}px`;
            thumbPositionRef.current = nearestTickPosition; // Обновляем значение ref
            setThumbPosition(nearestTickPosition); // Обновляем состояние позиции ползунка
            setTotalTime(nearestTickPosition / 150);
            console.log(thumbPosition)
        }

    };

    const findNearestTickPosition = (position) => {
        const ticksPositions = [];
        for (let i = 0; i <= 10; i++) {
            ticksPositions.push(i * 150); // Добавляем позиции каждого деления времени
            // Добавляем позиции каждого подделения времени
            for (let j = 1; j <= 9; j++) {
                ticksPositions.push(i * 150 + j * 15);
            }
        }

        // Находим ближайшее деление времени к текущей позиции ползунка
        return ticksPositions.reduce((prev, curr) => {
            return (Math.abs(curr - position) < Math.abs(prev - position) ? curr : prev);
        });
    };
    const handleThumbDragEnd = () => {
        setIsEndThumb(false)
        document.removeEventListener('mousemove', handleThumbDrag);
        document.removeEventListener('mouseup', handleThumbDragEnd);

    };


    const handleAddKeyClick = () => {
        const newKey = {
            id: timelineBlockState.keyCount,
            name: `Key${timelineBlockState.keyCount}`,
            isActive: false,
            position: 0 // Установим начальную позицию для нового ключа
        };
        timelineBlockState.addKey(); // Увеличиваем счетчик ключей в timelineBlockState
        setKeys([...keys, newKey]); // Добавляем новый ключ в состояние
    };

    const [draggingKeyId, setDraggingKeyId]= useState(null)
    const handleKeyMouseDown = (event, keyId) => {
        event.preventDefault();
        setIsDraggingKey(true); // Устанавливаем флаг, что началось перетаскивание ключа
        setDraggingKeyId(keyId); // Устанавливаем id перетаскиваемого ключа
        const updatedKeys = timelineBlockState.keys.map(key => {
            if (key.id === keyId) {
                return { ...key, isActive: true };
            }
            return { ...key, isActive: false }; // Сбрасываем все остальные ключи в неактивное состояние
        });
        timelineBlockState.keys = updatedKeys;
        // Обновляем состояние keys новым массивом
        setKeys([...updatedKeys]);
    };

    const handleKeyDrag = (event) => {
        if (isDraggingKey) {
            const boundingRect = timelineKeyRef.current.getBoundingClientRect();
            const newPosition = event.clientX - boundingRect.left;

            // Обновляем позицию перетаскиваемого ключа в timelineBlockState.keys
            const updatedToolBlockKeys = timelineBlockState.keys.map(key => {
                if (key.id === draggingKeyId) {
                    return { ...key, position: findNearestTickPosition(newPosition) };
                }
                return key;
            });

            // Обновляем состояние timelineBlockState.keys новым массивом с обновленными позициями
            timelineBlockState.keys = updatedToolBlockKeys;

            // Обновляем состояние keys из timelineBlockState.keys
            setKeys([...updatedToolBlockKeys]);
        }
    };

    const handleKeyEnd = (event) => {
        const boundingRect = timelineKeyRef.current.getBoundingClientRect();
        const newPosition = event.clientX - boundingRect.left;
        const updatedToolBlockKeys = timelineBlockState.keys.map(key => {
            if (key.id === draggingKeyId) {
                return { ...key, duration: (findNearestTickPosition(newPosition) / 150)};
            }
            return key;
        });
        timelineBlockState.keys = updatedToolBlockKeys;
        setKeys([...updatedToolBlockKeys]);

        setIsDraggingKey(false); // Сбрасываем флаг перетаскивания ключа
        document.removeEventListener('mousemove', handleKeyDrag);
    };

    return (
        <div className="timeline-block">
            <div className="timeline-left">
                <TimelineControls
                    isRunning={isRunningThumb}
                    elapsedTime={formatTime(elapsedTime)}
                    handleStopButtonClick={handleStopButtonClick}
                    handleStartButtonClick={handleStartButtonClick}/>
                {/*<div className="timeline-controls">*/}
                {/*    <div className="timeline-player">*/}
                {/*        <button className="btn left-stop-button" id="leftStopBtn" onClick={handleStopButtonClick}></button>*/}
                {/*        <button className={isRunningThumb ? 'btn pause-button' : 'btn play-button'} id="playBtn" onClick={handleStartButtonClick}></button>*/}
                {/*    </div>*/}
                {/*    <div className="timer">{formatTime(elapsedTime)} </div>*/}
                {/*</div>*/}

                {animationToolState.tool instanceof KeyFrames && (
                    <div className="timeline-animation-tool">
                        <div>Rotate</div>
                        <div className="btn key-add" onClick={handleAddKeyClick}></div>
                    </div>
                )}

            </div>
            <div className="timeline-right" >
                <div className="timeline-ticks" ref={timelineRef}
                     onMouseDown={handleThumbDragStart}
                     onMouseMove={handleThumbDrag}
                     onMouseUp={handleThumbDragEnd}>
                    {renderTimelineTicks()}
                    <div className="thumb-end-time" ref={thumbEndTimeRef} style={{ left: `${thumbPosition}px` }}></div>
                    <svg className="thumb-current-head" width="10" height="15" xmlns="http://www.w3.org/2000/svg" style={{ transform: `translateX(${roundedElapsedTime * (150 / 1000)-4}px)` }} >
                        <polygon points="0,0 10,0 10,10 5,15 0,10" fill="white" />
                    </svg>
                </div>
                <div className="timeline-key-frames">
                    <div className="thumb-current" ref={thumbCurrent} style={{ transform: `translateX(${roundedElapsedTime * (150 / 1000)-1}px)` }}></div>
                    <div className="timeline-line" ref={timelineKeyRef}
                         onMouseMove={handleKeyDrag}
                         onMouseUp={handleKeyEnd}>
                        {keys.map(key => (
                            <div
                                onMouseDown={(event) => handleKeyMouseDown(event, key.id)}
                                key={key.name}
                                id={key.name}
                                className={`btn-key frame ${key.isActive ? 'active-frame' : ''}`}
                                style={{ left: `${key.position}px` }} // Используем позицию из состояния
                            ></div>
                        ))}
                    </div>
                </div>
            </div>


        </div>
    );
});

export default TimeLineBlock;