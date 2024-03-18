import React, {useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {getFiles} from '../actions/file.js';
import fileState from '../store/fileState.js';
import FileList from "./FileList";
import '../styles/disk.scss'
import Popup from "./Popup";

const Disk = observer(() => {

    const currentDir = fileState.currentDir;

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

    return (
        <div className="disk">
            <div className="disk__btns">
                <button className="disk__back" onClick={() => backClickHandler()}>Назад</button>
                <button className="disk__create" onClick={()=>showPopupHandler()}>Создать папку</button>
            </div>
            Disk
            <FileList/>
            <Popup/>
        </div>
    );
});

export default Disk;