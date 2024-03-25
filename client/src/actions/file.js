import fileState from "../store/fileState.js";
// import {addUploadFile, changeUploadFile, showUploader} from "../store/uploadState.js";
import uploadState from "../store/uploadState.js";
import axios from "axios";

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