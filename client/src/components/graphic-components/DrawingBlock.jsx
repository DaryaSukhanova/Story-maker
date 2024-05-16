import React from 'react';

import Toolbar from "./Toolbar";

import '../../styles/setting-block.scss'

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