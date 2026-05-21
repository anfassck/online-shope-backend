import mongoose from "mongoose";
import User from "./models/user.js";
import dotenv from "dotenv";
dotenv.config();

// Database Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log("Database connected");

    const adminEmail = process.env.ADMIN_EMAIL;
    
    
    // Check if admin already exists
    let admin = await User.findOne({ email: adminEmail });
    if (!admin) {
      admin = new User({
        fullname: "Store Admin",
        phone: "0000000000",
        email: adminEmail,
        password: "admin", // Simple password for admin
        status: "online"
      });
      await admin.save();
      console.log("Admin account created successfully!");
    } else {
      admin.password = "admin"; // reset password to admin
      await admin.save();
      console.log("Admin account already exists. Password reset to 'admin'.");
    }

    mongoose.disconnect();
  })
  .catch(err => {
    console.error("Database connection error:", err);
    mongoose.disconnect();
  });
