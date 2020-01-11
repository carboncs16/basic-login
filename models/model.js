var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var config = require('../config/config');

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
        type: String,
        required: true
    }
});

mongoose.Promise = global.Promise;
mongoose.connect(config.db, { useNewUrlParser: true, useUnifiedTopology: true });

var userModel = mongoose.model('User', userSchema);

module.exports = userModel;
