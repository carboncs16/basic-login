var express = require('express');
const path = require('path');
var app = express();
var bodyParser = require("body-parser");
var cors = require('cors');
var router = require('./routes/router.js');
var myErrorLogger = require('./ErrorLogger/ErrorLogger.js');
var appPort = process.env.port || 7000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', router);
app.use(myErrorLogger);

app.listen(appPort);
console.log("User Micro Server Started at port:", appPort);