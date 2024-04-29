import File from "../models/File.js";
import path from "path"
import fs from "fs"
import { fromJSON, parse, stringify, toJSON } from "flatted"

class animationController {
	async saveAnimation(req, res) {

		try {
			console.log("req.body", req.body)
			res.status(200).json({ message: "Animation saved successfully" });
		} catch (e) {
			// Лучше устанавливать статус 500 если e.status не определен
			const status = e.status || 500;
			res.status(status).json({ error: e.message || "Internal server error" });
		}
	}
}

export default new animationController()