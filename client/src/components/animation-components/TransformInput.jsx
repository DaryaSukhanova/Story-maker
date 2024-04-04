import React from 'react';

const TransformInput = ({ id1, label1, min1, max1, step1, type1, onChange1, id2, label2, min2, max2, step2, type2, onChange2 }) => {
    return (
        <div className="transform-block__entry">
            <label htmlFor={id1}>{label1}</label>
            <div className="transform-block__entry__input">
                <input
                    type="number"
                    id={id1}
                    onChange={onChange1}
                    min={min1}
                    max={max1}
                    step={step1}
                />
                <span className="transform-block__entry__type">{type1}</span>
            </div>
            <div className="transform-block__entry__input">
                <input
                    type="number"
                    id={id2}
                    onChange={onChange2}
                    min={min2}
                    max={max2}
                    step={step2}
                />
                <span className="transform-block__entry__type">{type2}</span>
            </div>
        </div>

    );
};

export default TransformInput;