
const app = require('./app')
const port = 3000;
const multer = require('multer');
const connection = require('./models/database')



// post data
app.post("/create", async (req, res)=>{
  const { projectname, data, type, photo } = req.body;

  try{

    connection.query(
      "INSERT INTO users (projectname,data,type,photo) VALUES(?,?,?,?)",
      [ projectname,data,type,photo ],  ( err, results, fields)=>{
        if(err){
          console.log("err insert",err)
          return res.status(400).send();
        }
        return res.status(201).json({message: "new user created"});
      }
    ) 
  }catch(err){
    console.log(err);
    return res.status(500).send();
  } 
})

// read data

app.get("/read", async (req, res) => {
  try{
    connection.query(
      "SELECT * FROM users", (err, results, fields) => {
        if(err){
          console.log(err);
          return res.status(400).send();
        } 
        res.status(200).json(results);
      }
    )

  }catch(err){
    console.log(err);
    return res.status(500).send();
  }
})

// get skills 
app.get("/getskills/:idUser", async (req, res) => {
  const id = req.params.idUser;
  try {
    connection.query(
      `SELECT DISTINCT skills.skill_name 
      FROM user_skills 
      INNER JOIN users ON user_skills.id_user = users.id 
      INNER JOIN skills ON user_skills.id_skills = skills.id_skills 
      WHERE users.id = ?`, // ใช้คอลัมน์ที่ถูกต้อง
      [id], // ค่าที่จะถูกแทนที่ใน placeholder
      (err, results) => {
        if (err) {
          console.log(err);
          return res.status(400).send({ error: 'Error retrieving skills' });
        }
        if (results.length === 0) {
          return res.status(404).send({ message: 'No skills found for this user' });
        }
        res.status(200).json(results);
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send({ error: 'Server error' });
  }
});

// read single result
app.get("/read/single/:id", async (req, res) => {
  const id = req.params.id;
  try{
    connection.query(
      "SELECT * FROM users WHERE id = ?",[id], (err, results, fields) => {
        if(err){
          console.log(err);
          return res.status(400).send();
        } 
        res.status(200).json(results);
      }
    )

  }catch(err){
    console.log(err);
    return res.status(500).send();
  }
})

app.post('/create-folder', (req, res) => {
  const { userId } = req.body; // รับ userId จาก request body

  // ตรวจสอบว่า userId มีค่า
  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  const folderPath = path.join(__dirname, 'assets', 'user', String(userId), 'img'); // ใช้ userId ในการสร้างโฟลเดอร์

  // สร้างโฟลเดอร์ใหม่
  fs.mkdir(folderPath, { recursive: true }, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to create folder' });
    }
    res.json({ message: `Folder for user '${userId}' created successfully` });
  });
});


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

app.post('/upload', upload.single('images'), (req, res) => {
  const userId = req.body.userId; // รับ userId
  const originalFileName = req.file.filename;
  const newFileName = `img_${userId}_${Date.now()}.jpg`;


  const imagePath = path.join(__dirname, 'assets', 'user', String(userId), 'img', newFileName);

  // ย้ายไฟล์ไปยังโฟลเดอร์ที่ต้องการ
  fs.rename(req.file.path, imagePath, (err) => {
      if (err) {
        console.error('Error moving file:', err); // แสดงข้อผิดพลาดที่เกิดขึ้น
        return res.status(500).json({ error: 'Failed to save image' });
      }
      const sql = 'INSERT INTO image_user (id_user, image_name) VALUES (?, ?)';
        const values = [userId, newFileName]; // ปรับค่าที่จะส่งไป

    
      connection.query(sql, values, (error, results) => {
        if (error) {
          console.error('Error saving to database:', error); // แสดงข้อผิดพลาดที่เกิดขึ้น
            return res.status(500).json({ error: 'Failed to save image data in database' });
        }

        res.json({ 
            message: 'Image uploaded successfully', 
            originalFileName: originalFileName,
            newFileName: newFileName,
            path: imagePath 
        });
    });
  });
});

// ----- end upload image 

// get image 

app.get('/get-image', (req, res) => {
  const userId = req.body.userId; // รับ userId จาก query string

  // ตรวจสอบว่า userId มีค่า
  if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
  }

  // สร้างเส้นทางที่เก็บไฟล์ภาพ
  const imagePath = path.join(__dirname, 'assets', 'user', String(userId), 'img', 'img_5_1726819793616.jpg'); // เปลี่ยนชื่อไฟล์ตามต้องการ

  // ส่งไฟล์ภาพกลับ
  res.sendFile(imagePath, (err) => {
      if (err) {
          return res.status(err.status).json({ error: 'Image not found' }); // ส่งกลับข้อผิดพลาดหากไม่พบภาพ
      }
  });
});

// end get image

// Endpoint สำหรับดึงภาพทั้งหมดตาม userId
app.post('/get-images', (req, res) => {
  const userId = req.body.userId; // รับ userId จาก request body

  // ตรวจสอบว่า userId มีค่า
  if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
  }

  const imageDir = path.join(__dirname, 'assets', 'user', String(userId), 'img'); // เส้นทางโฟลเดอร์ภาพ

  // ตรวจสอบว่าโฟลเดอร์มีอยู่หรือไม่
  fs.readdir(imageDir, (err, files) => {
      if (err) {
          return res.status(500).json({ error: 'Unable to access image directory' });
      }

      // สร้างลิสต์ URL ของภาพ
      const imageUrls = files.map(file => {
          return `http://localhost:3000/assets/user/${userId}/img/${file}`; // ปรับให้ตรงกับ URL ของภาพ
      });

      res.json({ images: imageUrls }); // ส่งกลับ URL ของภาพทั้งหมด
  });
});


app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})