const connection =  require('./database')

const AboutmeModels = {
    ReadAboutme: async () =>{
        const sql = "SELECT * FROM aboutme WHERE id = 2";
        try{
            const [results] = await connection.promise().query(sql);
            return results;
        }catch(err){
            console.log(err);
          return res.status(500).send();
        }
    },

    UpdateAboutme: async (content,id) =>{

        const sql = "UPDATE aboutme SET content = ? WHERE id = ?";
        try{
            const [results] = await connection.promise().query(sql,[content,id]);
            return results;
        }catch(err){
            throw err; 

        }
    },

}

module.exports =  AboutmeModels; 