const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const app = express(); //建立一個Express伺服器
const index = require('../client/index');

mongoose.connect('mongodb://localhost/member-manager');

app.get('/', function (req,res) {
    res.send("Home")
})


app.listen(3100, function () {//告訴server聽取3000這個Port
    console.log('Example app is running on port 3100!');}
);