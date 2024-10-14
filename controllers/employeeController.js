const Employee = require('../models/Employee');

//Create Employee
exports.createEmployee = async (req, res) => {
    const { first_name, last_name, email, position, salary, date_of_joining, department } = req.body;

    // Validation
    if (!first_name || !last_name || !email || !position) {
        return res.status(400).json({ message: "Missing required fields." });
    }

    try {
        const newEmployee = await Employee.create({
            first_name,
            last_name,
            email,
            position,
            salary,
            date_of_joining,
            department
        });
        // For creating employees, we will use status code 201.
        res.status(201).json({
            message: "Employee created successfully.",
            employee_id: newEmployee._id
        });
    } catch (error) {
        // making sure there is no duplicate entry 
        if (error.code === 11000) {
            return res.status(409).json({ message: "Employee with this email already exists." });
        }
        res.status(500).json({ message: error.message });
    }
};


//Get All Employees
exports.getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        // we will be using status code 200 to return the employees
        res.status(200).json(employees);
    } catch (error) {
        // we will be using status code 500 if there is any error
        res.status(500).json({ message: error.message });
    }
};


//Get Employee by ID
exports.getEmployeeById = async (req, res) => {
    const { eid } = req.params;
    try {
        const employee = await Employee.findById(eid);
        if (!employee) return res.status(404).json({ message: "Employee not found." });
        // we will be using status code 200 to return an employee by an id.
        res.status(200).json(employee);
    } catch (error) {
        // we will be using status code 500 if there is any error
        res.status(500).json({ message: error.message });
    }
};

//Update Employee
exports.updateEmployee = async (req, res) => {
    const { eid } = req.params;
    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(eid, req.body, { new: true });
        if (!updatedEmployee) return res.status(404).json({ message: "Employee not found." });
        // once again we will be using status code 200 to update the employee details.
        res.status(200).json({ message: "Employee details updated successfully." });
    } catch (error) {
        // we will be using status code 500 if there is any error
        res.status(500).json({ message: error.message });
    }
};

//Delete Employee
exports.deleteEmployee = async (req, res) => {
    const { eid } = req.params;

    if (!eid) {
        return res.status(400).json({ message: "Employee ID (eid) is required." });
    }

    try {
        // trying find and delete the employee by id
        const deletedEmployee = await Employee.findOneAndDelete({ _id: eid });

        if (!deletedEmployee) {
            return res.status(404).json({ message: "Employee not found." });
        }
        // for delete employee, we will be using status code 204
        res.status(204).send(); 
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ message: "Invalid employee ID format." });
        }
        // we will be using status code 500 if there is any error
        res.status(500).json({ message: error.message });
    }
};


