import fs from "fs"
import path from "path"
import File from "../models/File.js";
import Keys from "../models/Keys.js";

class animationService{
	async getAnimation(userId, id) {
		try {
			const svgData = await File.findOne({user: userId, _id: id})
			const svgAttrs = JSON.parse(fs.readFileSync(path.resolve(`files/${userId}/${svgData.path}`)))
			const keyData = await Keys.findOne({user: userId, svgId: svgData.id})
			const keyFrames = keyData != null ? JSON.parse(keyData.data) : new Array(svgAttrs.attr.length)
			const animations = {name: svgData.name, animationData: [], duration: svgAttrs.duration}
			for (let i = 0; i < svgAttrs.attr.length; i++) {
				animations.animationData.push({
					isAnimated: svgAttrs.attr[i].isAnimated,
					keys: keyFrames[i],
					attributes: svgAttrs.attr[i].attributes,
					origin:svgAttrs.attr[i].origin,
					pathData: svgAttrs.attr[i].pathData
				})
			}
			return animations
		} catch (e) {
			const status = e.status || 500
			return console.error("error %d", status, { error: e.message || "Internal server error" })
		}
	}
}

export default new animationService()