const ImagesUploadMoldel = require('../models/ImagesUploadModel');

const fs = require('fs').promises;;
const path = require('path');
const multer = require('multer');


// ---- upload image
const fileFilter = (req, file, cb) => {
  // กำหนดประเภทไฟล์ที่อนุญาต
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];

  if (allowedTypes.includes(file.mimetype)) {
      cb(null, true); // อนุญาตให้ไฟล์นี้
  } else {
      cb(new Error('Invalid file type. Only JPEG, PNG and GIF files are allowed!'), false); // ไม่อนุญาต
  }
};

const upload = multer({ 
  dest: 'temp/',
  fileFilter: fileFilter,  
}); 

exports.createFolder = async(req, res) =>{
    const { userId } = req.body;
    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
      }
      const folderPath = path.join(__dirname, '..', 'assets', 'user', String(userId), 'img');

      
      try {
        // ใช้ fs.promises.mkdir เพื่อสร้างโฟลเดอร์
        await fs.mkdir(folderPath, { recursive: true });
        res.json({ message: `Folder for user '${userId}' created successfully` });
    } catch (err) {
        console.error('Error creating folder:', err);
        res.status(500).json({ error: 'Failed to create folder' });
    }
    
}


exports.uploadImageToFolder = async(req,res)=>{
  const userId = req.body.userId; // รับ userId
  const originalFileName = req.file.filename;
  const newFileName = `img_${userId}_${Date.now()}.jpg`;

  const imagePath = path.join(__dirname,'..', 'assets', 'user', String(userId), 'img', newFileName);

  try{
    await fs.rename(req.file.path, imagePath);
    const result = await ImagesUploadMoldel.uploadImagesToFolder(userId,newFileName)
    res.json({ 
      message: 'Image uploaded successfully', 
      originalFileName: originalFileName,
      newFileName: newFileName,
      path: imagePath,

  });
  }catch(err){
    console.error('Error moving file:', err); // แสดงข้อผิดพลาดที่เกิดขึ้น
    return res.status(500).json({ error: 'Failed to save image' });
  }

}