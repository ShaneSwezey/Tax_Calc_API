const mongoose = require('mongoose');

const yearsSchema = new mongoose.Schema({
    numberOfYears: Number,
    years: [ String ]
});

module.exports = mongoose.model('Years', yearsSchema);