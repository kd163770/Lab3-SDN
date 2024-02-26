import mongoose, { Schema } from "mongoose";

//product Schema

const subImageSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        required: true,
    }, 
    url: {
        type: String,
        required: true
    }
});

const subCommentSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId, 
        ref: "comments",
        required: true
    },
    text: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    }
})
const productShema = new Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'],
        unique: [true, 'Product name is not duplicate']
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    description: {
        type: String,
        required: true
    },
    images: [subImageSchema],
    comments: [subCommentSchema],
    category: {
        type: Schema.Types.ObjectId,
        ref: "categories",
        required: true
    }
}, {
    timestamps: true
});

const Product = mongoose.model("products", productShema);
export default Product;