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

exports.getImageOne = async(req, res) => {
   const userId = req.body.userId;

   if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
}

   const imagePath = path.join(__dirname, '..','assets', 'user', String(userId), 'img', 'img_5_1726819793616.jpg'); // เปลี่ยนชื่อไฟล์ตามต้องการ
  
   try{
     res.sendFile(imagePath);
   }catch(err){
    console.error(err); // เพื่อดูข้อผิดพลาด
    return res.status(500).json({ error: 'Failed to send image' });
   }
}

exports.getImageAll = async(req, res) => {
  // const userId = req.body.userId;
  const userId = req.params.userId;

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
}

const imageDir = path.join(__dirname, '..', 'assets', 'user', String(userId), 'img'); // เส้นทางโฟลเดอร์ภาพ
const placeholderUrl = 'http://localhost:3000/assets/placeholder/noimages.jpg';

try{
  await fs.access(imageDir);
  const files = await fs.readdir(imageDir);
  if (!files.length) {
    return res.json({ images: [placeholderUrl] });

  }

  const imageUrls = files.map(file => {
    return `http://localhost:3000/assets/user/${userId}/img/${file}`; // ปรับให้ตรงกับ URL ของภาพ
});

return res.json({ images: imageUrls });

}catch(err){
  if (err.code === 'ENOENT') {
    // กรณีโฟลเดอร์ไม่พบ
    // return res.status(404).json({ error: 'Image directory not found' });
    return res.json({ images: [placeholderUrl] });
  }

  return res.status(500).json({ error: 'Unable to access image directory' });
  // return res.sendFile(fallbackPath)
}
}