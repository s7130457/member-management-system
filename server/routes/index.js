const express = require('express');
const router = express.Router();
const AdminDB = require('../models/admins')


/* GET index padge */
router.get('/', function (req, res) {
    console.log('index page')
    res.send("index page.\n")
})



/* GET signin page. */
router.get('/signin', function (req, res, next) {
    console.log('signin page')
    res.send("signin page.\n")
})



/* GET login page. */
router.get('/login', function (req, res, next) {
    console.log('login page')
    res.send("login page.\n")
})


router.post('/login', function (req, res, next) {
    AdminDB.find({ 'account': req.body.adminID, 'password': req.body.password }).then(function (result) {
        if (result.length == 0) {
            
    
            // req.flash('msg','invalid account');
            // res.locals.messages = req.flash();
            res.send('return login page and show account/pwd error')
        }
        else {

            res.send('/go to admin page')
        }

    })
})

module.exports = router;
