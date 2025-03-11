import Job from "../models/jobModel.js";

export const createJob = async (req, res) => {
    try {
        const { title, description, company, location, employmentType, salary, requirements } = req.body;

        if (!title || !description || !company || !location || !employmentType || !salary || !requirements) {
            return res.status(400).json({ 
                ok: false, 
                message: "All required fields must be filled", 
                data: null 
            });
        }
        const newJob = new Job(req.body);
        await newJob.save();
        res.status(201).json({ ok: true, message: "Job created successfully", data: newJob });
    } catch (error) {
        res.status(400).json({ ok: false, message: error.message });
    }
};

export const getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find().populate("company");
        res.status(200).json({ ok: true, data: jobs });
    } catch (error) {
        res.status(500).json({ ok: false, message: error.message });
    }
};

export const getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id)
            .populate("company")
            .populate("applicants");

        if (!job) return res.status(404).json({ ok: false, message: "Job not found" });

        res.status(200).json({ ok: true, data: job });
    } catch (error) {
        res.status(500).json({ ok: false, message: error.message });
    }
};

export const updateJob = async (req, res) => {
    try {
        const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        if (!updatedJob) return res.status(404).json({ ok: false, message: "Job not found" });

        res.status(200).json({ ok: true, message: "Job updated successfully", data: updatedJob });
    } catch (error) {
        res.status(400).json({ ok: false, message: error.message });
    }
};

export const deleteJob = async (req, res) => {
    try {
        const deletedJob = await Job.findByIdAndDelete(req.params.id);

        if (!deletedJob) return res.status(404).json({ ok: false, message: "Job not found" });

        res.status(200).json({ ok: true, message: "Job deleted successfully" });
    } catch (error) {
        res.status(500).json({ ok: false, message: error.message });
    }
};

export const applyForJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) return res.status(404).json({ ok: false, message: "Job not found" });

        if (job.applicants.includes(req.id)) {
            return res.status(400).json({ ok: false, message: "You have already applied for this job" });
        }

        job.applicants.push(req.id);
        await job.save();

        res.status(200).json({ ok: true, message: "Successfully applied for the job", data: job });
    } catch (error) {
        res.status(500).json({ ok: false, message: error.message });
    }
};

export const getJobsByCompany = async (req, res) => {
    try {
        const jobs = await Job.find({ company: req.params.id }).populate("company");
        res.status(200).json({ ok: true, data: jobs });
    } catch (error) {
        res.status(500).json({ ok: false, message: error.message });
    }
};

export const closeJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) return res.status(404).json({ ok: false, message: "Job not found" });

        job.status = "Closed";
        await job.save();

        res.status(200).json({ ok: true, message: "Job closed successfully", data: job });
    } catch (error) {
        res.status(500).json({ ok: false, message: error.message });
    }
};
