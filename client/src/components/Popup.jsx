import React, {useState} from 'react';
import Input from "./Input";
import {observer} from "mobx-react-lite";
import {createDir} from '../actions/file.js';
import fileState from '../store/fileState.js';

const Popup = observer(() => {
    const [dirName, setDirName] = useState('')
    const popupDisplay = fileState.popupDisplay
    const currentDir = fileState.currentDir

    const createHandler = () =>{  
        createDir(currentDir, dirName)
    }

    return (
        <div className="popup" onClick={() => fileState.setPopupDisplay('none')} style={{display: popupDisplay}}>
            <div className="popup__content" onClick={(event => event.stopPropagation())}>
                <div className="popup__header">
                    <div className="popup__title">Создать новую папку</div>
                    <button className="popup__close" onClick={() => fileState.setPopupDisplay('none')}>X</button>
                </div>
                <Input type="text" placeholder="Введите название папки..." value={dirName} setValue={setDirName}/>
                <button className="popup__create" onClick={() => createHandler()}>Создать</button>
             </div>
        </div>
    );
});

export default Popup;