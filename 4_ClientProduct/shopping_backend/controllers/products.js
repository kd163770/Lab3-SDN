import comments from "../dao/comments.js";
import { ProductDAO } from "../dao/index.js";



//GET: /products
const getAllProducts = async (req, res) => {
    try {
        const result = await ProductDAO.getAllProducts();
        res.status(200).json({
            message: "Success",
            products: result
        })
    } catch (error) {
        res.status(500).json({
            message: error.toString()
        })
    }
}


const getAllProductById = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await ProductDAO.getAllProductById(id);
        let rate, filtedComments;
        if (result.comments.length !== 0) {
            rate = result.comments.reduce((a, b) => {
                return a + b._id.rate
            }, 0) / result.comments.length;
            filtedComments = result.comments.map((cmt) => {
                return {
                    _id: cmt._id._id,
                    author: cmt.author,
                    text: cmt.text
                }
            })
        }
        else {
            rate = 0;
            filtedComments = [];
        }
        res.status(200).json({
            message: "Success",
            data: {
                ...result._doc,
                comments: filtedComments,
                rate: Math.floor(rate)
            }
        })
    } catch (error) {
        res.status(500).json({
            message: error.toString()
        })
    }
}
// POST: /products  

const createProduct = async (req, res) => {
    try {
        const {
            name,
            price,
            description,
            category
        } = req.body;
        const images = req.images;
        const result = await ProductDAO.create({ name, price, description, images, category });
        res.status(201).json({
            message: "Add product successfully",
            data: result
        });
    } catch (error) {
        res.status(500).json({
            message: error.toString()
        })
    }
}
export default {
    getAllProducts,
    getAllProductById,
    createProduct
}