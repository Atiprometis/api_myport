const express = require('express')
const app = express()

var cors = require('cors')
const path = require('path');

const fs = require('fs');
const multer = require('multer');

// === create table ===


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))



  module.exports = app;