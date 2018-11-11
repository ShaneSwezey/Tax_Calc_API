const mongoose = require('mongoose');

const HouseHoldFiler = require('../models/headhold');

// Http: Get
// Returns json object containing tax brackets for head of household seperate filing by every year
exports.household_get_all = (req, res, next) => {
    HouseHoldFiler.find()
    .select("year rates _id")
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            filing: docs.map(doc => {
                return {
                    year: doc.year,
                    rates: doc.rates,
                    _id: doc._id,
                    request: {
                        type: "GET",
                        url: "http://localhost:3000/household/" + doc._id
                    }
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
// Returns json object containing tax brackets for head of household seperate filing by year
exports.household_get_year = (req, res, next) => {
    HouseHoldFiler.findOne( {year: req.params.year} )
    .select("year rates _id")
    .exec()
    .then(fileYear => {
        console.log("From database", fileYear);
        if (fileYear) {
            res.status(200).json(fileYear);
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

// Http: Get
// Returns json object containing the bracket the user 
exports.household_get_taxBreakdown = (req, res, next) => {
    HouseHoldFiler.findOne({ year: req.params.year })
    .select("year rates _id")
    .exec()
    .then(fileYear => {
        console.log("From database", fileYear);
        if (fileYear) {
            let taxBracket = TaxCalculator.calculateBracket(fileYear.rates, req.params.income);
            let taxAmount = TaxCalculator.calculateTax(fileYear.rates, req.params.income);
            let socialSecurityTax = PayRollCalculator.calculateSocialSecurityTax(req.params.income);
            let medicareTax = PayRollCalculator.calculateMedicareTax(req.params.income, 'household');
            let percentOfIncome = TaxCalculator.calculateTaxAsPercentageOfIncome(req.params.income, taxAmount + socialSecurityTax + medicareTax);
            const taxInfo = {
                year: fileYear.year,
                taxBracket: taxBracket,
                taxAmount: taxAmount,
                percentOfIncome: percentOfIncome,
                socialSecurityTax: socialSecurityTax,
                medicareTax: medicareTax,
                rates: fileYear.rates
            };
            res.status(200).json(taxInfo);
        } else {
            res.status(404).json({ message: "No valid entry found for provided year" });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    })
};