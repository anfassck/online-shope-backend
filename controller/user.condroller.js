import User from '../models/user.js';

const sendSms = async (to, body) => {
  // MOCK SMS sending since Twilio cannot be installed properly locally here
  console.log(`[SMS SENDING TO ${to}]: ${body}`);
};

// ---------------- SIGNUP ----------------
export const signUpUser = async (req, res) => {
  const { fullname, phone, email, password } = req.body;

  try {
    const new_user = await User.create({ fullname, phone, email, password });
    return res.status(201).json({ message: "User created successfully", user: new_user });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: "User creation failed", error: err.message });
  }
};

// ---------------- LOGIN ----------------
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const find_user = await User.findOne({ email });
    if (!find_user) return res.status(404).json({ message: "User not found" });

    if (find_user.password === password) {
      find_user.status = "online";
      await find_user.save();

      // Send SMS on login
      await sendSms(find_user.phone, `Hi ${find_user.fullname}, you have successfully logged into your Ceekeey account.`);

      return res.status(200).json({ message: "Login successful", user: find_user });
    } else {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ---------------- UPDATE PROFILE ----------------
export const updateUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullname, email, phone } = req.body;

    // Only update the fields provided
    const updateData = {};
    if (fullname) updateData.fullname = fullname;
    if (email) updateData.email = email;
    if (phone) updateData.phone = phone;

    // Only update profileImage if a new file was uploaded
    if (req.file) {
      updateData.profileImage = `/uploads/${req.file.filename}`;
    }

    const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "Profile updated successfully", user: updatedUser });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ---------------- GET ALL USERS ----------------
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    return res.status(200).json(users);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};
