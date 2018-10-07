const express = require('express');
const router = express.Router();

const SingleController = require('../controllers/singlecontroller');

router.get("/", SingleController.single_get_all);
router.get("/:year", SingleController.single_get_year);

module.exports = router;