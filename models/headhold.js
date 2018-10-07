const mongoose = require('mongoose');

const houseHoldSchema = new mongoose.Schema({
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
module.exports =  mongoose.model('HouseHoldFiler', houseHoldSchema);