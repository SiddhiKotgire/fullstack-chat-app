import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js"

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "Please fill in all fields." });
    }

    // Hash Passwords
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password should be at least 6 characters" });
    }

    const user = await User.findOne({ email });

    if (user)
      return res.status(400).json({ message: "Email is already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        email: newUser.email,
        fullName: newUser.fullName,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      email: user.email,
      fullName: user.fullName,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateProfile = async(req,res) =>{
  try {
    const {profilePic} = req.body;
    const userId = req.user._id;
    
    if(!profilePic) {
      return res.status(400).json({message: "Please add a profile picture"});
    }

    // Validate base64 string
    if (!profilePic.startsWith('data:image/')) {
      return res.status(400).json({message: "Invalid image format"});
    }

    // Upload to Cloudinary with timeout
    const uploadResponse = await Promise.race([
      cloudinary.uploader.upload(profilePic, {
        resource_type: "auto",
        timeout: 10000 // 10 second timeout
      }),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Upload timeout')), 10000)
      )
    ]);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {profilePic: uploadResponse.secure_url},
      {new: true}
    ).select('-password');

    res.status(200).json({
      message: "Profile updated successfully", 
      user: updatedUser
    });
    
  } catch(error) {
    console.error("Error in update profile controller:", error.message);
    if (error.message.includes('File size too large')) {
      res.status(413).json({message: "Image size too large (max 10MB)"});
    } else if (error.message.includes('Upload timeout')) {
      res.status(504).json({message: "Image upload timed out"});
    } else {
      res.status(500).json({message: "Failed to update profile"});
    }
  }
}

export const checkAuth = async(req,res) =>{
try{
res.status(200).json(req.user);
}catch (error){
  console.log("Error in check auth controller", error.message);
  res.status(500).json({message: "Internal Server Error"});
}
}

