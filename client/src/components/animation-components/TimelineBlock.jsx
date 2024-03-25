import React, { useState, useEffect, useRef } from 'react';
import '../../styles/timeline-block.scss';
import toolBlockState from "../../store/toolBlockState";
import {observer} from "mobx-react-lite";
import {logDOM} from "@testing-library/react";
const TimeLineBlock = observer (() => {
    const [elapsedTime, setElapsedTime] = useState(0);
    const [isRunningThumb, setIsRunningThumb] = useState(false);
    const [thumbPosition, setThumbPosition] = useState(0);
    const [totalTime, setTotalTime] = useState(0);
    const [keys, setKeys] = useState([])
    const [isDraggingKey, setIsDraggingKey] = useState(true);

    const intervalIdRef = useRef(null);
    const startTimeRef = useRef(null);
    const timelineRef = useRef(null);
    const thumbEndTimeRef = useRef(null);
    const thumbCurrent = useRef(null);
    const keyRef = useRef(null);
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

                if (newElapsedTime >= totalTime) {
                    setElapsedTime(0); // Если достигло, сбрасываем таймер на 0
                    clearInterval(intervalIdRef.current);
                    setIsRunningThumb(true);
                } else {
                    setElapsedTime(newElapsedTime);
                }

                // setThumbTime((elapsedTime / 150)*1000);

            }, 10);
        } else {
            clearInterval(intervalIdRef.current);
        }

        return () => clearInterval(intervalIdRef.current);

    }, [isRunningThumb, elapsedTime, totalTime]);


    const handleStartButtonClick = () => {
        setIsRunningThumb(prevIsRunning => !prevIsRunning);
    };
    const handleStopButtonClick = () => {
        clearInterval(intervalIdRef.current);
        setIsRunningThumb(false);
        setElapsedTime(0);
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
        // event.preventDefault();
        setIsRunningThumb(false); // Остановить таймер во время перемещения ползунка
        document.addEventListener('mousemove', handleThumbDrag);
        document.addEventListener('mouseup', handleThumbDragEnd);
    };

    const handleThumbDrag = (event) => {
        const boundingRect = timelineRef.current.getBoundingClientRect();
        const newPosition = event.clientX - boundingRect.left;
        setTotalTime((newPosition / 150)*1000);
        setThumbPosition(newPosition);
        thumbEndTimeRef.current.style.left = `${newPosition}px`;
    };
    const handleThumbDragEnd = () => {
        document.removeEventListener('mousemove', handleThumbDrag);
        document.removeEventListener('mouseup', handleThumbDragEnd);

    };


    const handleAddKeyClick = () => {
        const newKey = {
            id: toolBlockState.keyCount,
            name: `Key${toolBlockState.keyCount}`,
            isActive: false,
            position: 0 // Установим начальную позицию для нового ключа
        };
        toolBlockState.addKey(); // Увеличиваем счетчик ключей в toolBlockState
        setKeys([...keys, newKey]); // Добавляем новый ключ в состояние
    };

    const [draggingKeyId, setDraggingKeyId]= useState(null)
    const handleKeyMouseDown = (event, keyId) => {
        setIsDraggingKey(true); // Устанавливаем флаг, что началось перетаскивание ключа
        setDraggingKeyId(keyId); // Устанавливаем id перетаскиваемого ключа
        const updatedKeys = keys.map(key => {
            if (key.id === keyId) {
                return { ...key, isActive: true };
            }
            return { ...key, isActive: false }; // Сбрасываем все остальные ключи в неактивное состояние
        });

        // Обновляем состояние keys новым массивом
        setKeys(updatedKeys);
    };

    const handleKeyDrag = (event) => {
        console.log(isDraggingKey)
        if (isDraggingKey) {
            const boundingRect = timelineKeyRef.current.getBoundingClientRect();
            const newPosition = event.clientX - boundingRect.left;
            // Обновляем позицию перетаскиваемого ключа
            const updatedKeys = keys.map(key => {
                if (key.id === draggingKeyId) {
                    return { ...key, position: newPosition };
                }
                return key;
            });
            setKeys(updatedKeys);
        }
    };

    const handleKeyEnd = () => {
        setIsDraggingKey(false); // Сбрасываем флаг перетаскивания ключа
        document.removeEventListener('mousemove', handleKeyDrag);
    };

    return (
        <div className="timeline-block">
            <div className="timeline-left">
                <div className="timeline-controls">
                    <div className="timeline-player">
                        <button className="btn left-stop-button" id="leftStopBtn" onClick={handleStopButtonClick}></button>
                        <button className={isRunningThumb ? 'btn pause-button' : 'btn play-button'} id="playBtn" onClick={handleStartButtonClick}></button>
                    </div>
                    <div className="timer">{formatTime(elapsedTime)} </div>
                </div>
                <div className="timeline-animation-tool">
                    <div className="btn-key add"  onClick={handleAddKeyClick}></div>
                </div>
            </div>
            <div className="timeline-right" >
                <div className="timeline-ticks" ref={timelineRef} onMouseDown={handleThumbDragStart}>
                    {renderTimelineTicks()}
                    <div className="thumb-end-time" ref={thumbEndTimeRef} style={{ left: `${thumbPosition}px` }}></div>
                </div>
                <div className="timeline-key-frames">
                    <div className="thumb-current" ref={thumbCurrent} style={{ left: `${((elapsedTime/1000) * 150)}px` }}></div>
                    <div className="timeline-line" ref={timelineKeyRef} onMouseMove={handleKeyDrag} onMouseUp={handleKeyEnd}>
                        {keys.map(key => (
                            <div
                                onMouseDown={(event) => handleKeyMouseDown(event, key.id)}
                                key={key.name}
                                id={key.name}
                                className={`btn-key frame ${key.isActive ? 'active' : ''}`}
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