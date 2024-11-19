const express = require('express');
const router = express.Router();
const PortfolioController = require('../controllers/PortfolioController');

router.post('/createportfolio', PortfolioController.CreatePortfolio);
router.get('/readdata', PortfolioController.ReadData);
router.get('/getskills/:idUser', PortfolioController.GetSkills);
// router.delete('/delete/exp/:expID', ExperienceContrller.DeleteExperience);
// router.patch('/update/exp', ExperienceContrller.PatchExperience);

module.exports = router;