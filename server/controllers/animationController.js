import File from "../models/File.js";
import path from "path"
import fs from "fs"
import { fromJSON, parse, stringify, toJSON } from "flatted"

class animationController {
	async saveAnimation(req, res) {
		try {
			req.body.elements.map(el => {
				// const log = el.node ? el.node : el
				console.log(el)
			})
			res.status(200)
		} catch (e) {
			res.status(e.status).json(e.message)
		}
	}
}

export default new animationController()