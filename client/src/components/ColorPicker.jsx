import React, {useState} from 'react';
import {SketchPicker} from "react-color";

const ColorPicker = ({ currentColor, handleColorChange }) => {
    return (
        <div>
            <div className="tool-bar-item-title">Color</div>
            <div className="color-picker-container">
                <SketchPicker
                    color={currentColor}
                    onChangeComplete={handleColorChange}
                />
            </div>
        </div>
    );
};

export default ColorPicker;