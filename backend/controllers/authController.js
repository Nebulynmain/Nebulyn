import User from "../models/userModal.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    try {
        const { fullName, userName, email, password, confirmPassword } = req.body;
        if (!fullName || !userName || !email || !password || !confirmPassword) {
            return res.status(400).json({ ok: false, message: 'All fields are required', data: null });
        }
        if (password !== confirmPassword) {
            return res.status(400).json({ ok: false, message: "Password do not match", data: null });
        }
        
        const existingUser = await User.findOne({ $or: [{ email }, { userName }] });
        if (existingUser) {
            return res.status(400).json({ ok: false, message: "User already exists", data: null });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ fullName, userName, email, password: hashedPassword });
        await newUser.save();

        return res.status(201).json({ ok: true, message: "User registered successfully", data: newUser });
    } catch (error) {
        console.error("Error in registration", error);
        return res.status(500).json({ ok: false, message: "Internal server error", data: null });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ ok: false, message: "User not found", data: null });
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ ok: false, message: "Incorrect password", data: null });
        }

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        const userData = { _id: user._id, userName: user.userName, email: user.email };

        return res.status(200).cookie("token", token, {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: 'strict'
        }).json({ ok: true, message: `Welcome back, ${user.userName}`, data: userData });
    } catch (error) {
        console.error("Error in login", error);
        return res.status(500).json({ ok: false, message: "Internal server error", data: null });
    }
};

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            ok: true,
            message: "Logged out okfully",
            data: null
        });
    } catch (error) {
        console.error("Error in logout", error);
        return res.status(500).json({ ok: false, message: "Internal server error", data: null });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const id = req.id;
        const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

        return res.status(200).json({ ok: true, message: "Profile updated successfully", data: updatedUser });
    } catch (error) {
        console.error("Error in updating profile", error);
        return res.status(500).json({ ok: false, message: "Internal server error", data: null });
    }
};

export const updateEmailPassword = async (req, res) => {
    try {
        const id = req.id;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ ok: false, message: "User not found", data: null });
        }

        if (req.body.email) {
            user.email = req.body.email;
        }
        if (req.body.oldPassword && req.body.newPassword) {
            const isMatch = await bcrypt.compare(req.body.oldPassword, user.password);
            if (!isMatch) {
                return res.status(400).json({ ok: false, message: "Old password is incorrect", data: null });
            }

            user.password = await bcrypt.hash(req.body.newPassword, 10);
        }

        await user.save();
        return res.status(200).json({ ok: true, message: 'Profile updated successfully', data: user });
    } catch (error) {
        console.error("Error in updating profile", error);
        return res.status(500).json({ ok: false, message: "Internal server error", data: null });
    }
};
