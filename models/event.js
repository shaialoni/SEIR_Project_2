const mongoose = require('./connection')
//const mongoose = require('mongoose')
// const calSchema = require('./cal')

const { Schema, model } = mongoose


const eventSchema = new Schema({
    title: String,
    date: String,
    hdate: String,
    category: String,
    hebrew: String,
    memo: String,
    yomtov: {
        type: Boolean,
        required: false
    }
    // owner: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'User'   
    // },
    //comments: [commentSchema]
}, {
    timestamps: true
})

const Event = model('Event', eventSchema)

module.exports = Event