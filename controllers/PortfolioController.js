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

exports.CreatePortfolio = async (req, res) => {
    const {projectname, type, description, pj_role, pj_challenge, pj_link} = req.body;
    try{
        const result = await PortfolioModels.CreatePortfolio(projectname, type, description, pj_role, pj_challenge, pj_link);
        return res.status(200).json(result);
    }catch(err){
        console.log(err);
        return res.status(500).send({ error: 'Server error' });
    }
}

exports.DeletePortfolio = async (req, res) => {
    const id = req.params.id;
    try{
        const result = await PortfolioModels.DeletePortfolio(id);
        if(result.affectedRows === 0){
            return res.status(404).json({message: " No portfolio with this"});
          }
          return  res.status(200).json({message: " portfolio deleted successfully"});

    }catch(err){
        console.log(err);
        return res.status(500).send({ error: 'Server error' });
    }
}

exports.GetDataPortfolio = async (req, res) => {
    const id = req.params.id;
    console.log('Request ID:', id);
    try{
        const result = await PortfolioModels.GetDataPortfolio(id);
        console.log('Query Result:', result);
        if ( result.length === 0) {
            return res.status(404).send({ message: 'No data found for this user' });
          }
          return res.status(200).json(result);
    }catch(err){
        console.error('Error fetching data:', err);
        return res.status(500).send({ error: 'Server error' });
    }
}

exports.EditPortfolio = async (req, res) =>{
    const {projectname,type,description,pj_role,skillcontent,pj_challenge,pj_link,id} = req.body;
    try{
        const result = await PortfolioModels.EditPortfolio(projectname,type,description,pj_role,skillcontent,pj_challenge,pj_link,id);
        return res.status(200).json({message: "Edit added successfully",result});
    }catch(err){
        console.log(err);
      return res.status(500).send();
    }
}