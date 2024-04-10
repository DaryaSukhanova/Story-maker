import React from 'react';
import '../styles/uploader.scss';
import {observer} from "mobx-react-lite";
import uploadState from '../store/uploadState.js';
import cl from '../assets/img/close.svg'

const UploadFile = observer(({file}) => {

    return (
        <div className="upload-file">
            <div className="upload-file__header">
                <div className="upload-file__name">{file.name}</div>
                <button className="upload-file__remove" onClick={() => uploadState.removeUploadFile(file.id)}><img src={cl}/></button>
            </div>
            <div className="upload-file__progress-bar">
                <div className="upload-file__upload-bar" style={{width: file.progress + "%"}}/>
                <div className="upload-file__percent">{file.progress}%</div>
            </div>
        </div>
    );
});

export default UploadFile;