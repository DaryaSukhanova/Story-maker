import React from 'react';
import '../../styles/animation-setting-block.scss'
import animationToolState from "../../store/animationToolState";
import MotionCurve from "../../tools/MotionCurve";
import svgCanvasState from "../../store/svgCanvasState";
import svgToolState from "../../store/svgToolState";

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
                    <button className="animation-setting-block-btns__btn motionCurve" onClick={handleMotionCurveClick} />
                </div>
            </div>
        </div>
    );
};

export default AnimationSettingBlock;
