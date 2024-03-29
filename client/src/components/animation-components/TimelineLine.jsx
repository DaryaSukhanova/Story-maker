import React, {useRef, useState} from 'react';
import timelineBlockState from "../../store/timelineBlockState";
import {observer} from "mobx-react-lite";

const TimelineLine = observer(() => {
    const timelineKeyRef = useRef(null);
    const [isDraggingKey, setIsDraggingKey] = useState(true);
    const [draggingKeyId, setDraggingKeyId]= useState(null)
    const [keys, setKeys] = useState([])
    const handleKeyDrag = (event) => {
        if (isDraggingKey) {
            const boundingRect = timelineKeyRef.current.getBoundingClientRect();
            const newPosition = event.clientX - boundingRect.left;

            // Обновляем позицию перетаскиваемого ключа в timelineBlockState.keys
            const updatedToolBlockKeys = timelineBlockState.keys.map(key => {
                if (key.id === draggingKeyId) {
                    return { ...key, position: newPosition };
                }
                return key;
            });

            // Обновляем состояние timelineBlockState.keys новым массивом с обновленными позициями
            timelineBlockState.keys = updatedToolBlockKeys;

            // Обновляем состояние keys из timelineBlockState.keys
            setKeys([...updatedToolBlockKeys]);
        }
    };

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

    const handleKeyEnd = (event) => {
        console.log(draggingKeyId)
        const boundingRect = timelineKeyRef.current.getBoundingClientRect();
        const newPosition = event.clientX - boundingRect.left;
        const updatedToolBlockKeys = timelineBlockState.keys.map(key => {
            if (key.id === draggingKeyId) {
                return { ...key, duration: (newPosition / 150)};
            }
            return key;
        });
        timelineBlockState.keys = updatedToolBlockKeys;
        setKeys([...updatedToolBlockKeys]);

        setIsDraggingKey(false); // Сбрасываем флаг перетаскивания ключа
        document.removeEventListener('mousemove', handleKeyDrag);
    };

    return (
        <div className="timeline-line" ref={timelineKeyRef} onMouseMove={handleKeyDrag} onMouseUp={handleKeyEnd}>
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
    );
});

export default TimelineLine;