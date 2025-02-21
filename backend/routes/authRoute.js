import express from 'express'
import { login, logout, register, updateEmailPassword, updateProfile } from '../controllers/authController.js';
import { isAuthenticated } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.post("/updateProfile", isAuthenticated, updateProfile);
router.post("/updateEmailPassword", isAuthenticated, updateEmailPassword);

export default router;