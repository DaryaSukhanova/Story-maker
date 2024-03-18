import fileState from "../store/fileState.js";
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
        const response = await axios.post(`http://localhost:5000/api/v1/files`, {
            name,
            parent: dirId,
            type: 'dir'
        } , {
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        });

        fileState.addFile(response.data);
    } catch (error) {
        alert(error.response.data.message);
    }
};