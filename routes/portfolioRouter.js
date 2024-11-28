const express = require('express');
const router = express.Router();
const PortfolioController = require('../controllers/PortfolioController');

router.post('/createportfolio', PortfolioController.CreatePortfolio);
router.get('/readdata', PortfolioController.ReadData);
router.get('/getskills/:idUser', PortfolioController.GetSkills);
router.delete('/delete/portfolio/:id', PortfolioController.DeletePortfolio);
router.get('/getdata/portfolio/:id', PortfolioController.GetDataPortfolio)
router.patch('/edit/portfolio',PortfolioController.EditPortfolio)

module.exports = router;