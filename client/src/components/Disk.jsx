import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {getFiles, uploadFile} from '../actions/file.js';
import fileState from '../store/fileState.js';
import FileList from "./FileList";
import '../styles/disk.scss'
import Popup from "./Popup";
import Uploader from './Uploader.jsx';

const Disk = observer(() => {

    const currentDir = fileState.currentDir;
    const [dragEnter, setDragEnter] = useState(false);

    useEffect(() => {
        getFiles(currentDir) // Вызываем метод получения файлов при изменении текущей директории
    }, [currentDir]);

    const showPopupHandler = () =>{
        fileState.setPopupDisplay('flex')
    }

    const backClickHandler = () =>{
        const backDirId = fileState.dirStack.pop()
        fileState.setCurrentDir(backDirId)
    }

    const fileUploadHandler = (event) => {
        const files = [...event.target.files]
        files.forEach((file) => uploadFile(file, currentDir))
    }

    const dragEnterHandler = (event) => {
        event.preventDefault()
        event.stopPropagation()
        setDragEnter(true)
    }

    const dragLeaveHandler = (event) =>{
        event.preventDefault()
        event.stopPropagation()
        setDragEnter(false)
    }

    const dropHandler = (event) =>{
        event.preventDefault()
        event.stopPropagation()
        let files = [...event.dataTransfer.files]
        files.forEach((file) => uploadFile(file, currentDir))
        setDragEnter(false)
    }

    return ( !dragEnter ?
        <div className="disk" onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
            <div className="disk__btns">
                <button className="disk__back" onClick={() => backClickHandler()}>Назад</button>
                <button className="disk__create" onClick={()=>showPopupHandler()}>Создать папку</button>
                <div className="disk__upload">
                    <label htmlFor="disk__upload-input" className="disk__upload-label">Загрузить файл</label>
                    <input multiple={true} onChange={(event)=> fileUploadHandler(event)} type="file" id="disk__upload-input" className="disk__upload-input"/>
                </div>
            </div>
            Disk
            <FileList/>
            <Popup/>
            <Uploader/>
        </div>
        :
        <div className="drop-area" onDrop={dropHandler} onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
            Перетащите файлы сюда
        </div>
    );
});

export default Disk;