const connection =  require('./database')

const PortfolioModels = {
    ReadData: async () =>{
        const sql = "SELECT * FROM users";
        try{
            const [result] = await connection.promise().query(sql);
            return result;
        }catch(err){
            console.log(err);
            return res.status(500).send();
        }
    },
    GetSkills: async (id) =>{
        const sql = `SELECT DISTINCT skills.skill_name 
      FROM user_skills 
      INNER JOIN users ON user_skills.id_user = users.id 
      INNER JOIN skills ON user_skills.id_skills = skills.id_skills 
      WHERE users.id = ?`;
        try{
            const [result] = await connection.promise().query(sql,[id]);
            return result;
        }catch(err){
            console.log(err);
            return res.status(500).send();
        }
    },
    CreatePortfolio: async (projectname, type, description, pj_role, pj_challenge, pj_link) =>{

        const sql =  "INSERT INTO users( projectname, type, description, pj_role, pj_challenge, pj_link) VALUES (?,?,?,?,?,?)";
        try{
            const [result] = await connection.promise().query(sql,[projectname, type, description, pj_role, pj_challenge, pj_link])
            return result;
        }catch(err){
            console.log(err);
            return res.status(500).send();
        }
    }

}

module.exports =  PortfolioModels; 