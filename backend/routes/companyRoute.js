import express from 'express';
import { isAuthenticated } from '../middlewares/authMiddleware.js';
import { createCompany, deleteCompany, getAllCompanies, getCompanyById, updateCompany } from '../controllers/companyController.js';

const router = express.Router();

router.get("/get-company", isAuthenticated, getAllCompanies);
router.get("/get-company/:id", isAuthenticated, getCompanyById);
router.post("/create-company", isAuthenticated, createCompany);
router.post("/update-company/:id", isAuthenticated, updateCompany);
router.delete("/delete-company/:id", isAuthenticated, deleteCompany);

export default router;