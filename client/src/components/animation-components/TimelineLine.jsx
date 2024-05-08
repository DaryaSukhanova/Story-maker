import React, { useState, useRef, useEffect } from 'react';
import { observer } from "mobx-react-lite";
import svgCanvasState from '../../store/svgCanvasState';
import timelineBlockState from '../../store/timelineBlockState';

const TimelineLine = observer(({ id, findNearestTickPosition, keyframesKeys, updateKeyPosition }) => {
    const timelineKeyRef = useRef(null);
    const [isDraggingKey, setIsDraggingKey] = useState(false);
    const [draggingKeyId, setDraggingKeyId] = useState(null);
    const [draggingStart, setDraggingStart] = useState({ startX: 0, initialLeft: 0 });
    const [leftmostPos, setLeftmostPos] = useState(0);
    const [rightmostPos, setRightmostPos] = useState(0);
    const thumbCurrent = useRef(null);
    useEffect(() => {
        // Функция для нахождения крайних позиций после рендеринга ключей
        const updatePositions = () => {
            if (keyframesKeys.length > 0) {
                // Определите крайние ключи по координатам
                let leftmost = Infinity;
                let rightmost = -Infinity;

                keyframesKeys.forEach((key) => {
                    const keyElement = document.getElementById(key.id);
                    if (keyElement) {
                        const left = parseFloat(keyElement.style.left || '0');
                        leftmost = Math.min(leftmost, left);
                        rightmost = Math.max(rightmost, left);
                    }
                });

                setLeftmostPos(leftmost);
                setRightmostPos(rightmost);
            }
        };

        updatePositions();
    }, [keyframesKeys]);

    const handleKeyMouseDown = (event, keyId) => {
        event.preventDefault();
        setIsDraggingKey(true);
        setDraggingKeyId(keyId);

        svgCanvasState.setActiveElement(id);
        svgCanvasState.setActiveKey(keyId);

        const currentKeyElem = document.getElementById(keyId);
        const initialLeft = currentKeyElem ? parseFloat(currentKeyElem.style.left || '0') : 0;

        setDraggingStart({
            startX: event.clientX,
            initialLeft: initialLeft
        });

        document.querySelectorAll('.frame').forEach(elem => elem.setAttribute('data-active', 'false'));
        if (currentKeyElem) {
            currentKeyElem.setAttribute('data-active', 'true');
        }
    };

    const handleKeyDrag = (event) => {
        if (isDraggingKey && draggingKeyId !== null) {
            const offsetX = event.clientX - draggingStart.startX;
            const newLeft = draggingStart.initialLeft + offsetX;

            const currentKeyElem = document.getElementById(draggingKeyId);
            if (currentKeyElem) {
                currentKeyElem.style.left = `${findNearestTickPosition(newLeft)}px`;
            }
        }
    };

    const handleKeyEnd = (event) => {
        if (isDraggingKey && draggingKeyId !== null) {
            const boundingRect = timelineKeyRef.current.getBoundingClientRect();
            const newPosition = event.clientX - boundingRect.left;

            svgCanvasState.updateKeyframeField(id, draggingKeyId, "duration", findNearestTickPosition(newPosition) / 150);

            setIsDraggingKey(false);
            setDraggingKeyId(null);
        }
    };

    // Вычисление ширины полосы
    const barWidth = rightmostPos - leftmostPos;

    return (
        
        <div
            className="timeline-line"
            id={`timeline${id}`}
            ref={timelineKeyRef}
            onMouseMove={handleKeyDrag}
            onMouseUp={handleKeyEnd}
        >
            <div className="thumb-current" ref={thumbCurrent} style={{ transform: `translateX(${timelineBlockState.roundedElapsedTime * (150 / 1000)-1}px)` }}></div>
            {/* Полоса между крайними ключами */}
            {keyframesKeys.length > 0 && (
                <div
                    className="timeline-bar"
                    style={{
                        left: `${leftmostPos}px`,
                        width: `${barWidth}px`,
                        position: 'absolute',
                        height: '15px',
                        background: '#8DADFF'
                    }}
                ></div>
            )}

            {keyframesKeys.map(key => (
                <div
                    onMouseDown={(event) => handleKeyMouseDown(event, key.id)}
                    key={key.id}
                    id={key.id}
                    className="btn-key frame"
                    data-active="false"
                    style={{ left: `0px` }} // Вычислите позицию ключа
                ></div>
            ))}
        </div>
    );
});

export default TimelineLine;
