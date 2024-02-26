import { CategoryDAO } from '../dao/index.js'
const getAllCategory = async (req, res) => {
    try {
        const category = await CategoryDAO.getAllCategory();
        res.status(200).json({
            messages: "Get category successfully",
            data: category
        })
    } catch (error) {
        res.status(500).json({
            message: error.toString()
        })
    }
}

export default {
    getAllCategory
}