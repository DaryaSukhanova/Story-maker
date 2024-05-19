// UploadImageBlock.js
import React, { useEffect, useRef, useState } from 'react';
import canvasState from "../../store/canvasState";
import '../../styles/layers-block.scss';

const UploadImageBlock = () => {
    const [file, setFile] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };

    useEffect(() => {
        if (file) {
            const canvas = canvasState.canvas;
            const ctx = canvas.getContext('2d');

            const img = new Image();

            img.onload = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                const x = (canvas.width - img.width) / 2;
                const y = canvas.height - img.height;
                ctx.drawImage(img, x, y);
            };

            img.src = URL.createObjectURL(file);
        }
    }, [file]);

    return (
        <div>
            <div className="tool-bar-item-title">Загрузка изображения</div>
            <div className="upload-img-container">
                <label htmlFor="fileInput" className="upload-img">Загрузить</label>
                <input type="file" id="fileInput" ref={fileInputRef} onChange={handleFileChange} />
            </div>
        </div>
    );
};

export default UploadImageBlock;

