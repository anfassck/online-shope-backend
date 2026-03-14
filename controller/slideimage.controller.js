import SlideImage from "../models/slideimage.js";


export const createSlideimage = async (req, res) => {
  try {
    const { name } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : "";

    if (!name || !image) {
      return res.status(400).json({ message: "Name and image are required." });
    }

    const newSlide = await SlideImage.create({ name, image });

    res.status(201).json({
      message: "✅ New slide image added successfully",
      slide: newSlide,
    });
  } catch (err) {
    console.error("Error adding slide image:", err);
    res.status(500).json({ message: "❌ Error adding slide image" });
  }
};

export const UpdateSlideimage = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    
    // Find the slide first
    const existingSlide = await SlideImage.findById(id);
    if (!existingSlide) return res.status(404).json({ message: "Slide not found" });

    const updateData = { name };
    // Only update image if specific file uploaded
    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const updated = await SlideImage.findByIdAndUpdate(id, updateData, { new: true });
    res.status(200).json({ message: "✅ Slide image updated successfully", slide: updated });
  } catch (err) {
    console.error("Error updating slide image:", err);
    res.status(500).json({ message: "❌ Error updating slide image" });
  }
};

export const GetAllSlideimage = async (req, res) => {
  try { 
    const slides = await SlideImage.find();
    res.status(200).json(slides);
  } catch (err) {
    console.error("Error fetching slide images:", err);
    res.status(500).json({ message: "❌ Error fetching slide images" });
  }
};

export const DeleteSlideimageById = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await SlideImage.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Slide image not found" });
    }

    res.status(200).json({ message: `✅ Slide image ${id} deleted successfully` });
  } catch (err) {
    console.error("Error deleting slide image:", err);
    res.status(500).json({ message: "❌ Error deleting slide image" });
  }
};
