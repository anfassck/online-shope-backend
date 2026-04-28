import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import multer from "multer";
import path from "path";
<<<<<<< HEAD
import dotenv from "dotenv";

dotenv.config();
=======
>>>>>>> c6847d936b2cc04b44a2ebf7033b44ced2e39364

// Controllers
import { createSlideimage, GetAllSlideimage, DeleteSlideimageById, UpdateSlideimage } from "./controller/slideimage.controller.js";
import { CreateProduct, DeleteProductbyId, GetAllProducts, GetProductById, SearchProduct, UpdateProduct } from "./controller/product.controller.js";
import { CreateCategory, GetAllCategory, GetCategoryById, DeleteCategorybyId, UpdateCategory } from "./controller/category.controller.js";
import { signUpUser, loginUser, updateUserProfile, getAllUsers } from "./controller/user.condroller.js";
import { createOrder, getAllOrder, updateOrderStatus } from "./controller/order.controller.js";


// ------------------ DATABASE CONNECTION ------------------
mongoose.connect(
  process.env.MONGODB_URI
)
.then(() => console.log("Database connected"))
.catch(err => console.log("Database connection error:", err));

// ------------------ EXPRESS SETUP ------------------
const app = express();
app.use(express.json());
app.use(cors());

// ------------------ MULTER STORAGE ------------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

const uploads = multer({ storage });


app.get("/hello",(req,res)=>{
  res.send("working")
})

// ------------------ SERVE STATIC FILES ------------------
app.use("/uploads", express.static("uploads"));

// ------------------ PRODUCT ROUTES ------------------

// Get all products or filter by category
app.get("/product", GetAllProducts);

// Search products by name or description
app.get("/product/search", SearchProduct);

// Get product by ID
app.get("/product/:id", GetProductById);

// Create new product (with image)
app.post("/product", uploads.single("file"), CreateProduct);

// Update product by ID
app.put("/product/:id", uploads.single("file"), UpdateProduct);

// Delete product by ID
app.delete("/product/:id", DeleteProductbyId);

// ------------------ CATEGORY ROUTES ------------------
app.get("/category", GetAllCategory);
app.post("/category", uploads.single("image"), CreateCategory);
app.get("/category/:id", GetCategoryById);
app.put("/category/:id", uploads.single("image"), UpdateCategory);
app.delete("/category/:id", DeleteCategorybyId);

// ------------------ SLIDE IMAGE ROUTES ------------------
app.get("/slideimage", GetAllSlideimage);
app.post("/slideimage", uploads.single("image"), createSlideimage);
app.put("/slideimage/:id", uploads.single("image"), UpdateSlideimage);
app.delete("/slideimage/:id", DeleteSlideimageById);

// ------------------ USER ROUTES ------------------
app.post("/signup", signUpUser);
app.post("/login", loginUser);
// Update user profile
// Only updates profileImage if user uploads a new file
app.put("/user/:id", uploads.single("profileImage"), updateUserProfile);
// Get all users (admin)
app.get("/users", getAllUsers);

//-------------------- ORDER ROUTES ------------------
app.post("/order", createOrder);
app.get("/order", getAllOrder);
app.put("/order/:id/status", updateOrderStatus);

// ------------------ START SERVER ------------------
const PORT = 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
