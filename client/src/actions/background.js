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

    // Создаем новый холст-контейнер
    const containerCanvas = document.createElement('canvas');
    const containerCtx = containerCanvas.getContext('2d');

    // Устанавливаем размеры холста-контейнера
    containerCanvas.width = 1100;
    containerCanvas.height = 644;

    Object.values(layerState.layers).map((layer, index) => {
        const layerCanvas = layer.ref.current;
        containerCtx.drawImage(layerCanvas, 0, 0);
    });

    // Получаем данные в формате Data URL из холста-контейнера
    const dataUrl = containerCanvas.toDataURL('image/png');

    // Разбиваем Data URL на части (если необходимо)
    const imageChunks = splitDataUrlIntoChunks(dataUrl, CHUNK_SIZE);

    // Отправляем каждую часть на сервер
    const promises = imageChunks.map((chunk, index) => {
        return axios.post(`http://localhost:5000/api/v1/backgrounds`, {
            backgroundName: `${name.current.value}_${index}`,
            backgroundImage: chunk
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
    });

    // Дожидаемся завершения всех запросов
    Promise.all(promises)
        .then(responses => {
            responses.forEach(response => console.log(response.data));
            console.log('All chunks uploaded successfully.', promises);
        })
        .catch(error => console.error('Error uploading chunks:', error));
};


