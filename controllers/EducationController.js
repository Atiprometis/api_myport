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
},

exports.ReadEducation = async(req, res) => {

    try{
         const results = await EducationModel.ReadEducation();
         res.status(200).json(results);
    }catch(err){
        console.log(err);
        return res.status(500).send();
    }
},

exports.PatchEducation = async(req,res) =>{
    const { edu_name, edu_content, id_edu } = req.body;
    try{
        const results = await EducationModel.PatchEducation(id_edu,edu_name, edu_content);
        if (results.affectedRows > 0) {
            // ถ้าอัปเดตสำเร็จ ส่งผลลัพธ์กลับไป
            res.status(200).json({ message: "Education data updated successfully", results });
            
        } else {
            // ถ้าไม่มีการอัปเดต (อาจจะไม่ได้รับการอัปเดตแถวไหนเลย)
            res.status(404).json({ message: "Education data not found for the given ID" });
        }

    }catch(err){
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
},

exports.DeleteEducation = async(req,res) =>{ 
    const eduID = req.params.eduID;
    try{
        const results = await EducationModel.DeleteEducation(eduID);
        if(results.affectedRows === 0){
            return res.status(404).json({message: " No user with this"});
          }
          return res.status(200).json({ message: "Education data deleted successfully" });
    }catch(err){
        console.log(err);
      return res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
}
