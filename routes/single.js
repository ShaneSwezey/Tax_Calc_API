const express = require('express');
const router = express.Router();

const SingleController = require('../controllers/singlecontroller');

router.get("/", SingleController.single_get_all);
router.get("/:year", SingleController.single_get_year);
router.get("/:year/:income", SingleController.single_get_incomeBracket);

module.exports = router;