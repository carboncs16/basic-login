var express = require('express');
var router = express.Router();
var User = require('../models/model')
var passport = require('passport');

// Routing starts here

router.post('/signup', (req, res, next) => {
    var user = new User(req.body);
    user.save()
        .then(success => {
            res.send(success);
        })
        .catch(err => {
            next(err);
        })
});

router.post('/login', passport.authenticate('local'), (req, res, next) => {
    res.send({ message: 'Logged in successfully' });
});

router.get('/logout', (req, res, next) => {
    req.logOut();
    res.send({ message: 'Logged out successfully' });
});

module.exports = router;