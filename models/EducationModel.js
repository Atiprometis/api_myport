const connection =  require('./database')

const EducationModel = {
    insertEducation: async (edu_name, edu_content,callback) =>{
        const sql = "INSERT INTO education (edu_name, edu_content) VALUES (?, ?)";
        try{
            const [results] = await connection.promise().query(sql,[edu_name, edu_content]);
            return results;
        }catch(err){
            throw err; 
        }
        
    },
    ReadEducation: async () =>{
        const sql = "SELECT * FROM education ORDER BY id_edu DESC";
        try{
            const results = await new Promise((resolve, reject) => {
                connection.query(sql, (err, results) => {
                    if (err) reject(err);
                    resolve(results);
                });
            });
            return results;
        }catch (err) {
            throw err; 
        }
    },
    PatchEducation: async (id_edu,edu_name,edu_content) =>{
        const sql = "UPDATE education SET edu_name = ?, edu_content = ? WHERE id_edu = ?";
        try{
            const [results] = await connection.promise().query(sql,[edu_name, edu_content, id_edu]);
            return results;
        }catch(err){
            throw err; 
        }
    },
} 



module.exports = EducationModel;
