import axios from "axios";
import canvasState from "../store/canvasState";
import layerState from "../store/layerState";

export const saveBackground = async (name, closeModal) => {
    closeModal();

    // Создаем новый холст-контейнер
    const containerCanvas = document.createElement('canvas');
    const containerCtx = containerCanvas.getContext('2d');

    // Устанавливаем размеры холста-контейнера
    containerCanvas.width = 1100;
    containerCanvas.height = 644;

    // Отрисовываем содержимое каждого холста на холсте-контейнере
    // for (let layer in layerState.layers) {
    //
    // }
    Object.values(layerState.layers).map((layer, index) => {
        const layerCanvas = layer.ref.current;
        containerCtx.drawImage(layerCanvas, 0, 0);
    });

    // Получаем данные в формате Data URL из холста-контейнера
    const dataUrl = containerCanvas.toDataURL('image/png');

    // Отправляем данные на сервер
    axios.post(`http://localhost:5000/api/v1/backgrounds`, {
        backgroundName: name.current.value,
        backgroundImage: dataUrl
    })
        .then(response => console.log(response.data))
        .catch(error => console.error(error));
};