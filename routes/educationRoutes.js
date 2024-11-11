const express = require('express');
const router = express.Router();
const EducationController = require('../controllers/EducationController.js');

router.post('/insert/edu', EducationController.insertEducation);

module.exports = router;