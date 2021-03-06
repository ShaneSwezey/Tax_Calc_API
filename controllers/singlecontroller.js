const mongoose = require('mongoose');
const TaxCalculator = require('../calculations/Tax');
const PayRollCalculator = require('../calculations/PayRollTax');

const SingleFiler = require('../models/singlefiler')

// Http: Get
// Returns json object containing tax brackets for a single filer by every year
exports.single_get_all = (req, res, next) => {
    SingleFiler.find()
    .select("year rates _id")
    .exec()
    .then(docs => {
        if (docs) {
            console.log("From database", docs);
            res.status(200).json(docs);
        } else {
            res.status(404).json({ message: "No valid entry found for provided year" });
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
// Returns json object containing tax brackets for single filing by year
exports.single_get_year = (req, res, next) => {
    SingleFiler.findOne({ year: req.params.year })
    .select("year rates _id")
    .exec()
    .then(fileYear => {
        console.log("From database", fileYear);
        if (fileYear) {
            res.status(200).json(fileYear);
        } else {
            res.status(404).json({ message: "No valid entry found for provided year" });
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
// Returns json object containing the bracket the user 
exports.single_get_incomeBracket = (req, res, next) => {
    SingleFiler.findOne({ year: req.params.year })
    .select("year rates _id")
    .exec()
    .then(fileYear => {
        console.log("From database", fileYear);
        if (fileYear) {
            let taxBracket = TaxCalculator.calculateBracket(fileYear.rates, req.params.income);
            let taxAmount = TaxCalculator.calculateTax(fileYear.rates, req.params.income);
            let socialSecurityTax = PayRollCalculator.calculateSocialSecurityTax(req.params.income);
            let medicareTax = PayRollCalculator.calculateMedicareTax(req.params.income, 'single');
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