import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true,
    },
    companyLogo: {
        type: String,
    },
    employees:{
        type: Number,
        required: true,
    },
    industry: {
        type: String,
    },

    companyProfile: {
        type: String,
        required: true,
    },
    createdBy: {
        type: String,
        required: true,
    },
    jobOpen: {
        type: Number,
        required: true,
    },
    websiteLink: {
        type: String,
        trim: true,
    },
    locations: [{
        type: String,
    }],
    techStack: [{
        type: String,
    }],
    teamMembers: [{
        name: String,
        pic: String,
        role: String,
        instagramLink: String,
        linkedInLink: String,
    }],
    benefits: [{
        title: String,
        description: String,       
    }]
})

const Company = mongoose.model("Company", companySchema);
export default Company;