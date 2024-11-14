const express = require('express')
const app = express()

var cors = require('cors')
const path = require('path');

const fs = require('fs');
const multer = require('multer');

const educationRoutes = require('./routes/educationRoutes');
const experienceRouter = require('./routes/experienceRouter');
const readaboutmeRouter = require('./routes/readaboutmeRouter');


app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use('/api', educationRoutes);
app.use('/api',experienceRouter);
app.use('/api',readaboutmeRouter)


  module.exports = app;