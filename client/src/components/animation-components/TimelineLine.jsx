import React, { useState, useRef } from 'react';
import { observer } from "mobx-react-lite";
import svgCanvasState from '../../store/svgCanvasState';

const TimelineLine = observer(({ id, findNearestTickPosition, keyframesKeys, updateKeyPosition }) => {
    const timelineKeyRef = useRef(null);
    const [isDraggingKey, setIsDraggingKey] = useState(false);
    const [draggingKeyId, setDraggingKeyId] = useState(null);
    const [draggingStart, setDraggingStart] = useState({ startX: 0, initialLeft: 0 });

    const handleKeyMouseDown = (event, keyId) => {
        event.preventDefault();
        setIsDraggingKey(true);
        setDraggingKeyId(keyId);

        svgCanvasState.setActiveElement(id)
        svgCanvasState.setActiveKey(keyId)

        // Получаем текущую позицию из стиля `left`
        const currentKeyElem = document.getElementById(keyId);
        const initialLeft = currentKeyElem ? parseFloat(currentKeyElem.style.left || '0') : 0;

        // Инициализируем начальную позицию для перетаскивания
        setDraggingStart({
            startX: event.clientX,
            initialLeft: initialLeft,
        });

        // Устанавливаем атрибут `data-active` для выбранного ключа
        document.querySelectorAll('.frame').forEach(elem => elem.setAttribute('data-active', 'false'));
        if (currentKeyElem) {
            currentKeyElem.setAttribute('data-active', 'true');
        }
    };

    const handleKeyDrag = (event) => {
        if (isDraggingKey && draggingKeyId !== null) {
            // Вычисляем смещение относительно начальной позиции
            const offsetX = event.clientX - draggingStart.startX;
            const newLeft = draggingStart.initialLeft + offsetX;

            // Обновляем только стиль `left` для визуального смещения
            const currentKeyElem = document.getElementById(draggingKeyId);
            if (currentKeyElem) {
                currentKeyElem.style.left = `${findNearestTickPosition(newLeft)}px`;
            }
        }
    };

    const handleKeyEnd = (event) => {
        if (isDraggingKey && draggingKeyId !== null) {
            // Завершаем перетаскивание и передаем финальную позицию
            const boundingRect = timelineKeyRef.current.getBoundingClientRect();
            const newPosition = event.clientX - boundingRect.left;

            // Здесь мы вызываем функцию обновления ключа, передавая новое значение
            svgCanvasState.updateKeyframeField(id, draggingKeyId, "duration", findNearestTickPosition(newPosition)/150);

            setIsDraggingKey(false);
            setDraggingKeyId(null);
        }
    };

    return (
        <div
            className="timeline-line"
            id={`timeline${id}`}
            ref={timelineKeyRef}
            onMouseMove={handleKeyDrag}
            onMouseUp={handleKeyEnd}
        >
            {keyframesKeys.map(key => (
                <div
                    onMouseDown={(event) => handleKeyMouseDown(event, key.id)}
                    key={key.id}
                    id={key.id}
                    className="btn-key frame"
                    data-active="false"
                    style={{ left: `0px` }} // Начальное положение
                ></div>
            ))}
        </div>
    );
});

export default TimelineLine;