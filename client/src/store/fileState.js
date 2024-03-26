import { makeAutoObservable } from 'mobx';

class FileState {
    files = [];
    currentDir = "";
    popupDisplay = 'none';
    dirStack = [];

	constructor() {
		makeAutoObservable(this)
	}

    setFiles = (files) => {
        this.files = files;
    };

    addFile = (file) => {
        this.files.push(file);
    };

    setCurrentDir = (dir) => {
        console.log("dir", dir)
        this.currentDir = dir;
    };

    setPopupDisplay = (display) => {
        this.popupDisplay = display;
    };

    pushToStack(dir) {
        this.dirStack.push(dir);
    }

	deleteFile(fileId) {
		this.files = this.files.filter(file => file._id != fileId)
	}
}

const fileState = new FileState();

export default fileState;