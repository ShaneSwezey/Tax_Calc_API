const mongoose = require('mongoose');

const Years = require('../models/years');

// Http: Get
// Returns all the years available for tax bracket calculations
exports.get_all_years = (req, res, next) => {
    Years.find()
    .select(" numberOfYears years _id ")
    .exec()
    .then(doc => {
        console.log("From database", doc);
        if (doc) {
            res.status(200).json({
                availableYears : doc
            });
        } else {
            res.status(404).json({ message: "Not Found"})
        }
        
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
};