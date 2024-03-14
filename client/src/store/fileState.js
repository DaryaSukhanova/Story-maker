import { observable, action } from 'mobx';

class FileState {
    files = [];
    currentDir = null;
    popupDisplay = 'none';
    dirStack = [];

    setFiles = (files) => {
        this.files = files;
    };

    addFile = (file) => {
        this.files.push(file);
    };

    setCurrentDir = (dir) => {
        this.currentDir = dir;
    };

    setPopupDisplay = (display) => {
        this.popupDisplay = display;
    };

    pushToStack(dir) {
        this.dirStack.push(dir);
    }
}

const fileState = new FileState();

export default fileState;