const express = require('express');
const router = express.Router();

const EmployeeController  = require('../controllers/EmployeeController.js');

router.get('/selectemp',EmployeeController.selectEmployee);

module.exports = router;