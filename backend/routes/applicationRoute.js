import express from 'express';
import { isAuthenticated } from '../middlewares/authMiddleware.js';
import { createApplication, deleteApplication, getApplicationById, getApplications, updateApplicationStatus } from '../controllers/applicationController.js';

const router = express.Router();

router.post('/create-application', isAuthenticated, createApplication);
router.get('/get-applications', isAuthenticated, getApplications);
router.get('/get-application/:id', isAuthenticated, getApplicationById);
router.delete('/delete-application/:id', isAuthenticated, deleteApplication);
router.post('/update-application-status/:id', isAuthenticated, updateApplicationStatus);

export default router;