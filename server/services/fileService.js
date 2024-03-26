import fs from "fs"
import File from "../models/File.js"
import path from "path";

class FileService {

	createDir(file) {
		return new Promise(((resolve, reject) => {
			const __dirname = path.dirname(new URL(import.meta.url).pathname);
			const parentDir = path.dirname(__dirname);
			// const filePath = `${parentDir}/files/${file.user}/${file.path}`;
			const filePath = `${path.join(`${parentDir}`, `/files/${file.user}/${file.path}`).replace(/^\\/, '')}`
			// const filePath = `\\D:\\MAI\\graduate-work\\story-maker-versions\\story-maker\\server\\files\\${file.user}\\${file.path}`

			console.log(filePath)
			try {
				if (!fs.existsSync(filePath)) {
					fs.mkdirSync(filePath)
					return resolve({message: "File was created"})
				} else {
					return reject({message: "File already exist"})
				}
			} catch (e) {
				return reject({message: "File error"})
			}
		}))
	}

	deleteFile(file) {
		const path = this.getPath(file)
		if (file.type === "dir") {
			fs.rmdirSync(path)
		} else {
			fs.unlinkSync(path)
		}
	}

	getPath(file) {
		const __dirname = path.dirname(new URL(import.meta.url).pathname);
		const parentDir = path.dirname(__dirname);
		return `${path.join(`${parentDir}`, `/files/${file.user}/${file.path}`).replace(/^\\/, '')}`
	}

}

export default FileService