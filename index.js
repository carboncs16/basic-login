var express = require('express');
const path = require('path');
var app = express();
var bodyParser = require("body-parser");
var cors = require('cors');
var router = require('./routes/router.js');
var myErrorLogger = require('./ErrorLogger/ErrorLogger.js');
var passport = require('passport');
var config = require('./config/config.js');
var mongoose = require('mongoose');
var user = require('./models/model.js');
const session = require('express-session');

mongoose.connect(config.db, { useNewUrlParser: true, useUnifiedTopology: true });
var appPort = process.env.port || 7000;

const initializePassport = require('./config/passport-config');
initializePassport(passport,
    email => {
        return user.findOne({ email: email });
    },
    _ => {
        return user.findById();
    }
);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'mykey',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());

app.use('/api', router);
app.use(myErrorLogger);

app.listen(appPort);
console.log("User Micro Server Started at port:", appPort);

function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.status(500);
        res.send({ message: 'User not authenticated' });
    }
}