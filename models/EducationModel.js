const connection =  require('./database')

const EducationModel = {
    insertEducation: async (edu_name, edu_content,callback) =>{
        const sql = "INSERT INTO education (edu_name, edu_content) VALUES (?, ?)";
        return new Promise((resolve, reject) => {
            connection.query(sql, [edu_name, edu_content], (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    }
} 

module.exports = EducationModel;
