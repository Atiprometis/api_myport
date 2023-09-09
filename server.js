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
app.patch("/update/:id", async (req, res ) => {

  const id = req.params.id;
  const newData = req.body.newData;

  try{
    connection.query(
      "UPDATE users SET data = ? WHERE id = ?",[newData,id], (err, results, fields) => {
        if(err){
          console.log(err);
          return res.status(400).send();
        } 
        res.status(200).json({message: "user new data successfully"});
      }
    )

  }catch(err){
    console.log(err);
    return res.status(500).send();
  }

})

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


app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})