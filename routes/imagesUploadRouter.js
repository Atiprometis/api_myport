const express = require('express');
const router = express.Router();
const ImagesUploadController = require('../controllers/ImagesUploadController');
const multer = require('multer');
const path = require('path');

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

router.post('/create-folder',ImagesUploadController.createFolder);
router.post('/upload-image-to-fodler',upload.single('images'),ImagesUploadController.uploadImageToFolder);
router.get('/get-image-one',ImagesUploadController.getImageOne);
router.post('/get-image-all/:userId',ImagesUploadController.getImageAll);

module.exports = router; 