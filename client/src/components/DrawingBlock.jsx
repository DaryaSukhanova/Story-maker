import React from 'react';
import Toolbar from "./Toolbar";
import SvgToolbar from "./SvgToolbar";
import SvgSettingBar from "./SvgSettingBar";
import "../styles/drawing-block.scss"
const DrawingBlock = () => {
    return (
        <div className="block-container">
            <div className="setting-block">
                <SvgToolbar></SvgToolbar>
                <SvgSettingBar></SvgSettingBar>
            </div>
        </div>

    );
};

export default DrawingBlock;
