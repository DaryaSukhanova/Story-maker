import React from 'react';

const TransformInput = ({ id, label, min, max, step, type, onChange }) => {
    return (
        <div className="transform-block__entry">
            <label htmlFor={id}>{label}</label>
            <div className="transform-block__entry__input">
                <input
                    type="number"
                    id={id}
                    onChange={onChange}
                    min={min}
                    max={max}
                    step={step}
                />
                <span className="transform-block__entry__type">{type}</span>
            </div>
        </div>
    );
};

export default TransformInput;