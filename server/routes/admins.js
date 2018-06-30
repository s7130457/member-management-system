const express = require('express');
const router = express.Router();
const AdminDB = require('../models/admins')


/* GET admin. */
router.get('/:account', function (req, res) {
    console.log('get Admin')
    AdminDB.find({ "account": req.params.account }).then(function (result) {
        console.log(result)
        res.send(result)
    })
})

/* POST Add admin. */
router.post('/addAdmin', function (req, res) {
    AdminDB.find({ "account": req.body.account }).then(function (result) {
        console.log("check admin has been used = " + result)
        return result
    }).then(function (result) {
        console.log('addAdmin')
        console.log(result)
        if (result.length == 0) {
            AdminDB.create(req.body).then(function (admin) {
                console.log(admin)
                req.session.token = req.body.account + '_' + redomToken();
                console.log(req.session);
                res.send({
                    code: 200,
                    token: req.session.token,
                    admin
                })
            })
        } else {
            res.status(500).send({ error: 'Repeat Account' });
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
