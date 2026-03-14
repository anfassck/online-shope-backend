const products = [
  { name: "iPhone 15 Pro", price: "129999", category: "69b4efc7b68de5c8ef45b3a0", description: "Titanium design, A17 Pro chip." },
  { name: "Samsung Galaxy S24 Ultra", price: "134999", category: "69b4efc7b68de5c8ef45b3a0", description: "Galaxy AI, 200MP camera, Titanium exterior." },
  { name: "OnePlus 12 5G", price: "64999", category: "69b4efc7b68de5c8ef45b3a0", description: "Snapdragon 8 Gen 3, Hasselblad Camera System." },
  { name: "Google Pixel 8 Pro", price: "106999", category: "69b4efc7b68de5c8ef45b3a0", description: "Incredible AI cameras, Tensor G3 processor." },
  { name: "Xiaomi 14", price: "69999", category: "69b4efc7b68de5c8ef45b3a0", description: "Leica optics co-engineered, ultra smooth display." },
  { name: "Vivo X100 Pro", price: "89999", category: "69b4efc7b68de5c8ef45b3a0", description: "Zeiss optics, MediaTek Dimensity 9300 flagship." },
  { name: "Samsung Galaxy A54", price: "38999", category: "69b4efc7b68de5c8ef45b3a0", description: "Awesome camera, awesome battery, awesome screen." },
  { name: "Nothing Phone (2)", price: "44999", category: "69b4efc7b68de5c8ef45b3a0", description: "Unique Glyph Interface, Snapdragon 8+ Gen 1." }
];

async function seed() {
  for (const p of products) {
    const fd = new FormData();
    fd.append("name", p.name);
    fd.append("price", p.price);
    fd.append("category", p.category);
    fd.append("description", p.description);

    try {
      const res = await fetch("http://localhost:8080/product", {
        method: "POST",
        body: fd
      });
      console.log(`Added ${p.name}: ${res.status}`);
    } catch (e) {
      console.error(e);
    }
  }
}

seed();
