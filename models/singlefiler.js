const mongoose = require('mongoose');

const singleSchema = new mongoose.Schema({
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
module.exports =  mongoose.model('SingleFiler', singleSchema);

