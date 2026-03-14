// Seed script — adds Electronics category + products
// Run: node seed.js  (from backent/ folder)

import mongoose from "mongoose";

const CONN = "mongodb+srv://muhammedanfasck07_db_user:xiAe5XHGRZJWfz3Y@cluster0.jxtat5d.mongodb.net/ecom";

const CategorySchema = new mongoose.Schema({ name: String, image: String }, { timestamps: true });
const ProductSchema = new mongoose.Schema({
  name: String, price: Number, image: String, description: String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: "category" }
}, { timestamps: true });

const Category = mongoose.model("category", CategorySchema);
const Product = mongoose.model("Product", ProductSchema);

await mongoose.connect(CONN);
console.log("Connected!");

// ── Create / find categories ──────────────────────────
const catNames = ["Electronics", "Mobile Phones", "Laptops", "Headphones & Audio", "Cameras", "Fashion", "Home & Kitchen"];
const catMap = {};

for (const name of catNames) {
  let cat = await Category.findOne({ name });
  if (!cat) {
    cat = await Category.create({ name, image: "" });
    console.log("Created category:", name);
  }
  catMap[name] = cat._id;
}

// ── Seed Products ─────────────────────────────────────
const products = [
  // Electronics
  { name: "Samsung 65\" 4K Smart TV", price: 74999, category: "Electronics", description: "Crystal 4K UHD display with HDR support. Smart TV with built-in Netflix, YouTube & Amazon Prime. Dolby Digital Plus audio, 3 HDMI & 2 USB ports.", image: "https://images.unsplash.com/photo-1593359677879-a4bb92f4834a?w=400&q=80" },
  { name: "Sony 55\" OLED TV", price: 129999, category: "Electronics", description: "Sony BRAVIA OLED with Cognitive Processor XR. Perfect blacks, lifelike colour and the purest sound. Ideal for cinematic viewing.", image: "https://images.unsplash.com/photo-1601944177325-f8867652837f?w=400&q=80" },

  // Mobile Phones
  { name: "iPhone 16 Pro Max", price: 134900, category: "Mobile Phones", description: "Apple A18 Pro chip, 48MP ProCamera system, Action Button, titanium design. 6.9\" Super Retina XDR display. All-day battery life.", image: "https://images.unsplash.com/photo-1697487943662-08ab85adfc64?w=400&q=80" },
  { name: "Samsung Galaxy S24 Ultra", price: 129999, category: "Mobile Phones", description: "200MP Camera with AI-powered photo editing. Snapdragon 8 Gen 3, 12GB RAM, 6.8\" Dynamic AMOLED 2X, S Pen included.", image: "https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=400&q=80" },
  { name: "OnePlus 12", price: 64999, category: "Mobile Phones", description: "Snapdragon 8 Gen 3, 50MP Hasselblad Camera, 100W SUPERVOOC charging, 6.82\" AMOLED 2K display, 5400mAh battery.", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80" },
  { name: "Xiaomi 14 Ultra", price: 89999, category: "Mobile Phones", description: "Leica professional camera system. 50MP quad cameras, Snapdragon 8 Gen 3, 90W wireless charging, 6.73\" AMOLED.", image: "https://images.unsplash.com/photo-1550367363-ea12860cc124?w=400&q=80" },

  // Laptops
  { name: "Apple MacBook Air M3", price: 114900, category: "Laptops", description: "Apple M3 chip, 15.3\" Liquid Retina display, 8GB RAM, 256GB SSD, up to 18 hours battery. Thin, light, and incredibly powerful.", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&q=80" },
  { name: "Dell XPS 15 Laptop", price: 149999, category: "Laptops", description: "Intel Core i7-13700H, 16GB DDR5 RAM, 512GB SSD, 15.6\" OLED touch display, NVIDIA RTX 4060. Thin bezel InfinityEdge design.", image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&q=80" },
  { name: "HP Spectre x360 14", price: 139999, category: "Laptops", description: "2-in-1 convertible laptop. Intel Evo Core i7, 16GB RAM, 1TB SSD, 14\" 2.8K OLED screen. Elegant premium design.", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80" },

  // Headphones & Audio
  { name: "Sony WH-1000XM5 Headphones", price: 29990, category: "Headphones & Audio", description: "Industry-leading noise cancellation, 30hr battery, crystal-clear hands-free calling, Speak-to-Chat. Premium sound quality.", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80" },
  { name: "Apple AirPods Pro 2", price: 24900, category: "Headphones & Audio", description: "Active Noise Cancellation, Transparency mode, Adaptive EQ. H2 chip. Personalized Spatial Audio. Up to 30 hours total listening.", image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=400&q=80" },
  { name: "Bose QuietComfort 45", price: 32950, category: "Headphones & Audio", description: "High fidelity audio, world-class noise cancellation, 24 hr battery, TriPort Acoustic architecture, comfortable cushioned design.", image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&q=80" },
  { name: "JBL Charge 5 Speaker", price: 14999, category: "Headphones & Audio", description: "Powerful portable Bluetooth speaker. IP67 waterproof & dustproof. 20 hours of playtime. Power bank function. Punchy bass.", image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&q=80" },

  // Cameras
  { name: "Canon EOS R6 Mark II", price: 239990, category: "Cameras", description: "24.2MP full-frame CMOS sensor, 40fps continuous RAW shooting, 6K RAW video, in-body image stabilization, Dual Pixel AF II.", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&q=80" },
  { name: "Sony Alpha A7 IV", price: 219990, category: "Cameras", description: "33MP BSI CMOS sensor, 10fps burst, 4K 60p video, Real-time Eye AF, In-body 5-axis IS. Professional full-frame mirrorless.", image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&q=80" },
  { name: "GoPro Hero 12 Black", price: 44500, category: "Cameras", description: "5.3K60 + 4K120 video, HyperSmooth 6.0 stabilisation, 27MP photos, waterproof to 10m, Max Lens Mod 2.0 compatible.", image: "https://images.unsplash.com/photo-1677471547027-dcdf7daeb5e8?w=400&q=80" },

  // Fashion
  { name: "Nike Air Max 270", price: 12995, category: "Fashion", description: "Breathable mesh upper, Air Max cushioning unit in the heel, rubber outsole for durability. Iconic style meets all-day comfort.", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80" },
  { name: "Ray-Ban Aviator Classic", price: 9990, category: "Fashion", description: "Iconic pilot frame, purest glass crystal lenses, UV400 protection, gold metal frame. Timeless fashion since 1937.", image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&q=80" },

  // Home & Kitchen
  { name: "Philips Air Fryer HD9252", price: 6995, category: "Home & Kitchen", description: "1400W digital air fryer, Rapid Air Technology, 7 pre-set cooking functions, 4.1L capacity. Up to 90% less fat than frying.", image: "https://images.unsplash.com/photo-1585515320310-259814833e62?w=400&q=80" },
  { name: "Dyson V15 Detect Vacuum", price: 62900, category: "Home & Kitchen", description: "Laser dust detection, 60 min battery, 230 AW suction, LCD screen, HEPA filtration. Reveals hidden dust on any surface.", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80" },
];

let added = 0;
for (const p of products) {
  const catId = catMap[p.category];
  if (!catId) { console.log("Category not found:", p.category); continue; }
  const exists = await Product.findOne({ name: p.name });
  if (!exists) {
    await Product.create({ name: p.name, price: p.price, category: catId, description: p.description, image: p.image });
    console.log("Added:", p.name);
    added++;
  } else {
    console.log("Exists:", p.name);
  }
}

console.log(`\n✅ Done! Added ${added} new products.`);
await mongoose.disconnect();
