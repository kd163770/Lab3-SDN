import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema({
    rate: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    text: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const Comment = mongoose.model("comments", commentSchema);
export default Comment;