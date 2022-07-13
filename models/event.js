const mongoose = require('./connection')
//const mongoose = require('mongoose')
// const calSchema = require('./cal')

const { Schema, model } = mongoose


const eventSchema = new mongoose.Schema({ //todo - why doesnt it work without mongoose
    category: String,
    title: String,
    time: String,
    memo: String,
    hebrew: String,
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

const Event = mongoose.model('Event', eventSchema)//todo - why doesnt it work without mongoose

module.exports = Event