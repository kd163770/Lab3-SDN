import commentSchema from '../models/comments.js'

const addComment = async ({author, text, rate}) => {
    try{
        const newComment = await commentSchema.create({author, text, rate});
        return newComment._doc;
    }catch (error){
        throw new Error(error);
    }
}

export default{
    addComment
}