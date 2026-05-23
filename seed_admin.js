import mongoose from "mongoose";
import User from "./models/user.js";
import dotenv from "dotenv";
dotenv.config();

// Database Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log("Database connected");

    try {
      const collections = await mongoose.connection.db.listCollections({ name: "users" }).toArray();
      if (collections.length > 0) {
        await mongoose.connection.db.collection("users").dropIndex("username_1");
        console.log("Dropped obsolete unique index: username_1");
      }
    } catch (err) {
      console.log("Note: username_1 index does not exist or was already dropped.");
    }

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD || "admin";
    
    // Check if admin already exists
    let admin = await User.findOne({ email: adminEmail });
    if (!admin) {
      admin = new User({
        fullname: "Store Admin",
        phone: "0000000000",
        email: adminEmail,
        password: adminPassword,
        status: "online"
      });
      await admin.save();
      console.log("Admin account created successfully!");
    } else {
      admin.password = adminPassword;
      await admin.save();
      console.log(`Admin account already exists. Password reset to '${adminPassword}'.`);
    }

    mongoose.disconnect();
  })
  .catch(err => {
    console.error("Database connection error:", err);
    mongoose.disconnect();
  });
