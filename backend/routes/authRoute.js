import express from 'express'
import { login, logout, register, updateEmailPassword, updateProfile, getProfile } from '../controllers/authController.js';
import { isAuthenticated } from '../middlewares/authMiddleware.js';
import multer from 'multer';
import cloudinary from '../config/cloudinary.js';
import User from '../models/userModal.js';

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/profile", isAuthenticated, getProfile);
router.post("/update-profile", isAuthenticated, updateProfile);
router.post("/update-email-password", isAuthenticated, updateEmailPassword);

const storage = multer.diskStorage({
    filename: (req, file, callback) => {
      callback(null, Date.now() + file.originalname);
    },
});

router.post("/image", isAuthenticated,  multer({ storage: storage }).single("file"), async(req, res) => {
    try {   
        const result = await cloudinary.uploader.upload(req.file.path, {folder: "user"});
        const user = await User.findById(req.id);

        user.profilePic = result.secure_url;

        return res.status(200).json({ ok: true, message: "Image uploaded successfully", data: user });
    } catch (error) {
        console.error("Error in uploading image", error);
        return res.status(500).json({ ok: false, message: "Internal server error" });
    }
})

export default router;