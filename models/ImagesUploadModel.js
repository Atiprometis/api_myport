const connection =  require('./database')

const ImagesUploadModel = {

    uploadImagesToFolder: async(id_user, image_name) =>{

        const sql = 'UPDATE users SET photo = ? WHERE id = ?'

        try{
            const [result] = await connection.promise().query(sql,[image_name,id_user]);
            return result;
        }catch(err){
            console.error('Error while inserting image data:', err);
            throw err; 
        }
    }

}

module.exports = ImagesUploadModel;