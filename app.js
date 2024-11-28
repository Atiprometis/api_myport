const express = require('express')
const app = express()

var cors = require('cors')
const path = require('path');

const fs = require('fs');
const multer = require('multer');

const educationRoutes = require('./routes/educationRoutes');
const experienceRouter = require('./routes/experienceRouter');
const readaboutmeRouter = require('./routes/readaboutmeRouter');
const portfolioRouter = require('./routes/portfolioRouter');
const imagesUploadRouter = require('./routes/imagesUploadRouter');

app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use('/api', educationRoutes);
app.use('/api',experienceRouter);
app.use('/api',readaboutmeRouter)
app.use('/api',portfolioRouter);
app.use('/api',imagesUploadRouter);

  module.exports = app;