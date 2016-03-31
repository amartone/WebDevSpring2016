var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');
var uuid = require("node-uuid");
var app = express();
var mongoose = require('mongoose');

//create a default connection string
var connectionString = 'mongodb://127.0.1:27017/webdev2016db';

// use remote connection string
// if running in remote server
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}

// connect to the database
var db = mongoose.connect(connectionString);

var ipaddress = process.env.OPENSHIFT_NODEJS_IP;

app.use(session({secret: "Session Secret Key", resave: false, saveUninitialized: true}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


app.use(express.static(__dirname + '/public'));

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

//require("./public/experiments/project/omdb/server/app.js")(app);
require("./public/assignment/server/app.js")(app, uuid, db, mongoose);
require("./public/project/server/app.js")(app, uuid);

//require("./public/experiments/hombach/server/app.js")(app);

app.listen(port, ipaddress);