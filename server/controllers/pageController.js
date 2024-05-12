import File from "../models/File.js";
import path from "path"
import fs from "fs"
import User from "../models/User.js"
import BackgroundService from "../BackgroundService.js";
import animationService from "../services/animationService.js";

class pageController {
	async savePage(req, res) {
		try {
			const user = await User.findOne({_id: req.user.id})
			const parent = await File.findOne({user: req.user.id, name: "Pages"})
			const filePath = path.resolve(`files/${req.user.id}/Pages`, `${req.body.name}.pg`)
			fs.writeFileSync(filePath, JSON.stringify({backgrounds: req.body.backgrounds, animations: req.body.animations}))
			const size = fs.statSync(filePath).size
			if (user.usedSpace + size > user.diskSpace) {
				return res.status(400).json({message: "There no space on the disk"})
			}
			user.usedSpace = user.usedSpace + size
			const pageData = await File.create({
				name: `${req.body.name}.pg`,
				type: "pg",
				size: size,
				path: `Pages\\${req.body.name}.pg`,
				parent: parent.id,
				user: user.id
			})
			user.save()
			pageData.save()

			return res.status(200).json({ data: pageData, message: "Page saved successfully" })
		} catch (e) {
			// Лучше устанавливать статус 500 если e.status не определен
			const status = e.status || 500;
			res.status(status).json({ error: e.message || "Internal server error" });
		}
	}

	async getPage(req, res) {
		try {
			const pageData = await File.findOne({user: req.user.id, _id: req.query.id})
			const backgroundsId = JSON.parse(JSON.parse(fs.readFileSync(path.resolve(`files/${req.user.id}/${pageData.path}`))).backgrounds)
			const animationsId = JSON.parse(JSON.parse(fs.readFileSync(path.resolve(`files/${req.user.id}/${pageData.path}`))).animations)
			let backgrounds = []
			let animations = []
			for (const id of backgroundsId) {
				const bg = await BackgroundService.getBackground(req.user.id, id)
				backgrounds.push(bg)
			}
			for (const id of animationsId) {
				const am = await animationService.getAnimation(req.user.id, id)
				animations.push(am)
			}
			return res.status(200).json({name: pageData.name, backgrounds: backgrounds, animations: animations})
		} catch (e) {
			// Лучше устанавливать статус 500 если e.status не определен
			const status = e.status || 500;
			res.status(status).json({ error: e.message || "Internal server error" });
		}
	}
}

export default new pageController()