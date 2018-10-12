const express = require("express");
const morgan = require('morgan');
const mongoose = require('mongoose');
const fs = require('fs');
const app = express();

// Routes
const singleRoutes = require('./routes/single');
const marriedJRoutes = require('./routes/marriedj');
const marriedSRoutes = require('./routes/marrieds');
const houseHoldRoutes = require('./routes/household');
const yearsRoutes = require('./routes/years');

// User Name/Password file
const accountContent = fs.readFileSync("nodemon.json");
const jsonContent = JSON.parse(accountContent);

// Connect to MongoDb Atlas
mongoose.connect(`mongodb+srv://${jsonContent.env.MONGO_ATLAS_USR}:${jsonContent.env.MONGO_ATLAS_PW}@tax-hudgz.mongodb.net/test?retryWrites=true` ,
{
    useNewUrlParser: true,
    dbName: 'Federal_Tax'
})
.catch(err => console.error('Could not connect to MongoDB...', err));
mongoose.Promise = global.Promise;

app.use(morgan('dev'));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

// Routes which should handle requests
app.use('/single', singleRoutes);
app.use('/marriedj', marriedJRoutes);
app.use('/marrieds', marriedSRoutes);
app.use('/household', houseHoldRoutes);
app.use('/years', yearsRoutes);

// Handles errors
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;