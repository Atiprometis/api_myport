const express = require('express');
const router = express.Router();
const PortfolioController = require('../controllers/PortfolioController');


router.get('/readdata', PortfolioController.ReadData);
router.get('/getskills/:idUser', PortfolioController.GetSkills);
router.get('/getdata/portfolio/:id', PortfolioController.GetDataPortfolio)
router.get('/getskillall',PortfolioController.GetskillsAll);

router.post('/inputskills', PortfolioController.InputSkills);
router.post('/createportfolio', PortfolioController.CreatePortfolio);

router.patch('/edit/portfolio',PortfolioController.EditPortfolio);

router.delete('/delete/portfolio/:id', PortfolioController.DeletePortfolio);

module.exports = router;