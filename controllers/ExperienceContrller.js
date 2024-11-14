const ExperienceModels = require('../models/ExperienceModel')
 
exports.insertExperience = async(req,res) => {
    const { projectname, content, location } = req.body;
    try {
        const results = await ExperienceModels.insertExperience(projectname, content, location);
        res.status(201).json({ message: "Experience added successfully", results });
    } catch (err) {
        console.log(err);
      return res.status(500).send();
        
    }
},

exports.ReadExperience = async (req, res) =>{
    try{
        const result = await ExperienceModels.ReadExperience();
        res.status(200).json(result);

    }catch (err) {
        console.log(err);
        return res.status(500).send();
    }
},

exports.DeleteExperience = async (req, res) =>{
    const expID = req.params.expID;
    try{
        const result = await ExperienceModels.DeleteExperience(expID,);
        if(result.affectedRows === 0){
            return res.status(404).json({message: " No exp with this"});
          }
          return  res.status(200).json({message: " exp deleted successfully"});

    }catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
},

exports.PatchExperience = async (req, res) => {
    const id_exp = req.body.id_exp;
    const projectname = req.body.projectname;
    const content = req.body.content;
    const location = req.body.location;
    try{
        const results = await ExperienceModels.PatchExperience(projectname,content,location,id_exp)
        res.status(200).json(results);
    }catch(err){
        console.log(err);
        return res.status(500).send();
    }
}


