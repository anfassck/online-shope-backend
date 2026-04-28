import product from "../models/product.js";

// 🔹 Create Product
export const CreateProduct = async (req, res) => {
  try {
    const { name, price, category, description } = req.body;

    if (!name || !price || !category || !description) {
      return res.status(400).send("Name, Price, Category & Description are required!");
    }

    const image = req.file ? `http://localhost:8080/uploads/${req.file.filename}` : "";

    await product.create({ name, price, image, category, description });

    res.send("New product added successfully!");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding product: " + err.message);
  }
};

// 🔹 Update Product
export const UpdateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, category, description } = req.body;
    
    // Find the product first
    const existingProduct = await product.findById(id);
    if (!existingProduct) return res.status(404).send("Product not found");

    const updateData = { name, price, category, description };
    
    // If there's a new file uploaded, update image. Otherwise keep old.
    if (req.file) {
      updateData.image = `http://localhost:8080/uploads/${req.file.filename}`;
    }

    const updated = await product.findByIdAndUpdate(id, updateData, { new: true });
    res.status(200).json({ message: "Product updated successfully", product: updated });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating product");
  }
};


// 🔹 Get All Products
export const GetAllProducts = async (req, res) => {
  try {
    const { category } = req.query;

    let product_list;
    if (category) {
      product_list = await product.find({ category });
    } else {
      product_list = await product.find();
    }

    res.json(product_list);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching products");
  }
};

// 🔹 Delete Product by ID
export const DeleteProductbyId = async (req, res) => {
  try {
    const { id } = req.params;
    await product.findByIdAndDelete(id);
    res.send(`Product ${id} deleted successfully`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting product");
  }
};

// 🔹 Search Product (name + category)
export const SearchProduct = async (req, res) => {
  try {
    const query = req.query.q;

    const products = await product.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } }
      ]
    });

    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error searching product");
  }
};

// 🔹 Get Product by ID
export const GetProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const prdt = await product.findById(id).populate("category"); // populate category details
    res.json(prdt);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching product");
  }
};
