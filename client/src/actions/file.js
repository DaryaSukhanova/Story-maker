import fileState from "../store/fileState.js";
import axios from "axios";

export const getFiles = async (dirId) => {
    try {
        const response = await axios.get(`http://localhost:5000/api/v1/files${dirId ? '?parent=' + dirId : ''}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });

        // Установка файлов в хранилище
        setFiles(response.data);
    } catch (error) {
        alert(error.response.data.message);
    }
};

const setFiles = (files) => {
    fileState.setFiles(files); // Предположим, что у хранилища есть метод setFiles для установки файлов
};

export const createDir = async (dirId, name) => {
    try {
        const response = await axios.post(`http://localhost:5000/api/v1/files`, {
            name,
            parent: dirId,
            type: 'dir'
        } , {
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        });

        addFile(response.data);
    } catch (error) {
        alert(error.response.data.message);
    }
};

const addFile = (file) => {
    fileState.addFile(file); 
};