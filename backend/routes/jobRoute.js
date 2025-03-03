import express from 'express';
import { isAuthenticated } from '../middlewares/authMiddleware.js';
import { applyForJob, closeJob, createJob, deleteJob, getAllJobs, getJobById, getJobsByCompany, updateJob } from '../controllers/jobController.js';

const router = express.Router();

router.get("/getJob", isAuthenticated, getAllJobs); 
router.get("/getJob/:id", isAuthenticated, getJobById);
router.post("/createJob", isAuthenticated, createJob);
router.get("/getJobByCompany/:id", isAuthenticated, getJobsByCompany);
router.post("/applyJob/:id", isAuthenticated, applyForJob);
router.post("/updateJob/:id", isAuthenticated, updateJob);
router.delete("/deleteJob/:id", isAuthenticated, deleteJob);
router.post("/closeJob/:id", isAuthenticated, closeJob);

export default router;