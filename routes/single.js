const express = require('express');
const router = express.Router();

router.get('/:netWorth', (req, res, next) => {
    const taxInfo = {
        filingStatus = req.body.filingStatus,
        annualWages = req.body.annualWages,
        selfEmployment = req.body.selfEmployment,
        socialSecurity = req.body.socialSecurity,
        unearnedIncome = req.body.unearnedIncome,
        capitalGains = req.body.capitalGains
    };
    res.status(200).json( {
        message: 'Handling GET requests to /single'
    });
});