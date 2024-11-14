const express = require('express');
const router = express.Router();
const AboutmeContrller = require('../controllers/AboutmeContrller');

// router.post('/insert/exp', ExperienceContrller.insertExperience);
router.get('/readaboutme', AboutmeContrller.ReadAboutme);
// router.delete('/delete/exp/:expID', ExperienceContrller.DeleteExperience);
router.patch('/update/aboutme', AboutmeContrller.UpdateAboutme);

module.exports = router;