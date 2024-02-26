import { CommentDAO, ProductDAO } from "../dao/index.js"
import Product from "../models/product.js";

const addComment = async (req, res, next) => {
    try {
        const {
            author,
            text,
            rate
        } = req.body;
        await ProductDAO.getAllProductById(req.params.id);
        const comment = await CommentDAO.addComment({ author, text, rate });
        await ProductDAO.pushComment(req.params.id, { _id: comment._id, text: comment.text, author: comment.author });
        next();
    } catch (error) {
        res.status(500).json({
            message: error.toString()
        })
    }
}

export default {
    addComment
}