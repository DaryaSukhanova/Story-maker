import React from 'react';
import '../../styles/animation-setting-block.scss'
import animationToolState from "../../store/animationToolState";
import MotionCurve from "../../tools/animation-tools/MotionCurve";
import svgCanvasState from "../../store/svgCanvasState";
import svgToolState from "../../store/svgToolState";
import RotateElement from "../../tools/animation-tools/RotateElement";

const AnimationSettingBlock = () => {
    const handleMotionCurveClick = () => {
        if (svgToolState.isDrawn) {
            animationToolState.setAnimationTool(new MotionCurve(svgCanvasState.canvas));
        } else {
            alert('Сначала нарисуйте SVG элемент');
        }
    };

    return (
        <div className="block-container">
            <div className="setting-block">
                <div className="animation-setting-block-title">
                    Animation Settings
                </div>
                <div className="animation-setting-block-btns">
                    <button className="animation-setting-block-btns__btn motionCurve" onClick={()=>{animationToolState.setAnimationTool(new MotionCurve(svgCanvasState.canvas))}} />
                    <button className="animation-setting-block-btns__btn motionCurve" onClick={()=> {animationToolState.setAnimationTool(new RotateElement(svgCanvasState.canvas))}} />
                </div>
            </div>
        </div>
    );
};

export default AnimationSettingBlock;
