const express = require('express');
const router = express.Router();
const AboutTableController = require('../controllers/AboutTableController');

router.post('/insertabout', AboutTableController.insertAbout);

module.exports = router;