import express from 'express';
import { isAuthenticated } from '../middlewares/authMiddleware.js';
import { createApplication, deleteApplication, getApplicationById, getApplications, updateApplication, getApplicationsByUser } from '../controllers/applicationController.js';

const router = express.Router();

router.post('/apply', isAuthenticated, createApplication);
router.get('/get-application', isAuthenticated, getApplications);
router.get('/user', isAuthenticated, getApplicationsByUser);
router.get('/get-application/:id', isAuthenticated, getApplicationById);
router.delete('/delete-application/:id', isAuthenticated, deleteApplication);
router.post('/update-application/:id', isAuthenticated, updateApplication);

export default router;