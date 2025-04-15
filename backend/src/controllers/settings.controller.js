import User from "../models/user.model.js";

export const updateUserSettings = async (req, res) => {
  try {
    const { userId } = req.params;
    const updates = req.body;
    
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updates },
      { new: true }
    ).select("-password");

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating settings:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
