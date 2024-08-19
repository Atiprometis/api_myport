const express = require('express')
const app = express()
const port = 3000
var cors = require('cors')

const mysql2 = require('mysql2')

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

//update aboutme


// delete 
app.delete("/delete/:id", async (req, res) =>{
  const id = req.params.id;

  try{
    connection.query(
      "DELETE FROM users  WHERE id = ?",[id], (err, results, fields) => {
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

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})