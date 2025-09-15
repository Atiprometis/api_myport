const connection =  require('./database')

const EmployeeModel = {

    selectEmployee: async () => {
        const sql = "SELECT  dep_id, dep_name, name, tel FROM employee ";
        try{
            const [results] = await connection.promise().query(sql);
            return results;
        }catch(err){
            throw err; 
        }
    },

}

module.exports = EmployeeModel;