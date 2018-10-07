const mongoose = require('mongoose');

const marriedSSchema = new mongoose.Schema({
    year: String,
    rates: [
        {
            taxRate: Number,
            bottomFilter: Number,
            topFilter: Number,
        }
    ]
});


// Export model
module.exports =  mongoose.model('MarriedSFiler', marriedSSchema);