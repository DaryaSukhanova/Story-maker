import { observable, action } from 'mobx';

class FileState {
    files = [];
    currentDir = null;

    setFiles = (files) => {
        this.files = files;
    };

    setCurrentDir = (currentDir) => {
        this.currentDir = currentDir;
    };
}

const fileState = new FileState();

export default fileState;