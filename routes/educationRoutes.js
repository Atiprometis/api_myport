const express = require('express');
const router = express.Router();
const EducationController = require('../controllers/EducationController.js');
// const EducationModel = require('../models/EducationModel.js');

router.post('/insert/edu', EducationController.insertEducation);
router.get('/readeducation',EducationController.ReadEducation);
router.patch('/update/edu',EducationController.PatchEducation);
router.delete('/delete/edu/:eduID',EducationController.DeleteEducation);

module.exports = router;