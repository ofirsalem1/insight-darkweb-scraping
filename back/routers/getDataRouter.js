const express = require('express');
const { getData } = require('../controllers/getDataController');
const router = express.Router();

router.get('/', getData);

module.exports = router;
