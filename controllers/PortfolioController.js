const PortfolioModels = require('../models/PortfolioModels');


exports.ReadData = async(req,res) =>{
    try{
        const result = await PortfolioModels.ReadData();
        res.status(200).json(result);
    }catch(err){
        console.log(err);
        return res.status(500).send();
    }
}

exports.GetSkills = async(req,res) =>{
    const id = req.params.idUser;
    try{
        const result = await PortfolioModels.GetSkills(id);
        if (result.length === 0) {
            // return res.status(404).send({ message: 'No skills found for this user' });
            return res.status(200).json([{ skill_name: "No Skill Found"}]);
          }
          res.status(200).json(result);
    }catch(err){
        console.log(err);
        return res.status(500).send({ error: 'Server error' });
    }
}