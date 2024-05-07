// import React, {useRef} from 'react';
// import timelineBlockState from "../../store/timelineBlockState";
// import TimelineLine from "./TimelineLine";
// import {observer} from "mobx-react-lite";
// import svgCanvasState from "../../store/svgCanvasState";
// import animationToolState from "../../store/animationToolState";
// import TimelineTool from "./TimelineTool";
// import {logDOM} from "@testing-library/react";

// const TimelineKeyframes = observer(({findNearestTickPosition})  => {
//     const thumbCurrent = useRef(null);
//     // Функция обновления ключей в элементе svgElements
//     const updateKeysInSvgElement = (elementIndex, updatedKeys) => {
//         svgCanvasState.setSvgElements(svgCanvasState.svgElements.map((element, index) => {
//             if (index === elementIndex) {
//                 return {
//                     ...element,
//                     keys: updatedKeys
//                 };
//             }
//             return element;
//         }));

//     };

//     return (
//         <div className="timeline-keyframes">
//             <div className="thumb-current" ref={thumbCurrent} style={{ transform: `translateX(${timelineBlockState.roundedElapsedTime * (150 / 1000)-1}px)` }}></div>
//             {svgCanvasState.svgElements.map((svgElement, index) => (
//                 svgElement.isAnimated && animationToolState.tool === 'keyframeElement' && (
//                 <TimelineLine
//                     key={index}
//                     id={svgElement.id}
//                     findNearestTickPosition={findNearestTickPosition}
//                     keyframesKeys={svgElement.keys}
//                 />
//                 )
//             ))}

//         </div>
//     );
// });

// export default TimelineKeyframes;