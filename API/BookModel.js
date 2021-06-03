var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookSchema = new Schema({
    name:String,
    city:String
});

module.exports = mongoose.model('Book',BookSchema);