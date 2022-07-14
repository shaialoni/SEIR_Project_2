////////////////////////////////////
//First import dependencies
////////////////////////////////////
const mongoose = require('./connection')

////////////////////////////////////
//define our user model
////////////////////////////////////
const {Schema, model} = mongoose

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

const User = model('User', userSchema)

//export model
module.exports = User