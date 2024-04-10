import File from "../models/File.js";
import path from "path"
import fs from "fs"

class animationController {
	async saveAnimation(req, res) {
		try {
			console.log(req.body)
			res.status(200)
		} catch (e) {
			return res.status(e.status).json(e.message)
		}
	}
}

export default new animationController()