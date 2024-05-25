import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import Toolbar from "./Toolbar";

import '../../styles/setting-block.scss'

const DrawingBlock = () => {
    const [isVisible, setIsVisible] = useState(true);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };
    return (
        <div className={` ${isVisible ? 'block-container' : 'hidden-block'}`}>
            <div className={`setting-block ${isVisible ? '' : 'hidden'}`}>
                <Toolbar />
            </div>
            <button id="toggleButtonLeft" className="icon-button left" onClick={toggleVisibility}>
                <FontAwesomeIcon 
                icon={faChevronLeft} 
                style={{ color: "#e0e0e0", transform: isVisible ? 'none' : 'rotate(180deg)', transition: 'transform 0.3s ease' }} />
            </button>
        </div>
    );
};

export default DrawingBlock;