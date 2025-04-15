import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
    //TO decode the token 
    // in this we find the user is authenticated or not if authenticated then proceed.
    try {
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({ success: false, message: "Unautorized -No token Provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if (!decoded) {
            return res.status(401).json({ success: false, message: "Unautorized - Invalid Token" });
        }

        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(401).json({ success: false, message: "User not found" });
        }

        req.user = user;

        next()

    } catch (error) {
        console.log("Error in ProtectRoute middleware",error.message);
        res.status(500).json({ success: false, message: "Internal Server Error"});

    }
}