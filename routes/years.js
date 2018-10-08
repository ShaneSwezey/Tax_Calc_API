const express = require('express');
const router = express.Router();

const YearsController = require('../controllers/yearscontroller');

router.get("/", YearsController.get_all_years);

module.exports = router;