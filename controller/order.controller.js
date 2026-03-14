import Order from "../models/order.js";

const sendSms = async (to, body) => {
  // MOCK SMS sending since Twilio cannot be installed properly locally here
  console.log(`[SMS SENDING TO ${to}]: ${body}`);
};

// ---------------------- CREATE ORDER ----------------------
export const createOrder = async (req, res) => {
  try {
    const {
      address,
      card,
      cart,
      paymentMethod,
      upiId,
      totalDiscount,
      totalMRP,
      totalPayable,
    } = req.body;

    // Basic validation
    if (!address || !cart || !paymentMethod) {
      return res
        .status(400)
        .json({ message: "Address, cart, and payment method are required" });
    }

    const newOrder = new Order({
      address,
      card,
      cart,
      paymentMethod,
      upiId,
      totalDiscount,
      totalMRP,
      totalPayable,
    });

    const savedOrder = await newOrder.save();

    // Send SMS to customer (using address phone)
    if (address.phone) {
      await sendSms(address.phone, `Your Ceekeey order for ₹${totalPayable} has been placed successfully. Order ID: ${savedOrder._id.toString().slice(-8).toUpperCase()}`);
    }

    return res.status(201).json(savedOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// ---------------------- GET ALL ORDERS ----------------------
export const getAllOrder = async (req, res) => {
  try {
    const order = await Order.find().sort({ createdAt: -1 });
    return res.status(200).json(order);
  } catch (error) {
    console.error("Error fetching order:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// ---------------------- UPDATE ORDER STATUS ----------------------
export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    // Ensure valid status
    const validStatuses = ["Pending", "Processing", "Shipped", "Delivered"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedOrder) return res.status(404).json({ message: "Order not found" });

    // Send SMS order update to customer
    if (updatedOrder.address && updatedOrder.address.phone) {
      await sendSms(updatedOrder.address.phone, `Update on your Ceekeey order ${updatedOrder._id.toString().slice(-8).toUpperCase()}: The status is now '${status}'.`);
    }

    return res.status(200).json(updatedOrder);
  } catch (error) {
    console.error("Error updating order status:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
