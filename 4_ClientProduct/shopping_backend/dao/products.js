import Product from "../models/product.js";

const create = async ({ name, price, description, images, category }) => {
    try {
        console.log('dao');
        const existProduct = await Product.findOne({ name }).exec();
        if (existProduct) {
            throw new Error('This product name already exist');
        }
        let newProduct;
        if (images) {
            newProduct = await Product.create({ name, price, description, images, category });
        }
        else {
            newProduct = await Product.create({ name, price, description, category });
        }
        console.log(newProduct);
        return newProduct._doc;
    } catch (error) {
        throw new Error(error.toString());
    }
}
const update = async (id, { name, price, description, images, category }) => {
    try {
        console.log('dao');
        const newProduct = await Product.updateOne({ name, price, description, images, category });
        return newProduct._doc;
    } catch (error) {
        throw new Error(error.toString());
    }
}


const pushComment = async (id, { _id, author, text }) => {
    try {
        console.log(_id);
        console.log(author);
        console.log(text);
        const updatedProduct = await Product.updateOne({ _id: id }, {
            $push: {
                comments: {
                    _id: _id,
                    text: text,
                    author: author
                }
            }
        })
        console.log(updatedProduct);
        return updatedProduct;
    } catch (error) {
        throw new Error(error.toString());
    }
}
const getAllProducts = async () => {
    try {
        const listProduct = await Product.find({}).exec();
        console.log(listProduct);
        return listProduct;
    } catch (error) {
        throw new Error(error.toString());
    }
}

const getAllProductById = async (id) => {
    try {
        const existProduct = await Product.findOne({ _id: id }).populate('comments._id', "rate").exec();
        if (existProduct === null) {
            throw new Error('This product name doesn\'t exist');
        }
        return existProduct;
    } catch (error) {
        throw new Error("Product is not exists");
    }
}

export default {
    create, getAllProducts, getAllProductById, pushComment
}

