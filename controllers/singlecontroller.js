const mongoose = require('mongoose');

const SingleFiler = require('../models/singlefiler')

// Http: Get
// Returns json object containing tax brackets for married seperate filing by every year
exports.single_get_all = (req, res, next) => {
    SingleFiler.find()
    .select("year rates _id")
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            filing: docs.map(doc => {
                return {
                    year: doc.year,
                    rates: doc.rates,
                    _id: doc._id
                };
            })
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

// Http: Get
// Returns json object containing tax brackets for single filing by year
exports.single_get_year = (req, res, next) => {
    SingleFiler.find( {year: req.params.year} )
    .select("year rates _id")
    .exec()
    .then(fileYear => {
        console.log("From database", fileYear);
        if (fileYear) {
            res.status(200).json({
                fileYear: fileYear
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