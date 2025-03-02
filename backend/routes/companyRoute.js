import express from 'express';
import { isAuthenticated } from '../middlewares/authMiddleware.js';
import { createCompany, deleteCompany, getAllCompanies, getCompanyById, updateCompany } from '../controllers/companyController.js';

const router = express.Router();

router.get("/getCompany", isAuthenticated, getAllCompanies);
router.get("/getCompany/:id", isAuthenticated, getCompanyById);
router.post("/createCompany", isAuthenticated, createCompany);
router.post("/updateCompany/:id", isAuthenticated, updateCompany);
router.delete("/deleteCompany/:id", isAuthenticated, deleteCompany);

export default router;