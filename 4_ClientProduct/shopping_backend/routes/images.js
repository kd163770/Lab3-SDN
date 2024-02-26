import express from 'express'
import { imageController } from '../controllers/index.js';
import multer from 'multer'

const upload = multer({})
const imageRouter = express.Router();

imageRouter.get('/', imageController.getAllImages)

export default imageRouter