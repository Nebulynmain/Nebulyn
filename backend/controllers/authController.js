import User from "../models/userModal.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async(req, res)=>{
    try {
        const {fullName, userName, email, password, confirmPassword} = req.body;
        if(!fullName || !userName || !email || !password || !confirmPassword){
            return res.status(400).send({success: false, message: 'All fields are required'});
        }
        if(password !== confirmPassword){
            return res.status(400).send({success: false, message: "Wrong password"});
        }
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).send({success: false, message: "User already exits"});
        }

        const hashPassword = await bcrypt.hash(password, 5);
        const newUser = new User({fullName, userName, email , password: hashPassword});
        await newUser.save();
        return res.status(200).send({success: true, message: "User registered successfully", user: newUser});
    } catch (error) {
        console.log("Error in registeration", error);
    }
}

export const login = async(req, res)=>{
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).send({success: false, message: "All fields are required"});
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).send({success: false, message: "No user found"});
        }
        const match = await bcrypt.compare(password, user.password);
        if(!match){
            return res.status(400).send({success: false, message: "Incorrect password"});
        }
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: '1D'});
        let newUser = {_id: user._id, userName: user.userName, email: user.email}

        return res.status(200).cookie("token", token, {maxAge: 1*24*60*60*1000, httponly: true, sameSite: 'strict'}).send({
            success: true,
            message: `Welcome Back ${user.userName}`,
            user: newUser
        })
    } catch (error) {
        console.log("Error in login", error);
    }
}

export const logout = async(req, res)=>{
    try {
        return res.status(200).cookie("token", "", {maxAge: 0}).send({
            message: "Logged out successfully",
            success : true,
        })
    } catch (error) {
        console.log("Error in logout", error);
    }
}

export const updateProfile = async(req, res)=>{
    try {
        const id = req.id;
        const updatedUser = await User.findByIdAndUpdate(id, req.body, {new: true, runValidators: true});

        return res.status(200).send({success: true, message: "Profile updated successfully", user: updatedUser});
    } catch (error) {
        console.log("Error in updating profile", error);    
    }
}

export const updateEmailPassword = async(req, res)=>{
    try {
        const id = req.id;
        const user = await User.findById(id);

        if(req.body.email){
            user.email = req.body.email;
        }
        if (req.body.oldPassword && req.body.newPassword) {
            const isMatch = await bcrypt.compare(req.body.oldPassword, user.password);
            if (!isMatch) {
                return res.status(400).send({ success: false, message: "Old password is incorrect" });
            }

            const hashedPassword = await bcrypt.hash(req.body.newPassword, 10);
            user.password = hashedPassword;
        }

        await user.save();
        return res.status(200).send({success: true, message: 'Profile updated successfully'});
    } catch (error) {
        console.log("Error in updating profile", error);    
    }
}