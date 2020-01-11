var express = require('express');
var router = express.Router();
var User = require('../models/model')

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

module.exports = router;