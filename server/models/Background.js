import mongoose from "mongoose";

const Background = new mongoose.Schema({
    // backgroundId: {type: Number, required: true},
	backgroundName: {type: String, required: true},
	user: {type: mongoose.Types.ObjectId, ref: "User"},
	parent: {type: mongoose.Types.ObjectId, ref: "File"}
})

export default mongoose.model('Background', Background)