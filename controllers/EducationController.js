const EducationModel = require('../models/EducationModel')

exports.insertEducation = async(req,res) => {
    const { edu_name, edu_content } = req.body;
    try {
        const results = await EducationModel.insertEducation(edu_name, edu_content);
        res.status(201).json({ message: "Education added successfully", results });
    } catch (err) {
        console.log(err);
        res.status(500).send('Error adding education');
        
    }
};

exports.ReadEducation = async(req, res) => {

    try{
         const results = await EducationModel.ReadEducation();
         res.status(200).json(results);
    }catch(err){
        console.log(err);
        return res.status(500).send();
    }
}
