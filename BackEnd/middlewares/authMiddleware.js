import expressAsyncHandler from "express-async-handler";
import { verifyToken } from "../utils/authUtils";
import User from "../models/userSchema";

const authenticate = expressAsyncHandler(async (req, res, next) => {
    try {
        const authorization = req.headers.authorization;
        const token = authorization?.split(" ")[1];
        
        if (!authorization || !authorization.startsWith('Bearer') || !token) {
            res.status(401);
            throw new Error("Unauthorized access. Invalid token.");
        }

        const decoded = verifyToken(token);

        req.user = await User.findById(decoded._id).select('-password');
        if (!req.user) {
            res.status(401);
            throw new Error("Unauthorized access. User not found.");
        }
        next();
    } catch (error) {
        res.status(401);
        next(error);
    }
})

export default authenticate