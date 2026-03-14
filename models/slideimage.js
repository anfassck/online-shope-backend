
import mongoose from "mongoose";

const slideimageSchema=new mongoose.Schema({
    name:String,
    image:String,
    
})


const slideimage=mongoose.model("slideimage",slideimageSchema)

export default slideimage