const express = require('express');
const router = express.Router();

const MarriedSController = require('../controllers/marriedscontroller');

router.get("/", MarriedSController.marrieds_get_all);
router.get("/:year", MarriedSController.marrieds_get_year);
router.get("/:year/:income", MarriedSController.marrieds_get_taxBreakdown);

module.exports = router;