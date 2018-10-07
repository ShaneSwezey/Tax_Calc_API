const express = require('express');
const router = express.Router();

const HouseHoldController = require('../controllers/householdcontroller');

router.get("/", HouseHoldController.household_get_all);
router.get("/:year", HouseHoldController.household_get_year);

module.exports = router;