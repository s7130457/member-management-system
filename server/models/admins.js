const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AdminSchema = new Schema({
    account:{
        type : String
    },
    password:{
        type : String
    }
})

const adminsDB = mongoose.model("adminsCollection", AdminSchema)
module.exports = adminsDB