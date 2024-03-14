import React from 'react';
import {observer} from "mobx-react-lite";
import fileState from '../store/fileState.js';
import file from '../actions/file.js';
import '../styles/file.scss'
import dirLogo from '../assets/img/dir.svg'
import fileLogo from '../assets/img/file.svg'

const File = observer(({file}) => {

    const currentDir = fileState.currentDir

    const openDirHandler = () => {  
        fileState.pushToStack(currentDir)
        fileState.setCurrentDir(file._id)
    }

    return (
        <div className='file' onClick={file.type === 'dir' ? ()=> openDirHandler() : ''}>
            <img src={file.type === 'dir' ? dirLogo : fileLogo} alt="" className="file__img"/>
            <div className="file__name">{file.name}</div>
            <div className="file__date">{file.date.slice(0,10)}</div>
            <div className="file__size">{file.size}</div>
        </div>
    );
});

export default File;