import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {getFiles, uploadFile} from '../actions/file.js';
import fileState from '../store/fileState.js';
import FileList from "./FileList";
import '../styles/disk.scss'
import Popup from "./Popup";
import Uploader from './Uploader.jsx';
import userState from "../store/userState";
import {NavLink} from "react-router-dom";
// import { ReactComponent as IconSM } from '../src/assets/img/icon-story-maker.svg'
import { ReactComponent as IconSM } from '../assets/img/icon-story-maker.svg'
import ar from '../assets/img/arrow-left.svg'
import pl from '../assets/img/plus-solid.svg'
import ul from '../assets/img/upload.svg'
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
            {!userState.isAuth &&
                <div className="home-navbar">
                    {/*<NavLink to="/" activeClassName="active-link" className="home-icon">*/}
                    {/*    <IconSM activeClassName="home-icon"></IconSM>*/}
                    {/*</NavLink>*/}
                    <div className="navbar__login"><NavLink to="/login">Log In</NavLink></div>
                    <div className="navbar__registration"><NavLink to="/registration">Sign In</NavLink></div>
                </div>
            }
            {userState.isAuth &&

                <div>
                    <div className="home-navbar">
                        <div className="navbar__logout" onClick={()=>userState.logout()}>Выйти</div>
                    </div>
                </div>

            }
            <div className="disk__btns">
                {/* <button className="disk__back" onClick={() => backClickHandler()}>Назад</button> */}
                {/* <img src={pl}/> */}
                <button className="disk__create" onClick={()=>showPopupHandler()}><img className="img" src={pl}/>  Создать папку</button>
                <div className="disk__upload">
                    <label htmlFor="disk__upload-input" className="disk__upload-label"><img className="img2" src={ul}/>  Загрузить</label>
                    <input multiple={true} onChange={(event)=> fileUploadHandler(event)} type="file" id="disk__upload-input" className="disk__upload-input"/>
                </div>
            </div>
            <div className="title">
                <button className="disk__back" onClick={() => backClickHandler()}><img src={ar}/></button>
                <div className="filelist__name">Название</div>
            </div>
            
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