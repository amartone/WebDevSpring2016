var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');
var app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret:"secret_key", resave: false,
    saveUninitialized: true}));
app.use(cookieParser());


app.use(express.static(__dirname + '/public'));

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

//require("./public/experiments/project/omdb/server/app.js")(app);
require("./public/assignment/server/app.js")(app);
//require("./public/experiments/hombach/server/app.js")(app);

app.listen(port, ipaddress);