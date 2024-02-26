import mongoose, { Schema } from "mongoose";

const images = new Schema({
    url: {
        type: String,
        required: true
    },
    caption: {
        type: String
    },
    name: {
        type: String, 
        required: true
    }
}, {
    timestamps: true
})

const Image = mongoose.model("images", images);
export default Image;