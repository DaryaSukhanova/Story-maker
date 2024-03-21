import React from 'react';
import Toolbar from "../graphic-components/Toolbar";
import SvgToolbar from "./SvgToolbar";
import SvgSettingBar from "./SvgSettingBar";
import "../../styles/drawing-block.scss"
import SvgToolsBlock from "./SvgToolsBlock";
const SvgDrawingBlock = () => {
    return (
        <div className="block-container">
            <div className="setting-block">
                <SvgToolbar></SvgToolbar>
            </div>
        </div>

    );
};

export default SvgDrawingBlock;
