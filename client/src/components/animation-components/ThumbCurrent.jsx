import React, { useState, useEffect } from 'react';
import timelineBlockState from "../../store/timelineBlockState";

import {observer} from "mobx-react-lite";

const ThumbCurrent = observer (() => {

    useEffect(() => {

    }, [timelineBlockState.thumbCurrentPosition]);

    return (
        <div className="thumb-current" style={{ left: `${timelineBlockState.thumbCurrentPosition}px` }}></div>
    );
});

export default ThumbCurrent;
