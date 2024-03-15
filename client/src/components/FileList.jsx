import React from 'react';
import '../styles/fileList.scss'
import {observer} from "mobx-react-lite";
import fileState from '../store/fileState.js';
import file from '../actions/file.js';
import File from "./File";

const FileList = observer(() => {

    const files = fileState.files.map(file => <File key={file.id} file={file} />);
    // const files = [{_id: 1, name: "direc", type: "dir", size:"5gb", date: "15.03.2024"},
    //     {_id: 2, name: "direc2", type: "dir", size:"5gb", date: "15.03.2024"},
    // ].map(file => <File key={file.id} file={file} />);

    return (
        <div className='filelist'>
            <div className="filelist__header">
                <div className="filelist__name">Название</div>
                <div className="filelist__date">Дата</div>
                <div className="filelist__size">Размер</div>
            </div>
            {files}
        </div>
    );
});

export default FileList;