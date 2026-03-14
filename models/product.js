import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String },
  description: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'category', required: true }
}, { timestamps: true });

const Product = mongoose.model("Product", ProductSchema);

export default Product;
