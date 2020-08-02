const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DirectorSchema = new Schema({
    name: String,
    birth: Number
});

module.exports = mongoose.model('Director', DirectorSchema);