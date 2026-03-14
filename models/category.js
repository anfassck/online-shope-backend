import mongoose from "mongoose";

const CategorySchema=new mongoose.Schema({
    name:String,
    image:String,
    
})


const category=mongoose.model("category",CategorySchema)

export default category