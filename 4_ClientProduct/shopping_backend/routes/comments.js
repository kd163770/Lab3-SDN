import express from "express";
import { commentController, productController } from "../controllers/index.js";
const commentRouter = express.Router();

commentRouter.post('/:id', commentController.addComment)
.post('/:id', productController.getAllProductById)

export default commentRouter