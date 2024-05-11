import File from "../models/File.js";
import path from "path"
import fs from "fs"
import User from "../models/User.js";
import Keys from "../models/Keys.js";
import animationService from "../services/animationService.js";

class animationController {
	async saveAnimation(req, res) {
		try {
			// console.log("req.body", req.body)
			const animationData = JSON.parse(req.body.animationData)

			const user = await User.findOne({_id: req.user.id})
			const parent = await File.findOne({user: req.user.id, name: "Animations"})
			const keyFrames = []
			const svgAttrs = []

			animationData.forEach(element => {
				keyFrames.push(element.keys)
				svgAttrs.push({isAnimated: element.isAnimated, attributes: element.attributes, origin: element.origin, pathData: element.pathData})
			})
			const filePath = path.resolve(`files/${req.user.id}/Animations`, `${req.body.name}.json`)
			fs.writeFileSync(filePath, JSON.stringify({attr: svgAttrs, duration: req.body.duration}))
			const svgSize = fs.statSync(filePath).size
			const keySize = new Blob(keyFrames).size
			if (user.usedSpace + svgSize + keySize > user.diskSpace) {
				return res.status(400).json({message: "There no space on the disk"})
			}
			user.usedSpace = user.usedSpace + svgSize + keySize
			let svgData = await File.create({
				name: `${req.body.name}.json`,
				type:"json",
				size: svgSize,
				path: `Animations\\${req.body.name}.json`,
				parent: parent.id,
				user: user.id
			})
			svgData.save()
			svgData = await File.findOne(svgData)
			if (keySize != 0) {
				const keysData = await Keys.create({
					data: JSON.stringify(keyFrames),
					svgId: svgData.id,
					user: req.user.id,
					size: keySize
				})
				keysData.save()
			}
			user.save()

			res.status(200).json({ data: svgData, message: "Animation saved successfully" });
		} catch (e) {
			// Лучше устанавливать статус 500 если e.status не определен
			const status = e.status || 500;
			res.status(status).json({ error: e.message || "Internal server error" });
		}
	}

	async getAnimation(req, res) {
		try {
			const animations = await animationService.getAnimation(req.user.id, req.query.id)
			return res.status(200).json(animations)
		} catch (e) {
			const status = e.status || 500
			res.status(status).json({ error: e.message || "Internal server error" })
		}
	}
}

export default new animationController()