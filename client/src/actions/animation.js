import axios from "axios"
import animationToolState from "../store/animationToolState"
import svgCanvasState from "../store/svgCanvasState"
import timelineBlockState from "../store/timelineBlockState";

export const saveAnimation = async(name, closeModal) => {
    closeModal();
    // animationToolState.isAnimationSaved = true;
    console.log(svgCanvasState.svgElements)
    const serializedData = JSON.stringify(serializeSvgElements());
    console.log("serializedData", serializedData)

    try {
        const response = await axios.post('http://localhost:5000/api/v1/animations', {
            name: name.current.value,
            animationData: serializedData,
            duration: timelineBlockState.totalTime
        }, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        console.log('Animation saved successfully', response.data);
        animationToolState.isAnimationSaved = true;
    } catch (error) {
        console.error('Error saving animation:', error);
    }

}

const serializeSvgElements = () => {
    return svgCanvasState.svgElements.map(svgElement => {
        const attributes = svgElement.shape.node.attributes;
        const attrsObj = {};

        for (let i = 0; i < attributes.length; i++) {
            const attr = attributes[i];
            if (attr.name !== 'style') { 
                attrsObj[attr.name] = attr.value;
            }
        }

        return {
            isAnimated: svgElement.isAnimated,
            keys: svgElement.keys,
            attributes: attrsObj,
            origin: svgElement.origin,
            pathData: svgElement.pathData
        };
    });
};
