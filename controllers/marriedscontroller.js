const mongoose = require('mongoose');

const MarriedSFiler = require('../models/marriedsepfiler');

// Http: Get
// Returns json object containing tax brackets from married sepreate fillings all years
exports.marrieds_get_all = (req, res, next) => {
    MarriedSFiler.find()
    .select("year rates _id")
    .exec()
    .then(docs => {
        if (docs) {
            res.status(200).json(docs);
        } else {
            res.status(404).json({ message: "No valid entry found for provided year"})
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
};

// Http: Get
// Returns json object containing tax brackets for married seperate filing by year
exports.marrieds_get_year = (req, res, next) => {
    MarriedSFiler.findOne( {year: req.params.year} )
    .select("year rates _id")
    .exec()
    .then(fileYear => {
        console.log("From database", fileYear);
        if (fileYear) {
            res.status(200).json({
                fileYear: fileYear,
                request: {
                    type: "GET",
                    url: "http://localhost:3001/marrieds"
                }
            });
        } else {
            res.status(404).json({ message: "No valid entry found for provided year"});
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            errror: err
        })
    });
};