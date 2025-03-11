import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true,
        trim: true,
    },
    companyLogo: {
        type: String,
        trim: true,
    },
    employees: {
        type: Number,
        required: true,
        min: 1, 
    },
    industry: {
        type: String,
        trim: true,
    },
    foundedOn: {
        type: Date,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        required: true,
    },
    jobOpen: {
        type: Number,
        required: true,
        min: 0, 
    },
    websiteLink: {
        type: String,
        trim: true,
    },
    locations: [{
        type: String,
        trim: true,
    }],
    techStack: [{
        type: String,
        trim: true,
    }],
    teamMembers: [{
        name: {
            type: String,
            trim: true,
        },
        pic: {
            type: String,
            trim: true,
        },
        role: {
            type: String,
            trim: true,
        },
        instagramLink: {
            type: String,
            trim: true,
        },
        linkedInLink: {
            type: String,
            trim: true,
        }
    }],
    benefits: [{
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        }       
    }]
}, { timestamps: true });

const Company = mongoose.model("Company", companySchema);
export default Company;
