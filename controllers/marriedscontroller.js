const mongoose = require('mongoose');
const TaxCalculator = require('../calculations/Tax');
const PayRollCalculator = require('../calculations/PayRollTax');

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
            res.status(404).json({ message: "No valid entry found for provided year"});
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
// Returns json object containing tax data for married joint filing by year
exports.marrieds_get_taxBreakdown = (req, res, next) => {
    MarriedSFiler.findOne( { year: req.params.year } )
    .select("year rates _id")
    .exec()
    .then(fileYear => {
        console.log("From database", fileYear);
        if (fileYear) {
            let taxBracket = TaxCalculator.calculateBracket(fileYear.rates, req.params.income);
            let taxAmount = TaxCalculator.calculateTax(fileYear.rates, req.params.income);
            let socialSecurityTax = PayRollCalculator.calculateSocialSecurityTax(req.params.income);
            let medicareTax = PayRollCalculator.calculateMedicareTax(req.params.income, 'marrieds');
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