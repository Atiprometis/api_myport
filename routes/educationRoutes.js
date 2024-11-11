const express = require('express');
const router = express.Router();
const EducationController = require('../controllers/EducationController.js');

router.post('/insert/edu', EducationController.insertEducation);
router.get('/readeducation',EducationController.ReadEducation)

module.exports = router;