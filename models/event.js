const mongoose = require('./connection')
const { Schema, model } = mongoose


const eventSchema = new Schema({
    title: String,
    date: Date,
    hdate: String,
    category: String,
    hebrew: String,
    memo: String,
    yomtov: {
        type: Boolean,
        required: false
    },
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