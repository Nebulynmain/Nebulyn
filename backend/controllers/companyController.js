import Company from "../models/companyModel.js";
import Job from "../models/jobModel.js";
import Application from "../models/applicationModel.js";

export const createCompany = async (req, res) => {
    try {
        const { companyName, employees, description, jobOpen } = req.body;

        if (!companyName || !employees || !description || jobOpen === undefined) {
            return res.status(400).json({ 
                ok: false, 
                message: "All fields must be provided", 
                data: null 
            });
        }

        // Check if the company already exists
        const existingCompany = await Company.findOne({ companyName });
        if (existingCompany) {
            return res.status(400).json({ 
                ok: false, 
                message: "Company already registered", 
                data: null 
            });
        }

        const newCompany = new Company({ ...req.body, createdBy: req.id });
        await newCompany.save();

        res.status(201).json({ 
            ok: true, 
            message: "Company created successfully", 
            data: newCompany 
        });
    } catch (error) {
        console.error("Error in createCompany:", error);
        res.status(500).json({ 
            ok: false, 
            message: "Internal server error" 
        });
    }
};


export const getCompanyByUser = async (req, res) => {
    try {
        const id = req.id;
        const company = await Company.find({ createdBy: id });
        if(company.length === 0){
            return res.status(404).json({ ok: false, message: "Company not found" });
        }

        return res.status(200).json({ ok: true, data: company });
    } catch (error) {
        console.log("Error in getCompanyByUser:", error);
        res.status(500).json({ ok: false, message: error.message });
    }
}

export const getAllCompanies = async (req, res) => {
    try {
        const companies = await Company.find();
        res.status(200).json({ ok: true, data: companies });
    } catch (error) {
        console.log("Error in getAllCompanies:", error);
        res.status(500).json({ ok: false, message: error.message });
    }
};

export const getCompanyById = async (req, res) => {
    try {
        const company = await Company.findById(req.params.id);
        if (!company) {
            return res.status(404).json({ ok: false, message: "Company not found" });
        }
        res.status(200).json({ ok: true, data: company });
    } catch (error) {
        console.log("Error in getCompanyById:", error);
        res.status(500).json({ ok: false, message: error.message });
    }
};

export const updateCompany = async (req, res) => {
    try {
        const updatedCompany = await Company.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedCompany) {
            return res.status(404).json({ ok: false, message: "Company not found" });
        }
        res.status(200).json({ ok: true, message: "Company updated successfully", data: updatedCompany });
    } catch (error) {
        console.log("Error in updateCompany:", error);
        res.status(400).json({ ok: false, message: error.message });
    }
};

export const deleteCompany = async (req, res) => {
    try {
        const deletedCompany = await Company.findByIdAndDelete(req.params.id);
        if (!deletedCompany) {
            return res.status(404).json({ ok: false, message: "Company not found" });
        }
        res.status(200).json({ ok: true, message: "Company deleted successfully" });
    } catch (error) {
        console.log("Error in deleteCompany:", error);
        res.status(500).json({ ok: false, message: error.message });
    }
};

export const getCompanyDashboardStats = async (req, res) => {
    try {
        const id = req.id;
        
        // Get company details
        const company = await Company.findOne({ createdBy: id });
        if (!company) {
            return res.status(404).json({ ok: false, message: "Company not found" });
        }
        
        // Get all jobs for this company
        const jobs = await Job.find({ company: company._id }).populate('applications');
        
        // Get all applications for this company's jobs
        const jobIds = jobs.map(job => job._id);
        const applications = await Application.find({ job: { $in: jobIds } })
            .populate('applicant')
            .populate({
                path: 'job',
                populate: {
                    path: 'company'
                }
            });
        
        // Calculate statistics
        const totalJobs = jobs.length;
        const activeJobs = jobs.filter(job => job.status === 'Live').length;
        const totalApplications = applications.length;
        
        // Calculate applications by job type
        const applicationsByJobType = {};
        applications.forEach(app => {
            const jobType = app.job.jobType;
            if (!applicationsByJobType[jobType]) {
                applicationsByJobType[jobType] = 0;
            }
            applicationsByJobType[jobType]++;
        });
        
        // Calculate applications by status
        const applicationsByStatus = {};
        applications.forEach(app => {
            const status = app.status;
            if (!applicationsByStatus[status]) {
                applicationsByStatus[status] = 0;
            }
            applicationsByStatus[status]++;
        });
        
        // Get recent applications (last 7 days)
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        
        const recentApplications = applications.filter(app => 
            new Date(app.createdAt) >= oneWeekAgo
        );
        
        // Generate time series data for the last 30 days
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        
        // Initialize data arrays for each day
        const dailyData = {};
        for (let i = 0; i < 30; i++) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const dateString = date.toISOString().split('T')[0];
            dailyData[dateString] = { applications: 0, views: 0 };
        }
        
        // Fill in actual application data
        applications.forEach(app => {
            const appDate = new Date(app.createdAt).toISOString().split('T')[0];
            if (dailyData[appDate]) {
                dailyData[appDate].applications++;
                // Simulate views (typically more than applications)
                dailyData[appDate].views += 3; 
            }
        });
        
        // Convert to array format for charts
        const timeSeriesData = Object.keys(dailyData).map(date => ({
            date,
            applications: dailyData[date].applications,
            views: dailyData[date].views
        })).sort((a, b) => new Date(a.date) - new Date(b.date));
        
        const stats = {
            company: {
                id: company._id,
                name: company.companyName,
                logo: company.companyLogo,
                jobsOpen: company.jobOpen,
                employees: company.employees
            },
            jobs: {
                total: totalJobs,
                active: activeJobs,
                closed: totalJobs - activeJobs,
                list: jobs.map(job => ({
                    id: job._id,
                    title: job.jobTitle,
                    applications: job.applications.length,
                    status: job.status,
                    jobType: job.jobType,
                    createdAt: job.createdAt
                }))
            },
            applications: {
                total: totalApplications,
                recent: recentApplications.length,
                byJobType: applicationsByJobType,
                byStatus: applicationsByStatus
            },
            timeSeriesData
        };
        
        res.status(200).json({ ok: true, data: stats });
        
    } catch (error) {
        console.error("Error in getCompanyDashboardStats:", error);
        res.status(500).json({ ok: false, message: error.message });
    }
};