const express = require('express')
const app = express()
const port = 3000
var cors = require('cors')
const path = require('path');
const mysql2 = require('mysql2')
const fs = require('fs');
const multer = require('multer');

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))

const connection = mysql2.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'restapi',
});

connection.connect((err)=>{
  if(err) {
    console.log('err connecting', err);
    return;
  }
  console.log('mysql connection');
})
// === create table ===


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

// insert exp 
app.post("/insert/exp", async (req, res) => {

  const { projectname, content, location } = req.body;

  try{
    connection.query("INSERT INTO exp (projectname, content, location ) VALUES (?,?,?) ",
      [projectname, content, location], (err,results) => {
        if(err){
          console.log("err insert",err)
          return res.status(400).send();
        }

        return res.status(201).json({message: "new exp created"});

      })

  }catch(err){
    console.log(err);
    return res.status(500).send();
  }
})

// insert edu 
app.post("/insert/edu", async (req, res) => {

  const { edu_name, edu_content } = req.body;

  try{
    connection.query("INSERT INTO education (edu_name, edu_content ) VALUES (?,?) ",
      [edu_name, edu_content], (err,results) => {
        if(err){
          console.log("err insert",err)
          return res.status(400).send();
        }

        return res.status(201).json({message: "new edu created"});

      })

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

// red about me
app.get("/readaboutme", async(req, res)=>{

  try{
    connection.query(
      "SELECT * FROM aboutme WHERE id = 2",(err, results, fields)=>{
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

// read exp

app.get("/readexp", async(req, res)=>{

  try{
    connection.query(
      "SELECT * FROM exp ORDER BY id_exp DESC",(err, results, fields)=>{
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
app.get("/getskills", async(req, res)=>{

  try{
    connection.query(
      `SELECT skill_name
FROM user_skills 
INNER JOIN users
ON user_skills.id_user = users.id
INNER JOIN skills
ON user_skills.id_skills = skills.id_skills
WHERE id = ?`,[1],
(err, results, fields)=>{
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

// read education

app.get("/readeducation", async(req, res)=>{

  try{
    connection.query(
      "SELECT * FROM education ORDER BY id_edu DESC",(err, results, fields)=>{
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

// update 


app.patch("/update/aboutme", async (req, res ) => {

console.log(req.body);
console.log(req.body.id);
console.log(req.body.content);

  const id = req.body.id;
  const content = req.body.content;

  
  // res.send(`test update =  ${content} + id = ${id} `);

  try{
    connection.query(
      `UPDATE aboutme SET id = ?, content = ?`,[id,content], (err, results, fields) => {
        if(err){
          console.log(err);
          return res.status(400).send();
        } 
        res.status(200).json({message: "user new data successfully"});
      },{
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    )

  }catch(err){
    console.log(err);
    return res.status(500).send();
  }

})

//update exp

app.patch("/update/exp", async (req, res ) => {

  console.log(req.body);
  console.log(req.body.id);
  console.log(req.body.content);
  
    const id_exp = req.body.id_exp;
    const projectname = req.body.projectname;
    const content = req.body.content;
    const location = req.body.location;
    
    // res.send(`test update =  ${content} + id = ${id} `);
  
    try{
      connection.query(
        `UPDATE exp SET projectname = ?, content = ?, location = ? WHERE id_exp = ?`,[projectname,content,location,id_exp], (err, results, fields) => {
          if(err){
            console.log(err);
            return res.status(400).send();
          } 
          res.status(200).json({message: "user new data successfully"});
        },{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      )
  
    }catch(err){
      console.log(err);
      return res.status(500).send();
    }
  
  })

  //update edu

app.patch("/update/edu", async (req, res ) => {

  console.log(req.body);
  console.log(req.body.id_edu);
  console.log(req.body.edu_name);
  console.log(req.body.edu_content);
  
    const id_edu = req.body.id_edu;
    const edu_name = req.body.edu_name;
    const edu_content = req.body.edu_content;
    
    // res.send(`test update =  ${content} + id = ${id} `);
  
    try{
      connection.query(
        `UPDATE education SET edu_name = ?, edu_content = ? WHERE id_edu = ?`,[edu_name,edu_content,id_edu], (err, results, fields) => {
          if(err){
            console.log(err);
            return res.status(400).send();
          } 
          res.status(200).json({message: "user new data successfully"});
        },{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      )
  
    }catch(err){
      console.log(err);
      return res.status(500).send();
    }
  
  })


// delete  exp
app.delete("/delete/exp/:expID", async (req, res) =>{
  const expID = req.params.expID;

  try{
    connection.query(
      "DELETE FROM exp WHERE id_exp = ?",[expID], (err, results, fields) => {
        if(err){
          console.log(err);
          return res.status(400).send();
        } 
        if(results.affectedRows === 0){
          return res.status(404).json({message: " No user with this"});
        }
        return  res.status(200).json({message: " user deleted successfully"});
      }
    )

  }catch(err){
    console.log(err);
    return res.status(500).send();
  }

})

// delete  edu
app.delete("/delete/edu/:eduID", async (req, res) =>{
  const eduID = req.params.eduID;

  try{
    connection.query(
      "DELETE FROM education WHERE id_edu = ?",[eduID], (err, results, fields) => {
        if(err){
          console.log(err);
          return res.status(400).send();
        } 
        if(results.affectedRows === 0){
          return res.status(404).json({message: " No user with this"});
        }
        return  res.status(200).json({message: " user deleted successfully"});
      }
    )

  }catch(err){
    console.log(err);
    return res.status(500).send();
  }

})

// เทสๆ 

app.get("/test",(req, res)=>{
  console.log(req.query);
  const {aa,bb} = req.query;
  res.send(`madi aa=${aa},${bb}`);
})

app.get('/update/:updateId',(req,res)=>{
  console.log(req.params);
  const { updateId } = req.params;
  res.send(`posssass= ${updateId}`);
})

app.get('/testpost/new',(req,res)=>{

  res.send(`post test only`);

})
app.patch('/testpost/new',(req,res)=>{
  console.log(req.body);
  const {tltle}  = req.body;
  res.send(`บันทึก ${tltle}`);
})


// crete folder 

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