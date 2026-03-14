import category from "../models/category.js";

// Create Category
export const CreateCategory = async (req, res) => {
  try {
    const { name } = req.body;

    const image = req.file ? `/uploads/${req.file.filename}` : "";

    const newCategory = await category.create({
      name,
      image,
      createdAt: new Date()
    });

    res.status(201).json(newCategory);

  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding category");
  }
};

// 🔹 Update Category
export const UpdateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    
    const existingCategory = await category.findById(id);
    if (!existingCategory) return res.status(404).send("Category not found");

    const updateData = { name };
    // Only update image if specific file uploaded
    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const updated = await category.findByIdAndUpdate(id, updateData, { new: true });
    res.status(200).json({ message: "Category updated successfully", category: updated });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating category");
  }
};

// Get All Categories
export const GetAllCategory = async (req, res) => {
  try {
    const category_list = await category.find().sort({ createdAt: -1 });
    res.json(category_list);

  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching categories");
  }
};


// Get Category by ID
export const GetCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const prdt = await category.findById(id);

    if (!prdt) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json(prdt);

  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching category");
  }
};


// ⭐ Delete Category
export const DeleteCategorybyId = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await category.findByIdAndDelete(id);
    console.log(deleted)

    if (!deleted) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json({ message: "Category deleted successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting category" });
  }
};