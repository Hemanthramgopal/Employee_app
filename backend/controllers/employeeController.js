const Employee = require("../models/Employee");

// @GET /api/employees
const getAllEmployees = async (req, res) => {
  try {
    const { search, department, status, page = 1, limit = 10 } = req.query;
    const query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { position: { $regex: search, $options: "i" } },
      ];
    }
    if (department && department !== "All") query.department = department;
    if (status && status !== "All") query.status = status;

    const total = await Employee.countDocuments(query);
    const employees = await Employee.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json({ employees, total, page: parseInt(page), totalPages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @GET /api/employees/:id
const getEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ message: "Employee not found" });
    res.json(employee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @POST /api/employees
const createEmployee = async (req, res) => {
  try {
    const { name, email, phone, department, position, salary, joiningDate, status, address } = req.body;
    if (!name || !email || !phone || !department || !position || !salary || !joiningDate)
      return res.status(400).json({ message: "All required fields must be provided" });

    const existing = await Employee.findOne({ email });
    if (existing) return res.status(400).json({ message: "Employee with this email already exists" });

    const employee = await Employee.create({ name, email, phone, department, position, salary, joiningDate, status, address });
    res.status(201).json({ message: "Employee created successfully", employee });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @PUT /api/employees/:id
const updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!employee) return res.status(404).json({ message: "Employee not found" });
    res.json({ message: "Employee updated successfully", employee });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @DELETE /api/employees/:id
const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) return res.status(404).json({ message: "Employee not found" });
    res.json({ message: "Employee deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @GET /api/employees/stats
const getStats = async (req, res) => {
  try {
    const total = await Employee.countDocuments();
    const active = await Employee.countDocuments({ status: "Active" });
    const inactive = await Employee.countDocuments({ status: "Inactive" });
    const byDepartment = await Employee.aggregate([
      { $group: { _id: "$department", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);
    res.json({ total, active, inactive, byDepartment });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAllEmployees, getEmployee, createEmployee, updateEmployee, deleteEmployee, getStats };
