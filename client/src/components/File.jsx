import React from 'react';
import {observer} from "mobx-react-lite";
import fileState from '../store/fileState.js';
import {deleteFile, downloadFile} from '../actions/file.js';
import '../styles/file.scss'
import dirLogo from '../assets/img/dir.svg'
import fileLogo from '../assets/img/file.svg'

const File = observer(({file}) => {

    const currentDir = fileState.currentDir

    const openDirHandler = (file) => {  
        if(file.type === 'dir') {
            fileState.pushToStack(currentDir)
            fileState.setCurrentDir(file._id)
        }
    }

    const downloadClickHandler = (e) => {
        e.stopPropagation()
        downloadFile(file)
    }

	const deleteClickHandler = (e) => {
		e.stopPropagation()
		deleteFile(file)
	}

    return (
        <div className='file' onClick={()=> openDirHandler(file)}>
            <img src={file.type === 'dir' ? dirLogo : fileLogo} alt="" className="file__img"/>
            <div className="file__name">{file.name}</div>
            <div className="file__date">{file.date.slice(0,10)}</div>
            <div className="file__size">{file.size}</div>
            {file.type !== 'dir' && <button onClick={(e) => downloadClickHandler(e)} className="file__btn file__download">download</button>}
            <button onClick={(e) => deleteClickHandler(e)} className="file__btn file__delete">delete</button>
        </div>
    );
});

export default File;