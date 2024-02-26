import Image from "../models/images.js";
import Product from "../models/product.js";

const create = async (name, images) => {
    try {
        const existProduct = await Product.findOne({ name }).exec();
        if (existProduct) {
            throw new Error('This product name already exist');
        }
        console.log(images);
        const newImage = await Image.insertMany(images);
        return newImage;
    } catch (error) {
        throw new Error(error.toString());
    }
}

const getAllImages = async () => {
    try {
        const listImages = await Image.find({}).exec();
        console.log(listImages);
        return listImages;
    } catch (error) {
        throw new Error(error.toString());
    }
}
export default{
    create, getAllImages
}