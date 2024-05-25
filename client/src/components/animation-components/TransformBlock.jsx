import React, { useState, useEffect } from 'react';
import { observer } from "mobx-react-lite";
import '../../styles/transform-block.scss';
import TransformInput from "./TransformInput";
import svgCanvasState from "../../store/svgCanvasState";

const TransformBlock = observer(() => {
    const [angleDeg, setAngleDeg] = useState(0);
    const [angleTurn, setAngleTurn] = useState(0);
    const [scaleX, setScaleX] = useState(1);
    const [scaleY, setScaleY] = useState(1);
    const [positionX, setPositionX] = useState(0);
    const [positionY, setPositionY] = useState(0);
    const [skewX, setSkewX] = useState(0);
    const [skewY, setSkewY] = useState(0);
    const [origin, setOrigin] = useState("center");

    useEffect(() => {
        const activeElement = svgCanvasState.svgElements.find(el => el.id === svgCanvasState.activeElement);
        if (activeElement) {
            const activeKey = activeElement.keys.find(key => key.id === svgCanvasState.activeKey);
            if (activeKey) {
                setAngleDeg(activeKey.rotate || 0);
                setAngleTurn((activeKey.rotate || 0) / 360);
                setScaleX(activeKey.scaleX || 1);
                setScaleY(activeKey.scaleY || 1);
                setPositionX(activeKey.translateX || 0);
                setPositionY(activeKey.translateY || 0);
                setSkewX(activeKey.skewX || 0);
                setSkewY(activeKey.skewY || 0);
            }
        }
    }, [svgCanvasState.activeElement, svgCanvasState.activeKey]);

    const handleAngleDeg = (event) => {
        const value = parseFloat(event.target.value);
        if (!isNaN(value)) {
            setAngleDeg(value);
            svgCanvasState.updateKeyframeField(svgCanvasState.activeElement, svgCanvasState.activeKey, "rotate", value);
        }
    };

    const handleAngleTurn = (event) => {
        const value = parseFloat(event.target.value);
        if (!isNaN(value)) {
            const degrees = value * 360;
            setAngleTurn(value);
            svgCanvasState.updateKeyframeField(svgCanvasState.activeElement, svgCanvasState.activeKey, "rotate", degrees);
        }
    };

    const handleScaleX = (event) => {
        const value = parseFloat(event.target.value);
        if (!isNaN(value)) {
            setScaleX(value);
            svgCanvasState.updateKeyframeField(svgCanvasState.activeElement, svgCanvasState.activeKey, "scaleX", value);
        }
    };

    const handleScaleY = (event) => {
        const value = parseFloat(event.target.value);
        if (!isNaN(value)) {
            setScaleY(value);
            svgCanvasState.updateKeyframeField(svgCanvasState.activeElement, svgCanvasState.activeKey, "scaleY", value);
        }
    };

    const handlePositionX = (event) => {
        const value = parseFloat(event.target.value);
        if (!isNaN(value)) {
            setPositionX(value);
            svgCanvasState.updateKeyframeField(svgCanvasState.activeElement, svgCanvasState.activeKey, "translateX", value);
        }
    };

    const handlePositionY = (event) => {
        const value = parseFloat(event.target.value);
        if (!isNaN(value)) {
            setPositionY(value);
            svgCanvasState.updateKeyframeField(svgCanvasState.activeElement, svgCanvasState.activeKey, "translateY", value);
        }
    };

    const handleSkewX = (event) => {
        const value = parseFloat(event.target.value);
        if (!isNaN(value)) {
            setSkewX(value);
            svgCanvasState.updateKeyframeField(svgCanvasState.activeElement, svgCanvasState.activeKey, "skewX", value);
        }
    };

    const handleSkewY = (event) => {
        const value = parseFloat(event.target.value);
        if (!isNaN(value)) {
            setSkewY(value);
            svgCanvasState.updateKeyframeField(svgCanvasState.activeElement, svgCanvasState.activeKey, "skewY", value);
        }
    };

    const handleOriginChange = (event) => {
        const newOrigin = event.target.value;
        setOrigin(newOrigin);
        svgCanvasState.updateElementOrigin(svgCanvasState.activeElement, newOrigin);
    };

    const inputFields = [
        [
            { id: "angleInputTurn", label: "Угол", min: 0, max: 10, step: 0.1, type: "turn", onChange1: handleAngleTurn, value: angleTurn },
            { id: "angleInputDeg", label: "Угол", min: 0, max: 360, step: 1, type: "deg", onChange2: handleAngleDeg, value: angleDeg },
        ],
        [
            { id: "scaleInputX", label: "Масштаб", min: 0, max: 10, step: "0.01", type: "X", onChange1: handleScaleX, value: scaleX },
            { id: "scaleInputY", label: "Масштаб", min: 0, max: 10, step: "0.01", type: "Y", onChange2: handleScaleY, value: scaleY },
        ],
        [
            { id: "positionInputX", label: "Позиция", min: -1000, max: 1000, step: "0.01", type: "X", onChange1: handlePositionX, value: positionX },
            { id: "positionInputY", label: "Позиция", min: -1000, max: 1000, step: "0.01", type: "Y", onChange2: handlePositionY, value: positionY },
        ],
        [
            { id: "skewInputX", label: "Искажение", min: 0, max: 360, step: 1, type: "X", onChange1: handleSkewX, value: skewX },
            { id: "skewInputY", label: "Искажение", min: 0, max: 360, step: 1, type: "Y", onChange2: handleSkewY, value: skewY },
        ]
    ];

    const originOptions = [
        { value: "center", label: "Центр" },
        { value: "top-left", label: "Сверху слева" },
        { value: "top-right", label: "Сверху справа" },
        { value: "bottom-left", label: "Снизу слева" },
        { value: "bottom-right", label: "Снизу справа" }
    ];

    return (
        <div className="transform-block__container">
            <div className="animation-setting-block-title">Трансформация</div>
            <div className="transform-block__options">
                {inputFields.map((input, index) => (
                    <TransformInput
                        key={index}
                        id1={input[0].id}
                        label1={input[0].label}
                        min1={input[0].min}
                        max1={input[0].max}
                        step1={input[0].step}
                        type1={input[0].type}
                        onChange1={input[0].onChange1}
                        value1={input[0].value}
                        id2={input[1].id}
                        label2={input[1].label}
                        min2={input[1].min}
                        max2={input[1].max}
                        step2={input[1].step}
                        type2={input[1].type}
                        onChange2={input[1].onChange2}
                        value2={input[1].value}
                    />
                ))}
            </div>

            <div className="transform-block__entry">
                <label className='label-select' htmlFor="originSelect">Точка трансформации</label>
                <select className='transform-block__entry__select' id="originSelect" value={origin} onChange={handleOriginChange}>
                    {originOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
});

export default TransformBlock;
