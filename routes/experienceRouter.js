const express = require('express');
const router = express.Router();
const ExperienceContrller = require('../controllers/ExperienceContrller');

router.post('/insert/exp', ExperienceContrller.insertExperience);
router.get('/readexp', ExperienceContrller.ReadExperience);
router.delete('/delete/exp/:expID', ExperienceContrller.DeleteExperience);
router.patch('/update/exp', ExperienceContrller.PatchExperience);

module.exports = router;