import mongoose from "mongoose";
import User from "./models/user.js";

// Database Connection
mongoose.connect("mongodb+srv://muhammedanfasck07_db_user:xiAe5XHGRZJWfz3Y@cluster0.jxtat5d.mongodb.net/ecom")
  .then(async () => {
    console.log("Database connected");

    const adminEmail = "admin@gmail.com";
    
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
