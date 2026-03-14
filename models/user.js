import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    fullname: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    status: { type: String, default: "offline" },
    profileImage: { type: String, default: null } 
    
    // <-- Added field for profile image URL
}, { timestamps: true });

const user = mongoose.model("user", UserSchema);

export default user;
