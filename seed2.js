// seed2.js — Add 30 MORE products across all categories
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

const allCats = await Category.find({});
const catMap = {};
for (const c of allCats) catMap[c.name] = c._id;
console.log("Found categories:", Object.keys(catMap));

const products = [
  // ── Mobile Phones ─────────────────────────────
  { name: "Google Pixel 9 Pro", price: 109999, category: "Mobile Phones", description: "Google Tensor G4 chip, 50MP camera with Super Res Zoom, 7 years of OS updates, advanced AI photography features, 6.3\" LTPO OLED.", image: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=400&q=80" },
  { name: "Motorola Edge 50 Pro", price: 31999, category: "Mobile Phones", description: "Snapdragon 7 Gen 3, 50MP OIS camera, 125W TurboPower charging, 6.7\" pOLED 144Hz display, IP68 water resistance.", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80" },
  { name: "Vivo X100 Pro", price: 89999, category: "Mobile Phones", description: "ZEISS co-engineered 50MP cameras, Dimensity 9300, 5400mAh battery, 100W FlashCharge, 6.78\" AMOLED curved display.", image: "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=400&q=80" },
  { name: "Nothing Phone 2a Plus", price: 19999, category: "Mobile Phones", description: "Dimensity 7350 Pro, 50MP main camera, Glyph Interface lighting, 4500mAh battery, 45W charging, clean Android UI.", image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&q=80" },

  // ── Laptops ───────────────────────────────────
  { name: "Lenovo ThinkPad X1 Carbon", price: 149999, category: "Laptops", description: "Intel Core Ultra 7, 16GB RAM, 512GB SSD, 14\" IPS display, MIL-SPEC tested, legendary keyboard. The business laptop of choice.", image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&q=80" },
  { name: "ASUS ROG Zephyrus G14", price: 139999, category: "Laptops", description: "AMD Ryzen 9, GeForce RTX 4070, 16GB DDR5, 14\" QHD+ 165Hz display, MiniLED, 0.59 kg ultra-light gaming powerhouse.", image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&q=80" },
  { name: "Microsoft Surface Laptop 5", price: 119999, category: "Laptops", description: "Intel Evo i5-1245U, 8GB RAM, 256GB SSD, 13.5\" PixelSense touch display, all-day battery, slim premium design.", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80" },

  // ── Headphones & Audio ────────────────────────
  { name: "Samsung Galaxy Buds Pro 2", price: 10999, category: "Headphones & Audio", description: "True wireless earbuds with Intelligent ANC, 360 Audio, IPX7, 3+5hr battery, automatic switching between Galaxy devices.", image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&q=80" },
  { name: "Sennheiser Momentum 4", price: 34990, category: "Headphones & Audio", description: "60hr battery life, adaptive ANC, premium sound tuning, foldable design, multipoint connectivity, USB-C and 3.5mm.", image: "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=400&q=80" },
  { name: "boAt Airdopes 141 TWS", price: 1299, category: "Headphones & Audio", description: "42H total battery, ENx noise cancellation for calls, IPX4 sweat resistance, Bluetooth 5.1, beast mode for gaming.", image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400&q=80" },

  // ── Electronics ───────────────────────────────
  { name: "LG 55\" C3 OLED TV", price: 124999, category: "Electronics", description: "Evo OLED panel, α9 Gen6 AI Processor, webOS, Dolby Vision IQ, 120Hz, VRR for gaming. Perfect picture quality.", image: "https://images.unsplash.com/photo-1601944177325-f8867652837f?w=400&q=80" },
  { name: "Xiaomi Smart TV X75", price: 74999, category: "Electronics", description: "75\" 4K QLED panel, Atmos sound, Android TV 11, Dolby Vision, MEMC motion enhancement, bezel-less display.", image: "https://images.unsplash.com/photo-1593359677879-a4bb92f4834a?w=400&q=80" },
  { name: "Mi Air Purifier 4", price: 8999, category: "Electronics", description: "HEPA filtration, smart app control, ultra-silent mode, PM2.5 sensor display, compatible with Alexa & Google Home.", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80" },
  { name: "Apple iPad Air M2", price: 69900, category: "Electronics", description: "Apple M2 chip, 11\" Liquid Retina, USB-C, Apple Pencil Pro + Magic Keyboard support. Supercharged for what's next.", image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&q=80" },
  { name: "Amazon Echo Dot 5th Gen", price: 4999, category: "Electronics", description: "Compact smart speaker, improved sound, built-in motion sensor, temperature sensor, eero compatibility, Alexa built-in.", image: "https://images.unsplash.com/photo-1543512214-318c7553f230?w=400&q=80" },

  // ── Cameras ───────────────────────────────────
  { name: "Nikon Z30 Mirrorless", price: 74990, category: "Cameras", description: "20.9MP APS-C sensor, 4K video, flip-out vari-angle screen, no viewfinder, made for content creators and vloggers.", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&q=80" },
  { name: "DJI Mini 4 Pro Drone", price: 74900, category: "Cameras", description: "4K/60fps video, 48MP photo, omnidirectional obstacle sensing, ActiveTrack 360, 34min max flight time.", image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400&q=80" },
  { name: "Fujifilm Instax Mini 12", price: 6999, category: "Cameras", description: "Compact instant camera, auto exposure, built-in selfie mirror, close-up lens, parallax correction. Prints credit card size.", image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&q=80" },

  // ── Fashion ───────────────────────────────────
  { name: "Adidas Ultraboost 24", price: 17999, category: "Fashion", description: "Boost cushioning, PRIMEKNIT upper, Continental rubber outsole, available in multiple colorways. Best running experience.", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80" },
  { name: "Fossil Gen 6 Smartwatch", price: 19995, category: "Fashion", description: "Wear OS, heart rate & SpO2 tracking, 1.28\" AMOLED, GPS, NFC payments, stainless steel case. Premium hybrid smart watch.", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80" },
  { name: "Puma Men's Running Jacket", price: 3499, category: "Fashion", description: "Lightweight wind & water resistant jacket, mesh lining, reflective accents, adjustable cuffs. Ideal for morning runs.", image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&q=80" },
  { name: "Wildcraft Hiking Backpack 60L", price: 4999, category: "Fashion", description: "Water resistant, padded shoulder straps, multiple pockets, rain cover included, chest strap, ventilated back panel.", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80" },

  // ── Home & Kitchen ────────────────────────────
  { name: "Instant Pot Duo 7-in-1", price: 9999, category: "Home & Kitchen", description: "Pressure cooker, slow cooker, rice cooker, steamer, sauté pan, yogurt maker, warming pot. 6 quart capacity.", image: "https://images.unsplash.com/photo-1585515320310-259814833e62?w=400&q=80" },
  { name: "Morphy Richards Coffee Maker", price: 3299, category: "Home & Kitchen", description: "1.25L capacity, anti-drip valve, removable filter basket, brew pause function, glass carafe, 800W heating element.", image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=80" },
  { name: "Prestige Electric Kettle", price: 1099, category: "Home & Kitchen", description: "1.5L stainless steel kettle, 1500W rapid boil, auto shut-off, 360° cordless base, boil-dry protection, zero halogen.", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80" },
  { name: "IKEA KALLAX Shelf Unit", price: 8999, category: "Home & Kitchen", description: "4 compartments, clean design fits with any decor style, can be used horizontally or vertically, 77x77cm.", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80" },
  { name: "WonderChef Wonderfry 3L", price: 5499, category: "Home & Kitchen", description: "Digital 3L air fryer, 8 preset cooking modes, 1200W, compact design, non-stick basket, healthy oil-less cooking.", image: "https://images.unsplash.com/photo-1585515320310-259814833e62?w=400&q=80" },

  // ── New: Sporting Goods ───────────────────────
  { name: "Yonex Duora 10 Badminton", price: 8999, category: "Fashion", description: "Professional badminton racket, dual-optimum system, isometric head shape, ultra-lightweight graphite shaft. 3U weight.", image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=400&q=80" },

  // ── Gaming ────────────────────────────────────
  { name: "Sony PlayStation 5 Slim", price: 54990, category: "Electronics", description: "825GB SSD, 4K Blu-ray, Tempest 3D AudioTech, DualSense haptic feedback controller, slimmer design than original PS5.", image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&q=80" },
  { name: "Xbox Series X", price: 52990, category: "Electronics", description: "True 4K gaming, 120fps, Quick Resume, Smart Delivery, Game Pass integration, 1TB NVMe SSD, 12 Teraflop GPU.", image: "https://images.unsplash.com/photo-1605901309584-818e25960a8f?w=400&q=80" },
];

let added = 0;
for (const p of products) {
  const catId = catMap[p.category];
  if (!catId) { console.log("⚠️  Category not found:", p.category); continue; }
  const exists = await Product.findOne({ name: p.name });
  if (!exists) {
    await Product.create({ name: p.name, price: p.price, category: catId, description: p.description, image: p.image });
    console.log("✅ Added:", p.name);
    added++;
  } else {
    console.log("⏩ Exists:", p.name);
  }
}

console.log(`\n🎉 Done! Added ${added} new products.`);
await mongoose.disconnect();
