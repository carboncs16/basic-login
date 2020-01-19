var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var config = require('../config/config');
var passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new Schema({
    username: {
        type: String,
        required: true,
        min: 5
    },
    password: {
        type: String,
        required: true,
        min: 8
    },
    email: {
        type: String
    }
});

mongoose.Promise = global.Promise;
var userModel = mongoose.model('User', userSchema);

module.exports = userModel;
