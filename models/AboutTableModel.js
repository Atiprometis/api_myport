const connection =  require('./database')

const AboutTableModel = {
    insertAbout: async (f_name,l_name) =>{
        // const sql = "INSERT INTO about_table (f_name, l_name) VALUES (?,?)";
        const sql = "INSERT INTO about_table (f_name, l_name) VALUES (?,?)";
        try {
            const [results] = await connection.promise().query(sql,[f_name,l_name])
            return results;
        } catch (error) {
            throw err; 
        }
    }


}

module.exports = AboutTableModel;