import categorySchema from '../models/categories.js'

const getAllCategory = async () => {
    try {
        const categories = await categorySchema.find({}).exec();
        return categories;
    } catch (error) {
        throw new Error(error.toString());
    }
}
export default {
    getAllCategory
}