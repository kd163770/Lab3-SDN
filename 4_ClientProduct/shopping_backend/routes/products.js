import express from "express";
import {imageController, productController} from '../controllers/index.js'
import multer from "multer";


const productRouter = express.Router();
const upload = multer({})
//Fetch all product
productRouter.get("/", productController.getAllProducts)
.get("/:id", productController.getAllProductById)
.post("/", upload.array("imagesURL") ,imageController.insertImage)
.post("/", productController.createProduct)

//Fetch product by id
// productRouter.

export default productRouter