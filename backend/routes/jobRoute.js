import express from 'express';
import { isAuthenticated } from '../middlewares/authMiddleware.js';
import { closeJob, createJob, deleteJob, getAllJobs, getJobById, getJobsByCompany, updateJob } from '../controllers/jobController.js';
import multer from 'multer';
import cloudinary from '../config/cloudinary.js';

const router = express.Router();

router.get("/get-job", isAuthenticated, getAllJobs); 
router.get("/get-job/:id", isAuthenticated, getJobById);
router.post("/create-job", isAuthenticated, createJob);
router.get("/get-job-by-company/:id", isAuthenticated, getJobsByCompany);
router.post("/update-job/:id", isAuthenticated, updateJob);
router.delete("/delete-job/:id", isAuthenticated, deleteJob);
router.post("/close-job/:id", isAuthenticated, closeJob);


export default router;