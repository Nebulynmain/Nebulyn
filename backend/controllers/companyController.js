import Company from "../models/companyModel.js";

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
        const newCompany = new Company({...req.body, createdBy: req.id, });
        await newCompany.save();
        res.status(201).json({ ok: true, message: "Company created successfully", data: newCompany });
    } catch (error) {
        console.log("Error in createCompany:", error);
        res.status(400).json({ ok: false, message: error.message });
    }
};

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