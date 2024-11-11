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

// const EducationController ={
//     insertEducation: (req, res) => {
//         const { edu_name, edu_content } = req.body;

//         EducationModel.insertEducation(edu_name, edu_content, (err,results) =>{
//             if (err) {
//                 console.log("Error inserting education:", err);
//                 return res.status(400).send();
//               }
//               return res.status(201).json({ message: "New education created" });
//         });

//     }
// }

// module.exports = EducationController;