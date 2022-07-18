const mongoose = require('./connection')
const calSchema = require('./personalCal')
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
    },
    calId: String,
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: false   
    },
}, {
    timestamps: true
})

const Event = model('Event', eventSchema)

module.exports = Event