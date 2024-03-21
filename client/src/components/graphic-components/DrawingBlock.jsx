import React from 'react';
import SvgToolbar from "../animation-components/SvgToolbar";
import SvgSettingBar from "../animation-components/SvgSettingBar";
import Toolbar from "./Toolbar";
import SettingBar from "./SettingBar";

const DrawingBlock = () => {
    return (
        <div className="block-container">
            <div className="setting-block">
                <Toolbar></Toolbar>
            </div>
        </div>
    );
};

export default DrawingBlock;