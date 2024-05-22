import React, { useState } from 'react';
import timelineBlockState from "../../store/timelineBlockState";
import { observer } from "mobx-react-lite";
import svgCanvasState from "../../store/svgCanvasState";

const TimelineTool = observer(({ element }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(element.shape.type);

    const handleAddKeyClick = () => {
        svgCanvasState.addKeyframeToElement(element.id);
    };

    const handleRemoveKeyClick = () => {
        svgCanvasState.removeKeyframeFromElement(element.id, svgCanvasState.activeKey);
    };

    const handleTitleClick = () => {
        setIsEditing(true);
    };

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleTitleBlur = () => {
        setIsEditing(false);
        // Сохранение изменений в элементе, если необходимо
        element.shape.type = title;
    };

    return (
        <div className="timeline-animation-tool">
            {isEditing ? (
                <input
                    type="text"
                    value={title}
                    onChange={handleTitleChange}
                    onBlur={handleTitleBlur}
                    autoFocus
                    className="timeline-animation-tool__input" 
                />
            ) : (
                <div className="timeline-animation-tool__title" onClick={handleTitleClick}>
                    {title}
                </div>
            )}
            <div className='timeline-animation-tool__key-action'>
                <div className="key-remove" onClick={handleRemoveKeyClick}></div>
                <div className="key-add" onClick={handleAddKeyClick}></div>
            </div>
        </div>
    );
});

export default TimelineTool;
