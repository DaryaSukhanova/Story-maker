import fs from "fs"
import File from "../models/File.js"

class FileService {

	createDir(file) {
		return new Promise(((resolve, reject) => {
			const filePath = `C:\\Users\\iluch\\Documents\\webProgects\\2024\\StoryMaker\\Story-maker\\server\\files\\${file.user}\\${file.path}`
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

}

export default FileService