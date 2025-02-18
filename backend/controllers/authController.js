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
            return res.status(400).send({success: false, message: "Wrong confirm password"});
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
        let newUser = {id: user._id, userName: user.userName, email: user.email}

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