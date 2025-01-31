const { query } = require('express');
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
            throw new Error('Database query failed');
        }
    },
    CreatePortfolio: async (projectname, type, description, pj_role,skillcontent, pj_challenge, pj_link) =>{

        const sql =  "INSERT INTO users( projectname, type, description, pj_role,skillcontent, pj_challenge, pj_link) VALUES (?,?,?,?,?,?,?)";
        try{
            const [result] = await connection.promise().query(sql,[projectname, type, description, pj_role,skillcontent, pj_challenge, pj_link])
            return result;
        }catch(err){
            console.log(err);
            throw new Error('Database query failed');
        }
    },

    DeletePortfolio: async (id) =>{
        const sql = "DELETE FROM users WHERE id = ?";
        try{
            const [result] = await connection.promise().query(sql,[id]);
            return result;

        }catch(err){
            console.log(err);
            throw new Error('Database query failed');
        }
    },
    GetDataPortfolio: async (id) =>{
        const sql ="SELECT * FROM `users` WHERE id = ?";
        try{
            const [result] = await connection.promise().query(sql,[id])
            return result;
        }catch(err){
            console.log(err);
            throw new Error('Database query failed');
        }
    },
    EditPortfolio: async (projectname,type,description,pj_role,skillcontent,pj_challenge,pj_link,id) =>{
        const sql =`
        UPDATE users SET
         projectname = ?,type = ?,
         description =?, pj_role= ?,
          skillcontent= ?,
         pj_challenge= ?, pj_link= ?
            WHERE id = ?
        `;
        try{
            const [result] = await connection.promise().query(sql,[projectname,type,description,pj_role,skillcontent,pj_challenge,pj_link,id])
        }catch(err){
            console.log(err);
            throw new Error('Database query failed');
        }
    },
    GetskillsAll: async ()=>{
        const sql ='SELECT `id_skills`,`skill_name` FROM skills';
        try {
            const [result] = await connection.promise().query(sql);
            return result;
        } catch (err) {
            console.log(err);
            throw new Error('Database query failed');
        }
    },

    InputSkills: async(id_user,id_skills)=>{
        const sql = " INSERT INTO user_skills (id_user, id_skills) VALUES (?,?) ";
        try{
            const [result] = await connection.promise().query(sql,[id_user,id_skills])
            return result;
        }catch(err){
            console.log(err);
            throw new Error('Database query failed');
        }
    },

}

module.exports =  PortfolioModels; 