const mongoose = require('mongoose');

const Years = require('../models/years');

// Http: Get
// Returns all the years available for tax bracket calculations
exports.get_all_years = (req, res, next) => {
    Years
    .find()
    .select(" years numberOfYears")
    .exec()
    .then(doc => {
        const response = {
            numberOfYears: doc.numberOfYears,
            years: doc.years
        };
        res.status(200).json(response);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
};