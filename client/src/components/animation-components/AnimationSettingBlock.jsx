import React, {useEffect, useRef, useState} from 'react';
import '../../styles/animation-setting-block.scss'
import animationToolState from "../../store/animationToolState";
import MotionCurve from "../../tools/animation-tools/MotionCurve";
import svgCanvasState from "../../store/svgCanvasState";
import svgToolState from "../../store/svgToolState";
import {observer} from "mobx-react-lite";
import TransformBlock from "./TransformBlock";
import toolBlockState from "../../store/timelineBlockState";
import KeyFrameManager from "../../tools/animation-tools/KeyFrameManager";
import timelineBlockState from "../../store/timelineBlockState";
import {action} from "mobx";
import {logDOM} from "@testing-library/react";

const AnimationSettingBlock = observer(() => {
    const motionCurveRef = useRef(null);
    const keyFrameManagerRef = useRef(null);

    useEffect(() => {
        if (svgCanvasState.canvas) {
            // motionCurveRef.current = new MotionCurve(svgCanvasState.canvas);
            // keyFrameManagerRef.current = new KeyFrameManager(svgCanvasState.canvas);
        }
    }, [svgCanvasState.canvas]);

    const handleMotionCurveClick = () => {
        // Вызов метода listen из MotionCurve, если он уже инициализирован
        if (!motionCurveRef.current) {
            motionCurveRef.current = new MotionCurve(svgCanvasState.canvas);
        }
        animationToolState.setAnimationTool(motionCurveRef.current);
    };


    const handleKeyframeClick = () => {
        // svgCanvasState.svgElements.forEach(svgElement => {
        //     if (svgElement.shape) { // Проверяем, существует ли svgElement.shape
        //         svgElement.shape.on('click', action(() => {
        //             svgElement.isAnimated = !svgElement.isAnimated;
        //         }));
        //     } else {
        //         console.error("svgElement.shape is null or undefined");
        //     }
        // });

        if (!keyFrameManagerRef.current) {
            keyFrameManagerRef.current = new KeyFrameManager(svgCanvasState.canvas);
        }
        animationToolState.setAnimationTool(keyFrameManagerRef.current);
        console.log(animationToolState.currentTool)
        console.log(svgCanvasState.svgElements)

    };

    // Определяем, какой инструмент анимации сейчас выбран
    let selectedToolContent;
    if (animationToolState.currentTool instanceof MotionCurve) {
        selectedToolContent = <div>Содержимое для MotionCurve</div>;
    } else if (animationToolState.currentTool instanceof KeyFrameManager) {
        selectedToolContent = <TransformBlock />;
    } else {
        selectedToolContent = <div>Select a tool</div>; // Или какой-то другой дефолтный контент
    }


    return (
        <div className="block-container">
            <div className="setting-block">
                <div className="animation-setting-block-title">
                    Настройки анимации
                </div>
                <div className="animation-setting-block-btns">
                    <button
                        className={`animation-setting-block-btns__btn motionCurve `}
                        onClick={handleMotionCurveClick} />
                    <button
                        className={`animation-setting-block-btns__btn keyframeElement `}
                        onClick={handleKeyframeClick} />
                </div>
                <div className="animation-setting-block-data">
                    {selectedToolContent}
                </div>
            </div>
        </div>
    );
});

export default AnimationSettingBlock;
