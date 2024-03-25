import { makeAutoObservable } from 'mobx';

class UploadState {
    isVisible = false;
    files = [];

	constructor() {
		makeAutoObservable(this)
	}

    showUploader = () => {
        this.isVisible = true;
    };

    hideUploader() {
        this.isVisible = false;
    };
    
    addUploadFile(file) {
        this.files.push(file);
    }; 
    
    removeUploadFile(fileId) {
        this.files = this.files.filter(file => file.id != fileId);
    };
    
    changeUploadFile(payload) {
        this.files = this.files.map(file => file.id == payload.id
            ? {...file, progress: payload.progress}
            : file
        )
    };

}

const uploadState = new UploadState();

export default uploadState;