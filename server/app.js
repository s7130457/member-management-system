const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const session = require('express-session') 
const app = express(); //建立一個Express伺服器


const index = require('./routes/index');
const admins = require('./routes/admins');
const members = require('./routes/members')

mongoose.connect('mongodb://localhost/member-manager');

mongoose.Promise = global.Promise

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("Database Connected.");
});
//express can parse req json body
app.use(bodyParser.json());

/* resolve Access-Control-Allow-Origin problem */
app.use("*", function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  if (req.method === 'OPTIONS') {
    res.send(200)
  } else {
    next()
  }
});

app.use(session({  
  secret: 'backend123...',
  name: 'backend',
  cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      
  },// 1 day
  resave: true,
  saveUninitialized: true,
}));



app.use('/', index);
app.use('/admins', admins);
app.use('/members', members);

app.listen(3100, function () {//告訴server聽取3100這個Port
    console.log('Example app is running on port 3100!');}
);

module.exports = app;