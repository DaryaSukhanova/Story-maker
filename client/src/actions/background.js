import layerState from "../store/layerState";
import axios from "axios";
const CHUNK_SIZE = 80 * 1024;

// Функция для разделения Data URL на части
function splitDataUrlIntoChunks(dataUrl, chunkSize) {
    const chunks = [];
    let start = 0;

    while (start < dataUrl.length) {
        chunks.push(dataUrl.slice(start, start + chunkSize));
        console.log(start, dataUrl.length)
        start += chunkSize;
        console.log(dataUrl.slice(start, start + chunkSize))
    }

    return chunks;
}
export const saveBackground = async (name, closeModal) => {
    closeModal();

    const containerCanvas = document.createElement('canvas');
    const containerCtx = containerCanvas.getContext('2d');
    // Устанавливаем размеры холста-контейнера
    containerCanvas.width = 1100;
    containerCanvas.height = 644;
    Object.values(layerState.layers).map((layer, index) => {
        const layerCanvas = layer.ref.current;
        containerCtx.drawImage(layerCanvas, 0, 0);
    });

    const dataUrl = containerCanvas.toDataURL('image/png');

    const formData = new FormData();
    formData.append('backgroundName', name.current.value);
    formData.append('backgroundImage', dataUrl);

    try {
        const response = await axios.post('http://localhost:5000/api/v1/backgrounds', formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Устанавливаем заголовок Content-Type как multipart/form-data
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        console.log(response.data);
    } catch (error) {
        console.error('Error saving background:', error);
    }
};


