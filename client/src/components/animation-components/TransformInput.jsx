import React, { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';

const TransformInput = ({ id1, label1, min1, max1, step1, type1, onChange1, value1, id2, label2, min2, max2, step2, type2, onChange2, value2 }) => {
    const [inputValue1, setInputValue1] = useState(value1);
    const [isValid1, setIsValid1] = useState(true);

    const [inputValue2, setInputValue2] = useState(value2);
    const [isValid2, setIsValid2] = useState(true);

    useEffect(() => {
        setInputValue1(value1);
    }, [value1]);

    useEffect(() => {
        setInputValue2(value2);
    }, [value2]);

    const handleChange1 = (e) => {
        let sanitizedValue = DOMPurify.sanitize(e.target.value);
        setInputValue1(sanitizedValue);
        const value = parseFloat(sanitizedValue);

        if (!isNaN(value) && value >= min1 && value <= max1) {
            setIsValid1(true);
            onChange1({ ...e, target: { ...e.target, value: sanitizedValue } });
        } else {
            setIsValid1(false);
        }
    };

    const handleChange2 = (e) => {
        let sanitizedValue = DOMPurify.sanitize(e.target.value);
        setInputValue2(sanitizedValue);
        const value = parseFloat(sanitizedValue);

        if (!isNaN(value) && value >= min2 && value <= max2) {
            setIsValid2(true);
            onChange2({ ...e, target: { ...e.target, value: sanitizedValue } });
        } else {
            setIsValid2(false);
        }
    };

    return (
        <div className="transform-block__entry">
            <label htmlFor={id1}>{label1}</label>
            <div className="transform-block__entry__input">
                <input
                    type="text"
                    id={id1}
                    onChange={handleChange1}
                    value={inputValue1}
                    className={isValid1 ? 'transform-input' : 'transform-input input-error'}
                />
                <span className="transform-block__entry__type">{type1}</span>
            </div>
            <div className="transform-block__entry__input">
                <input
                    type="text"
                    id={id2}
                    onChange={handleChange2}
                    value={inputValue2}
                    className={isValid2 ? 'transform-input' : 'transform-input input-error'}
                />
                <span className="transform-block__entry__type">{type2}</span>
            </div>
        </div>
    );
};

export default TransformInput;