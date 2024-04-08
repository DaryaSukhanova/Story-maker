import React, {useEffect, useRef, useState} from 'react';
import canvasState from "../../store/canvasState";
import toolState from "../../store/toolState";
import Tool from "../../tools/graphic-tools/Tool";
import LayerSelector from "../LayerSelector";
import '../../styles/layers-block.scss'
import layerState from "../../store/layerState";
import Line from "../../tools/graphic-tools/Line";
import CustomImage from "../../tools/graphic-tools/CustomImage";

const LayersBlock = () => {
    const newLayerRef = useRef(null);

    const [file, setFile] = useState(null);
    const fileInputRef = useRef(null); // Ссылка на элемент input file
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0]; // Получаем выбранный файл из события
        setFile(selectedFile); // Обновляем состояние файла
    };
    useEffect(() => {
        if (file) {
            const canvas = canvasState.canvas;
            const ctx = canvas.getContext('2d');

            // Создаем новый элемент изображения
            const img = new Image();

            // Устанавливаем обработчик загрузки изображения
            img.onload = () => {
                // Очищаем холст перед рисованием нового изображения
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                // Рассчитываем координаты для размещения изображения внизу холста
                const x = (canvas.width - img.width) / 2; // по горизонтали в центре
                const y = canvas.height - img.height; // по вертикали внизу
                // Рисуем изображение на холсте
                ctx.drawImage(img, x, y);
            };

            // Устанавливаем источник изображения как выбранный файл
            img.src = URL.createObjectURL(file);
        }
    }, [file]); // Вызываем эффект только при изменении файла

    const handleAddLayer = () => {
        layerState.addLayer(newLayerRef);
    };
    const handleRemoveLayer = () => {
        const activeIndex = layerState.layers.findIndex(layer => layer.isActive);
        if(layerState.layers.length > 1){
            layerState.removeLayer(activeIndex);
        }

    };
    return (
        <div className="block-container">
            <div className="setting-block layer">
                <div>
                    <div className="tool-bar-item-title">Слои</div>
                    <div className="layer-buttons">
                        <button className="layer-buttons__btn add-layer" onClick={handleAddLayer}></button>
                        <button className="layer-buttons__btn remove-layer" onClick={handleRemoveLayer}></button>
                    </div>

                    <LayerSelector />
                </div>

                <div>
                    <div className="tool-bar-item-title">Загрузка изображения</div>
                    <div className="upload-img-container">
                        <label htmlFor="fileInput" className="upload-img">Загрузить</label>
                        <input type="file" id="fileInput" ref={fileInputRef} onChange={handleFileChange} />
                    </div>
                </div>



                {/*<input type="file" id="fileInput" accept="image/*">*/}
                {/*<button className="tool-bar__btn-tools line" onClick={()=> toolState.setTool(new CustomImage(canvasState.canvas))}/>*/}
            </div>
        </div>
    );
};


export default LayersBlock;