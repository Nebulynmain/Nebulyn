import Application from "../models/applicationModel.js";
import Job from "../models/jobModel.js";
import User from "../models/userModal.js";



export const createApplication = async (req, res) => {
    try {
        const { job, applicant } = req.body;

        const jobExists = await Job.findById(job);
        const userExists = await User.findById(applicant);
        if (!jobExists || !userExists) {
            return res.status(404).json({ ok: false, message: "Job or User not found", data: null });
        }

        const existingApplication = await Application.findOne({ job, applicant });
        if (existingApplication) {
            return res.status(400).json({ ok: false, message: "You have already applied for this job", data: null });
        }

        const application = await Application.create({ job, applicant });
        res.status(201).json({ ok: true, message: "Application submitted successfully", data: application });
    } catch (error) {
        res.status(500).json({ ok: false, message: "Server Error", data: error.message });
    }
};


export const getApplications = async (req, res) => {
    try {
        const applications = await Application.find().populate("job").populate("applicant");
        res.status(200).json({ ok: true, message: "Applications retrieved successfully", data: applications });
    } catch (error) {
        res.status(500).json({ ok: false, message: "Server Error", data: error.message });
    }
};


export const getApplicationById = async (req, res) => {
    try {
        const application = await Application.findById(req.params.id).populate("job").populate("applicant");
        if (!application) {
            return res.status(404).json({ ok: false, message: "Application not found", data: null });
        }
        res.status(200).json({ ok: true, message: "Application retrieved successfully", data: application });
    } catch (error) {
        res.status(500).json({ ok: false, message: "Server Error", data: error.message });
    }
};

export const updateApplicationStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const validStatuses = ["In Review", "Shortlisted", "Interview", "Hired", "Rejected"];

        if (!validStatuses.includes(status)) {
            return res.status(400).json({ ok: false, message: "Invalid status value", data: null });
        }

        const application = await Application.findByIdAndUpdate(req.params.id, { status }, { new: true });
        if (!application) {
            return res.status(404).json({ ok: false, message: "Application not found", data: null });
        }

        res.status(200).json({ ok: true, message: "Application status updated successfully", data: application });
    } catch (error) {
        res.status(500).json({ ok: false, message: "Server Error", data: error.message });
    }
};


export const deleteApplication = async (req, res) => {
    try {
        const application = await Application.findByIdAndDelete(req.params.id);
        if (!application) {
            return res.status(404).json({ ok: false, message: "Application not found", data: null });
        }
        res.status(200).json({ ok: true, message: "Application deleted successfully", data: null });
    } catch (error) {
        res.status(500).json({ ok: false, message: "Server Error", data: error.message });
    }
};
