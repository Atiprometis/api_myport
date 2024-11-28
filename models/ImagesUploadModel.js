const connection =  require('./database')

const ImagesUploadMoldel = {

    uploadImagesToFolder: async(id_user, image_name) =>{
        const sql = 'INSERT INTO image_user (id_user, image_name) VALUES (?, ?)';
        try{
            const [result] = await connection.promise().query(sql,[id_user, image_name]);
            return result;
        }catch(err){
            console.error('Error while inserting image data:', err);
            throw err; 
        }
    }

}

module.exports = ImagesUploadMoldel;