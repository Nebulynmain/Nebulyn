import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true,
    },
    applicants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    jobTitle: {
        type: String,
        required: true,
        trim: true,
    },
    jobDescription: {
        type: String,
        required: true,
        trim: true,
    },
    status: {
        type: String,
        default: 'Live',
        enum: ['Live', 'Closed'],
    },
    jobType: {
        type: String,
        enum: ['Full-time', 'Part-time', 'Internship', 'Remote', 'Contract'],
        required: true,
    },
    location: {
        type: String,
        trim: true,
    },
    salary: {
        type: Number,
        required: true,
        min: 0, 
    },
    skillsRequired: [{
        type: String,
        trim: true,
    }],
    responsibilities: [{
        type: String,
        trim: true,
    }],
    niceToHave: [{
        type: String,
        trim: true,
    }],
    perksAndBenefits: [{
        type: String,
        trim: true,
    }],
    whoYouAre: [{
        type: String,
        trim: true,
    }]
}, { timestamps: true });

const Job = mongoose.model('Job', jobSchema);
export default Job;
