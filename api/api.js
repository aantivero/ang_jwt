/**
 * Created by alex on 14/05/2015.
 */
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var User = require('./models/User.js');
var jwt = require('./services/jwt.js');

var app = express();
app.use(bodyParser.json());
//CORS
app.use(function (req, res, next) {
   res.header('Access-Control-Allow-Origin', '*');
   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

   next();
});

app.post('/register', function (req, res) {
    var user = req.body;
    var newUser = new User.model({
        email: user.email,
        password: user.password
    });

    var payload = {
        iss: req.hostname,
        sub: user._id
    };

    var token = jwt.encode(payload, "shhh..");

    //save
    newUser.save(function (err) {
        res.status(200).send({
            user: newUser.toJSON(),
            token: token
        });
    });
});

var jobs = [
    'AngularJS Developer',
    'SuperHero',
    'Cook',
    'wallets inspector'
]

app.get('/jobs', function (req, res) {
    var token = req.headers.authorization.splice(' ')[1];
    var payload = jwt.decode(token, "shhh..");
    if (!req.headers.authorization) {
        return res.status(401).send({message: 'You are not authorized'});
    }
    res.json(jobs);
});

//mongo connect
mongoose.connect('mongodb://localhost/angjwt');

//test
//console.log(jwt.encode('Hi','secret'));

var server = app.listen(3000, function () {
   console.log('api listening on ', server.address().port);
});