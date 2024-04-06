import React, {useEffect, useRef, useState} from 'react';
import timelineBlockState from "../../store/timelineBlockState";
import {observer} from "mobx-react-lite";
import svgCanvasState from "../../store/svgCanvasState";
import {logDOM} from "@testing-library/react";

const TimelineLine = observer(({id, findNearestTickPosition, keyframesKeys, updateKeys}) => {
    const timelineKeyRef = useRef(null);
    const [isDraggingKey, setIsDraggingKey] = useState(false);
    const [draggingKeyId, setDraggingKeyId]= useState(null)
    // const keys = timelineBlockState.keys

    let maxDurationKey;
    let minDurationKey;

    if (keyframesKeys.length > 0) {
        maxDurationKey = keyframesKeys.reduce((maxKey, currentKey) => {
            return currentKey.duration > maxKey.duration ? currentKey : maxKey;
        }, keyframesKeys[0]);
        minDurationKey = keyframesKeys.reduce((minKey, currentKey) => {
            return currentKey.duration < minKey.duration ? currentKey : minKey;
        }, keyframesKeys[0]);
    } else {
        // Если массив пустой, просто устанавливаем нулевые значения
        maxDurationKey = { duration: 0, position: 0 };
        minDurationKey = { duration: 0, position: 0 };
    }

    const handleKeyDrag = (event) => {
        if (isDraggingKey) {
            const boundingRect = timelineKeyRef.current.getBoundingClientRect();
            const newPosition = event.clientX - boundingRect.left;

            // Обновляем позицию перетаскиваемого ключа в timelineBlockState.keys
            const updatedToolBlockKeys = keyframesKeys.map(key => {
                if (key.id === draggingKeyId) {
                    return { ...key, position: findNearestTickPosition(newPosition) };
                }
                return key;
            });
            updateKeys(updatedToolBlockKeys)
            // Обновляем состояние keys из timelineBlockState.keys
            // timelineBlockState.setKeys([...updatedToolBlockKeys]);
        }
    };

    const handleKeyMouseDown = (event, keyId) => {
        setIsDraggingKey(true)
        event.preventDefault();
        setIsDraggingKey(true); // Устанавливаем флаг, что началось перетаскивание ключа
        setDraggingKeyId(keyId); // Устанавливаем id перетаскиваемого ключа


        const updatedSvgElements = svgCanvasState.svgElements.map(element => {
            const updatedKeys = element.keys.map(key => {
                return { ...key, isActive: false };
            });
            return { ...element, keys: updatedKeys };
        });

        svgCanvasState.setSvgElements(updatedSvgElements);

        const updatedKeys = keyframesKeys.map(key => {
            return { ...key, isActive: key.id === keyId }; // Устанавливаем активность только для выбранного ключа
        });
        updateKeys(updatedKeys); // Обновляем массив ключей в родительском компоненте
    };

    const handleKeyEnd = (event) => {
        const boundingRect = timelineKeyRef.current.getBoundingClientRect();
        const newPosition = event.clientX - boundingRect.left;
        const updatedToolBlockKeys = keyframesKeys.map(key => {
            if (key.id === draggingKeyId) {
                return { ...key, duration: (findNearestTickPosition(newPosition) / 150)};
            }
            return key;
        });
        updateKeys(updatedToolBlockKeys)

        setIsDraggingKey(false); // Сбрасываем флаг перетаскивания ключа
        document.removeEventListener('mousemove', handleKeyDrag);
    };

    const handleClick = () => {
        timelineBlockState.setActiveTimeline(id);

    };

    const timelineKeyTimeStyles = {
        marginLeft: `${minDurationKey.position - 10}px`,
        width: `${maxDurationKey.position - minDurationKey.position}px`,
        height: `100%`,
        backgroundColor: 'rgba(46,80,166,0.67)'
    };

    return (
        <div className="timeline-line"
             id={`timeline${id}`}
             ref={timelineKeyRef}
             onMouseMove={handleKeyDrag}
             onMouseUp={handleKeyEnd}
             onClick={handleClick}
        >
            <div className="timeline-keytime" style={timelineKeyTimeStyles}></div>
            {keyframesKeys.map(key => (
                <div
                    onMouseDown={(event) => handleKeyMouseDown(event, key.id)}
                    key={key.name}
                    id={key.name}
                    className={`btn-key frame ${key.isActive ? 'active-frame' : ''}`}
                    style={{ left: `${key.position}px` }} // Используем позицию из состояния
                ></div>
            ))}

        </div>
    );
});

export default TimelineLine;