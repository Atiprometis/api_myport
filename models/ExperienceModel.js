const connection =  require('./database')

const ExperienceModels = {
    insertExperience: async (projectname, content,location) =>{
        const sql = "INSERT INTO exp (projectname, content, location ) VALUES (?,?,?)";
        try{
            const [results] = await connection.promise().query(sql,[projectname, content,location]);
            return results;
        }catch(err){
            throw err; 
        }
        
    },
    ReadExperience: async () =>{
        const sql = "SELECT * FROM exp ORDER BY id_exp DESC";
        try{
            const [results] = await connection.promise().query(sql);
            return results;
        }catch(err){
            console.log(err);
          return res.status(500).send();
        }
    },
    DeleteExperience: async (expID)=>{
        const sql = "DELETE FROM exp WHERE id_exp = ?";
        try{
            const [results] = await connection.promise().query(sql,expID);
            return results;
        }catch(err){
            console.log(err);
          return res.status(500).send();
        }
    },
    PatchExperience: async (projectname,content,location,id_exp) =>{
        const sql = "UPDATE exp SET projectname = ?, content = ?, location = ? WHERE id_exp = ?";
        try{
            const [results] = await connection.promise().query(sql,[projectname,content,location,id_exp]);
            return results;
        }catch(err){
            throw err; 
        }
    },
}

module.exports =  ExperienceModels; 