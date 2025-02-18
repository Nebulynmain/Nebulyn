import express from 'express'
import { login, logout, register } from '../controllers/authController.js';

const router = express.Router();

router.post("/sign-up", register);
router.post("/login", login);
router.post("/logout", logout);

export default router;