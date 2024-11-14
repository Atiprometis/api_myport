const AboutmeModels = require('../models/AboutmeModel')

exports.ReadAboutme = async (req,res) =>{
    try{
        const result = await AboutmeModels.ReadAboutme();
        res.status(200).json(result);
    }catch(err){
        console.log(err);
        return res.status(500).send();
    }
},

exports.UpdateAboutme = async (req, res) => {
    
    const { id, content } = req.body;

    try{
        const result = await AboutmeModels.UpdateAboutme(content,id)
        if (result.affectedRows > 0) {
            // ถ้าอัปเดตสำเร็จ ส่งผลลัพธ์กลับไป
            res.status(200).json({ message: "About me data updated successfully", result });
            
        } else {
            // ถ้าไม่มีการอัปเดต (อาจจะไม่ได้รับการอัปเดตแถวไหนเลย)
            res.status(404).json({ message: "About me data not found for the given ID" });
        }

    }catch(err){
        console.log(err);
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
}