import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true,
    },
    userName: {
        type: String,
        required: true, 
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    dateOfBirth: {
        type: Date,
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Others'],
    },
    bio: {
        type: String,
        trim: true,
    },
    profilePic: {
        type: String,
    },
    location: {
        type: String,
    },
    accountType: {
        type: String,
        enum: ['Job-seeker', 'Employer'],
    },
    skills: [{
        type: String,
        trim: true,
    }],
    portfolios: [String],
    education: [
        {
            instituteName: {
                type: String,
                trim: true,
            },
            degree: {
                type: String,
                trim: true,
            },
            description: {
                type: String,
                trim: true,
            },
            duration: {
                startDate: {
                    type: Date,
                },
                endDate: {
                    type: Date,
                },
            },
        }
    ],
    experience: [
        {
            companyName: {
                type: String,
                trim: true,
            },
            role: {
                type: String,
                trim: true,
            },
            roleType: {
                type: String,
                enum: ['Full-time', 'Part-time', 'Internship', 'Remote', 'Contract'],
            },
            location: {
                type: String,
                trim: true,
            },
            description: {
                type: String,
                trim: true,
            },
            duration: {
                startDate: {
                    type: Date,
                },
                endDate: {
                    type: Date,
                },
            },
        }
    ],
    instagramLink: {
        type: String,
        trim: true,
    },
    twitterLink: {
        type: String,
        trim: true,
    },
    websiteLink: {
        type: String,
        trim: true,
    },
    languages: [{
        type: String,
        trim: true,
    }],
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;
