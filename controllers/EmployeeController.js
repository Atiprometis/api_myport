
const EmployeeModel  = require('../models/EmployeeModel');


exports.selectEmployee = async(req,res) => {
    try {
        const results = await EmployeeModel.selectEmployee();
        res.status(201).json({ message: "Education added successfully", results });
    } catch (err) {
        console.log(err);
        res.status(500).send('Error adding education');
        
    }
}

