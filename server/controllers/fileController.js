import FS from "../services/fileService.js"
import User from "../models/User.js"
import File from "../models/File.js"
import path from "path"
import fs from "fs"

const fileService = new FS()

class FileController {
	async createDir(req, res) {
		try {
			const {name, type, parent} = req.body
			const file = new File({name, type, parent, user: req.user.id})
			const parentFile = await File.findOne({_id: parent})
			if (!parentFile) {
				file.path = name
				await fileService.createDir(file)
			} else {
				file.path = `${parentFile.path}\\${file.name}`
				await fileService.createDir(file)
				parentFile.childs.push(file._id)
				await parentFile.save()
			}
			await file.save()
			return res.json(file)
		} catch (e) {
			console.log(e)
			return res.status(400).json(e)
		}
	}

	async getFiles(req, res) {
		try {
			const files = await File.find({user: req.user.id, parent: req.query.parent})
			return res.json(files)
		} catch (e) {
			console.log(e)
			return res.status(500).json({message: "Can't get files"})
		}
	}

	async uploadFile(req, res) {
		try {
			const file = req.files.file
			
			const parent = await File.findOne({user: req.user.id, _id: req.body.parent})
			const user = await User.findOne({_id: req.user.id})

			if (user.usedSpace + file.size > user.diskSpace) {
				return res.status(400).json({message: "There no space on the disk"})
			}

			user.usedSpace = user.usedSpace +  file.size

			let Path;
			const __dirname = path.dirname(new URL(import.meta.url).pathname);
			const parentDir = path.dirname(__dirname);
			if (parent) {
				Path = `${path.join(`${parentDir}`, `/files/${user.id}/${parent.path}/${file.name}`).replace(/^\\/, '')}`
				console.log(Path);
			} else {
				Path = `${path.join(`${parentDir}`, `/files/${user.id}/${file.name}`).replace(/^\\/, '')}`
				console.log(Path);
			}

			if (fs.existsSync(Path)) {
				return res.status(400).json({message: "File already exist"})
			}
			file.mv(Path)

			const type = file.name.split(".").pop()
			let filePath = file.name
			if (parent) {
				filePath = parent.path + "\\" + file.name
			}
			const dbFile = new File({
				name: file.name,
				type,
				size: file.size,
				path: filePath,
				parent: parent?._id,
				user: user._id
			})

			await dbFile.save()
			await user.save()

			res.json(dbFile)
		} catch (e) {
			console.log(e)
			return res.status(500).json({message: "Upload error"})
		}
	}

	async downloadFile(req, res) {
        try {
			let Path;
			const __dirname = path.dirname(new URL(import.meta.url).pathname);
			const parentDir = path.dirname(__dirname);
			const file = await File.findOne({_id: req.query.id, user: req.user.id})
			// if (file.path) {
				Path = `${path.join(`${parentDir}`, `/files/${req.user.id}/${file.path}`).replace(/^\\/, '')}`
			// } else {
				// Path = `${path.join(`${parentDir}`, `/files/${req.user.id}/${file.name}`).replace(/^\\/, '')}`
			// }
			console.log(Path);
			if (fs.existsSync(Path)) {
                return res.download(Path, file.name)
            }
            return res.status(400).json({message: "Download error"})
        } catch (e) {
            console.log(e)
            res.status(500).json({message: "Download error"})
        }
    }

	async deleteFile(req, res) {
		try {
			const file = await File.findOne({_id: req.query.id, user: req.user.id})
			if (!file) {
				return res.status(400).json({message: "file not found"})
			}
			fileService.deleteFile(file)
			await File.deleteOne(file)
			return res.json({message: "file was deleted"})
		} catch (e) {
			console.log(e)
			return res.status(400).json({message: "Dir is not empty"})
		}
	}
}

export default FileController