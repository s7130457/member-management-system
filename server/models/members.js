const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MemberSchema = new Schema({
    name:{
        type : String
    },
    sex:{
        type : String
    },
    birthday:{
        type : String
    },
    admin:{
        type : String
    }
})

const membersDB = mongoose.model("membersCollection", MemberSchema)
module.exports = membersDB