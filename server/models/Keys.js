import mongoose, { model, Schema } from "mongoose";

const Keys = new Schema({
	data: {type: String, required: true},
	svgId: {type: mongoose.Types.ObjectId, ref: "File", required: true},
	user: {type: mongoose.Types.ObjectId, ref: "User"},
	size: {type: Number, default: 0}
})

export default model("Keys", Keys)