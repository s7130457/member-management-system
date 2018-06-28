const express = require('express');
const router = express.Router();
const MemberDB = require('../models/members')
const AdminDB = require('../models/admins')


/* GET member. */
router.get('/', function (req, res) {
    MemberDB.find({ "admin": req.query.account }).then(function (member) {
        res.send(member)
    })
})

/* GET edit member page. */
router.get('/edit/:_id', function (req, res) {
    MemberDB.find({ "_id": req.params._id }).then(function (member) {
        res.send(member)
    })
})

/* POST Add member. */
router.post('/addMember', function (req, res) {
    console.log('add Member ')
    MemberDB.create(req.body).then(function (member) {
        res.send(member)
    })
})

/* PUT Edit member. */
router.put('/editMember', function (req, res) {
    MemberDB.findOneAndUpdate({ "_id": req.body._id }, {
        $set: {
            name: req.body.name,
            sex: req.body.sex,
            birthday: req.body.birthday,
            admin: req.body.admin
        }
    }, { new: true }).then(function (member) {
        res.send(member)
    })
})

/* Delete member. */
router.delete('/delete/:member_id', function (req, res) {
    MemberDB.remove({ "_id": req.params.member_id }).then(function (result) {
        res.send(result)
    })
})

module.exports = router;
