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
                res.send("Add admin=\n" + admin)
            })
        } else {
            res.send({ error: 'Repeat Account' });
        }

    })

})
module.exports = router;
