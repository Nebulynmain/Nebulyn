import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true,
    },
    applicants : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    jobTitle: {
        type: String,
        required: true,
    },
    jobDescription: {
        type: String,
        required: true,
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
    salary: {
        type: Number,
        required: true,
    },
    skillsRequired: [{
        type: String,
    }],
    responsibilities: [{
        type: String,
    }],
    niceToHave: [{
        type: String,
    }],
    perksAndBenefits: [{
        type: String,
    }],
    whoYouAre: [{
        type: String,
    }]
})

const Job = mongoose.model('Job', jobSchema);
export default Job;