const AboutTableModel = require('../models/AboutTableModel')

exports.insertAbout = async(req,res) => {
    
    const { f_name, l_name} = req.body;
    try {
        const results = await AboutTableModel.insertAbout(f_name, l_name);
        res.status(201).json({ message: "About Table added successfully", results });
        
    } catch (error) {
        console.log(error);
      return res.status(500).send();
    }


}