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
    console.log('login')
    console.log(req.body)
    AdminDB.findOne({ 'account': req.body.account, 'password': req.body.password }).then(function (admin) {
        if (admin) {
            req.session.token = req.body.account + '_' + redomToken();
            console.log(req.session);
            res.send({
                code: 200,
                token: req.session.token,
                admin
            })
        }
        else {
            res.status(403).send({ error: 'Account or password input error' });
        }

    })
    function redomToken(len) {
        var len = len || 32;
        var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
        var maxpos = chars.length;
        var str = '';

        for (var i=0; i < len; i++) {
            str += chars.charAt(Math.floor(Math.random() * maxpos))
        }

        return str;
    }
})

module.exports = router;