import React from 'react';
import UploadFile from "./UploadFile";
import '../styles/uploader.scss';
import {observer} from "mobx-react-lite";
import uploadState from '../store/uploadState.js';
//import {hideUploader} from '../store/uploadState.js';
import cl from '../assets/img/close.svg'

const Uploader = observer(() => {
    const files = uploadState.files
    const isVisible = uploadState.isVisible

    return ( isVisible &&
        <div className="uploader">
            <div className="uploader__header">
                <div className="uploader__title">Загрузки</div>
                <button className="uploader__close" onClick={() => uploadState.hideUploader()}><img src={cl}/></button>
            </div>
            {files.map(file =>
                <UploadFile key={file.id} file={file}/>
            )}
        </div>
    );
});

export default Uploader;