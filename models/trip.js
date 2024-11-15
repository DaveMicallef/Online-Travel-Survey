const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tripSchema = new Schema({
    from: String,
    to: String,
    mode: Number,
    purpose: String
})

module.exports= mongoose.model('Trip', tripSchema)