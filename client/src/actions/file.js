import fileState from "../store/fileState.js";
import pageState from "../store/pageState.js";
import svgCanvasState from "../store/svgCanvasState.js";
// import {addUploadFile, changeUploadFile, showUploader} from "../store/uploadState.js";
import uploadState from "../store/uploadState.js";
import axios from "axios";
import {SVG} from "@svgdotjs/svg.js";
import { createAnimationStyle } from "../tools/animation-tools/animationStylesManager.js";
import timelineBlockState from "../store/timelineBlockState";
import AnimationMotionCurveController from "../tools/animation-tools/AnimationMotionCurveController.js";

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
        pageState.backgrounds.push(file._id)
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
        pageState.animations.push(file._id)
        const response = await axios.get(`http://localhost:5000/api/v1/animations?id=${file._id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });

        const canvas = SVG(svgCanvasState.canvas);
        const canvasRect = canvas.node.getBoundingClientRect();
        console.log(response.data);
        const animationController = new AnimationMotionCurveController();
        response.data.animationData.forEach((item, index) => {
            let svgElement;

            // Создание SVG элементов в зависимости от типа инструмента
            switch (item.attributes['type-tool']) {
                case 'circle':
                    svgElement = canvas.circle().attr(item.attributes);
                    break;
                case 'rect':
                    svgElement = canvas.rect().attr(item.attributes);
                    break;
                case 'line':
                    svgElement = canvas.line().attr(item.attributes);
                    break;
                case 'polygon':
                    svgElement = canvas.polygon().attr(item.attributes);
                    break;
                case 'path':
                    svgElement = canvas.path().attr(item.attributes);
                    break;
                default:
                    console.warn("Unsupported SVG element type:", item.attributes['type-tool']);
                    return; // Пропускаем необрабатываемые типы
            }

            if (item.isAnimated && item.keys.length > 0) {
                const animationName = `animation_${index}`;
                createAnimationStyle({x: item.origin.x, y: item.origin.y}, item.keys, index, response.data.duration, animationName);
                svgElement.attr({
                    style: `animation: ${animationName} ${response.data.duration}s infinite;`
                });
            }
            if (item.pathData) {
                const path = canvas.path(item.pathData); 
                
                console.log(path)
                path.attr({
                    fill: "none",
                    stroke: "black",
                    "stroke-width": 2,
                    display: "none"
                });
                animationController.initializeAnimation(
                    svgElement,
                    path,
                    response.data.duration,
                    false, // Используем флаг
                    true, // Флаг isRunningThumb
                    null // Храним блок с таймлайном
                );
            }
        });

        console.log("SVG elements successfully added to the canvas");
    } catch (e) {
        console.error("Error fetching animation data:", e?.response?.data?.message);
    }
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