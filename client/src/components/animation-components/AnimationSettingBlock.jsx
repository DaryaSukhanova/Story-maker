import React, {useRef, useState} from 'react';
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

const AnimationSettingBlock = observer(() => {
    const keyframeManagerRef = useRef(null); // Добавляем ref для хранения экземпляра AnimationManager
    const handleMotionCurveClick = () => {
        animationToolState.setAnimationTool('motionCurve')
    };

    const handleKeyframeClick = () => {
        svgCanvasState.canvas.onmousemove = null;
        svgCanvasState.canvas.onmousedown = null;
        svgCanvasState.canvas.onmouseup = null;
        animationToolState.setAnimationTool('keyframeElement')

        svgCanvasState.svgElements.forEach(svgElement => {
            svgElement.shape.on('click', action(() => {
                svgElement.isAnimated = !svgElement.isAnimated;
            }));
        });

    };

    // Определяем, какой инструмент анимации сейчас выбран
    let selectedToolContent = null;
    if (animationToolState.tool === 'motionCurve') {
        selectedToolContent = <div>Содержимое для MotionCurve</div>;
    } else if (animationToolState.tool === 'keyframeElement') {
        selectedToolContent = <TransformBlock/>
    }

    return (
        <div className="block-container">
            <div className="setting-block">
                <div className="animation-setting-block-title">
                    Настройки анимации
                </div>
                <div className="animation-setting-block-btns">
                    <button
                        className={`animation-setting-block-btns__btn motionCurve ${animationToolState.tool === 'motionCurve' ? 'active-animation-setting-btn' : ''}`}
                        onClick={handleMotionCurveClick} />
                    <button
                        className={`animation-setting-block-btns__btn keyframeElement ${animationToolState.tool === 'keyframeElement' ? 'active-animation-setting-btn' : ''}`}
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
