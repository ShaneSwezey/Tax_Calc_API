const express = require('express');
const router = express.Router();

const MarriedJController = require('../controllers/marriedjcontroller');

router.get("/", MarriedJController.marriedj_get_all);
router.get("/:year", MarriedJController.marriedj_get_year);
router.get("/:year/:income", MarriedJController.marriedj_get_taxBreakdown);

module.exports = router;