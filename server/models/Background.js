import mongoose from "mongoose";

const Background = new mongoose.Schema({
    // backgroundId: {type: Number, required: true},
    backgroundName: {type: String, required: true}
})

export default mongoose.model('Background', Background)