import mongoose from "mongoose";

//Method connect to nongodb

const connectDB = async() => {
    try{
        const db = mongoose.connect(process.env.URI_MONGODB);
        console.log("Connect to MongoDB success");
    }catch(error){
        throw new Error(error.toString());
    }
}

export default connectDB;