const express = require('express');
const { insertData } = require('../controllers/insertDataController');
const router = express.Router();

router.get('/', insertData);

module.exports = router;
