import fileState from "../store/fileState.js";
import pageState from "../store/pageState.js";
import svgCanvasState from "../store/svgCanvasState.js";
// import {addUploadFile, changeUploadFile, showUploader} from "../store/uploadState.js";
import uploadState from "../store/uploadState.js";
import axios from "axios";
import {SVG} from "@svgdotjs/svg.js";
import timelineBlockState from "../store/timelineBlockState";

export const getFiles = async (dirId) => {
    try {
        const response = await axios.get(`http://localhost:5000/api/v1/files${dirId ? '?parent=' + dirId : ''}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        console.log(response.data)
        // Установка файлов в хранилище
        fileState.setFiles(response.data);
    } catch (error) {
        alert(error.response.data.message);
    }
};

export const createDir = async (dirId, name) => {
    try {
        const response = await axios.post(`http://localhost:5000/api/v1/files`, dirId ? {
            name,
            parent: dirId,
            type: 'dir'
        } :
		{
            name,
            type: 'dir'
        } , {
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        });

        fileState.addFile(response.data);
    } catch (error) {
        alert(error.response.data.message);
    }
};

export const uploadFile = async (file, dirId) => {   
    try {
        const formData = new FormData()
        formData.append('file', file)
        if (dirId) {
            formData.append('parent', dirId)
        }
        const uploadFile = {name: file.name, progress: 0, id: Date.now()}
        uploadState.showUploader()
        uploadState.addUploadFile(uploadFile)
        const response = await axios.post(`http://localhost:5000/api/v1/files/upload`, formData, {
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
            onUploadProgress: (progressEvent) => {
                // const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');               
                const totalLength = progressEvent.total;
                if (totalLength) {
                    uploadFile.progress = Math.round((progressEvent.loaded * 100) / totalLength)
                    console.log(uploadFile.progress)
                    uploadState.changeUploadFile(uploadFile)
                }
            }
        });
        fileState.addFile(response.data);
    } catch (error) {
        alert(error.response.data.message)
    }    
};

export const downloadFile = async (file) => {
    console.log(file);
    const response = await fetch(`http://localhost:5000/api/v1/files/download?id=${file._id}`,{
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
    if (response.status === 200) {
        const blob = await response.blob()
        const downloadUrl = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = downloadUrl
        link.download = file.name
        document.body.appendChild(link)
        link.click()
        link.remove()
    }
}

export const addBackground = async (file) => {
	try {
		const response = await axios.get(`http://localhost:5000/api/v1/backgrounds?id=${file._id}`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`
			}
		})
		const canvas = svgCanvasState.canvas
		const svgImageElement = document.createElementNS('http://www.w3.org/2000/svg', 'image')
		svgImageElement.setAttribute('width', '1100')
		svgImageElement.setAttribute('height', '644')
		svgImageElement.setAttribute('href', response.data[0].backgroundImage)
		canvas.appendChild(svgImageElement)
		pageState.addBackground(file)
	} catch (e) {
		console.log(e?.response?.data?.message)
	}
}

// const adjustTransformOrigin = (element, canvasRect) => {
//     const bbox = element.getBBox();
//     const originX = bbox.x + bbox.width / 2;
//     const originY = bbox.y + bbox.height / 2;
//
//     return {
//         x: originX - canvasRect.left,
//         y: originY - canvasRect.top
//     };
// };

export const addAnimation = async (file) => {
    try {
        const response = await axios.get(`http://localhost:5000/api/v1/animations?id=${file._id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });

        const canvas = SVG(svgCanvasState.canvas);
        const canvasRect = canvas.node.getBoundingClientRect();

        response.data.animationData.forEach((item, index) => {
            let svgElement;

            if (item.attributes['type-tool'] === 'circle') {
                svgElement = canvas.circle().attr(item.attributes);
            } else if (item.attributes['type-tool'] === 'rect') {
                svgElement = canvas.rect().attr(item.attributes);
            }

            if (item.isAnimated && item.keys.length > 0) {
                // const newOrigin = adjustTransformOrigin(svgElement, canvasRect);
                const animationName = `animation_${index}`;
                console.log("origin", item.origin.x + svgElement.bbox().x,item.origin.y+ svgElement.bbox().y, item.origin.x,  item.origin.y)
                createAnimationStyle(item.keys, animationName, {x: item.origin.x, y: item.origin.y}, response.data.duration);
                svgElement.attr({
                    style: `animation: ${animationName} ${response.data.duration}s infinite;`
                });
            }
        });

        console.log("SVG elements successfully added to the canvas");
    } catch (e) {
        console.error("Error fetching animation data:", e?.response?.data?.message);
    }
};

const createAnimationStyle = (keys, animationName, origin, animDuration) => {


    const existingStyle = document.querySelector(`style[data-animation="${animationName}"]`);
    if (existingStyle) {
        existingStyle.remove();
    }

    const style = document.createElement('style');
    style.setAttribute('data-animation', animationName);

    let keyframesCSS = `@keyframes ${animationName} {`;
    // Ключевой кадр на 0%
    keyframesCSS += `
        0% {
            transform-origin: ${origin.x}px ${origin.y}px;
            transform: rotate(0deg) scale(1, 1) translate(0px, 0px) skew(0deg, 0deg);
        }
    `;

    keys.forEach(key => {
        const percent = (key.duration / animDuration)*100;
        keyframesCSS += `
            ${percent}% {
                transform-origin: ${origin.x}px ${origin.y}px;
                transform: rotate(${key.rotate}deg) scale(${key.scaleX}, ${key.scaleY}) translate(${key.translateX}px, ${key.translateY}px) skew(${key.skewX}deg, ${key.skewY}deg);
            }
        `;
    });
    const maxDurationKey = keys.reduce((maxKey, currentKey) => {
        return currentKey.duration > maxKey.duration ? currentKey : maxKey;
    }, keys[0]); // Начальное значение - первый ключ

    keyframesCSS += `
        100% {
            transform-origin: ${origin.x}px ${origin.y}px;
            transform: rotate(${maxDurationKey.rotate}deg) scale(${maxDurationKey.scaleX}, ${maxDurationKey.scaleY}) translate(${maxDurationKey.translateX}px, ${maxDurationKey.translateY}px) skew(${maxDurationKey.skewX}deg, ${maxDurationKey.skewY}deg);
        }
    `;
    keyframesCSS += '}';
    style.textContent = keyframesCSS;
    document.head.appendChild(style);
};

export const deleteFile = async (file) => {
	try {
		const response = await axios.delete(`http://localhost:5000/api/v1/files?id=${file._id}`,{
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`
			}
		})
		fileState.deleteFile(file._id)
		alert(response.data.message)
	} catch (e) {
		alert(e?.response?.data?.message)
	}
};