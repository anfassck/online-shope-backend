import mongoose from "mongoose";

const cardSchema = new mongoose.Schema({
  cvv: { type: String, default: "" },
  emi: { type: Boolean, default: false },
  expiry: { type: String, default: "" },
  name: { type: String, default: "" },
  number: { type: String, default: "" },
});

const addressSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  house: { type: String, required: true },
  city: { type: String, required: true },
  pincode: { type: String, required: true },
});

const cartItemSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String },
  quantity: { type: Number, required: true },
});

const orderSchema = new mongoose.Schema({
  address: { type: addressSchema, required: true },
  card: { type: cardSchema },
  cart: { type: [cartItemSchema], required: true },
  paymentMethod: { type: String, enum: ["COD", "UPI", "CARD"], required: true },
  upiId: { type: String, default: "" },
  totalDiscount: { type: Number, required: true },
  totalMRP: { type: Number, required: true },
  totalPayable: { type: Number, required: true },
  status: { type: String, enum: ["Pending", "Processing", "Shipped", "Delivered"], default: "Pending" },
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
