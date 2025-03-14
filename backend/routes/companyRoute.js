import express from 'express';
import { isAuthenticated } from '../middlewares/authMiddleware.js';
import { createCompany, deleteCompany, getAllCompanies, getCompanyById, updateCompany } from '../controllers/companyController.js';
import multer from 'multer';
import cloudinary from '../config/cloudinary.js';
import Company from '../models/companyModel.js';

const router = express.Router();

router.get("/get-company", isAuthenticated, getAllCompanies);
router.get("/get-company/:id", isAuthenticated, getCompanyById);
router.post("/create-company", isAuthenticated, createCompany);
router.post("/update-company/:id", isAuthenticated, updateCompany);
router.delete("/delete-company/:id", isAuthenticated, deleteCompany);

const storage = multer.diskStorage({
    filename: (req, file, callback) => {
      callback(null, Date.now() + file.originalname);
    },
});

router.post("/image/:id", isAuthenticated,  multer({ storage: storage }).single("file"), async(req, res) => {
    try {   
        const result = await cloudinary.uploader.upload(req.file.path, {folder: "company"});
        const company = await Company.findById(req.params.id);

        company.companyLogo = result.secure_url;

        return res.status(200).json({ ok: true, message: "Image uploaded successfully", data: user });
    } catch (error) {
        console.error("Error in uploading image", error);
        return res.status(500).json({ ok: false, message: "Internal server error" });
    }
})


export default router;