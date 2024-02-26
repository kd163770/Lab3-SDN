import { ImageDAO } from "../dao/index.js";

const insertImage = async (req, res, next) => {
    try {
        const imagesInfo = req.body.imagesInfo;
        if (!imagesInfo) {
            next();
            return;
        }
        let imgsInfo;
        if (Array.isArray(imagesInfo)) {
            imgsInfo = [...imagesInfo];
        } else imgsInfo = [imagesInfo];
        const newImages = imgsInfo.map((img, index) => {
            const image = req.files[index].buffer.toString('base64');
            const parasedImg = JSON.parse(img);
            return {
                ...parasedImg,
                url: image
            };
        });
        console.log(newImages);
        const insertedImages = await ImageDAO.create(req.body.name, newImages);
        console.log(insertedImages);
        const images = insertedImages.map((img) => {
            return {
                _id: img._id,
                url: img.url
            }
        })

        req.images = images;
        next();
    } catch (error) {
        res.status(500).json({
            message: error.toString()
        })
    }
}

const getAllImages = async (req, res) => {
    try {
        const result = await ImageDAO.getAllImages();
        console.log(result);
        res.status(200).json({
            message: "Success",
            products: result
        })
    } catch (error) {
        res.status(500).json({
            error: error.toString()
        })
    }
}

export default {
    insertImage,
    getAllImages
}